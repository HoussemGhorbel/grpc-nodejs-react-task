import { CompositeLayer } from '@deck.gl/core'
import { ScatterplotLayer, TextLayer, IconLayer } from '@deck.gl/layers'
import Supercluster from 'supercluster'

export default class ScatterPlotClusterLayer extends CompositeLayer {
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged
  }

  updateState({ props, oldProps, changeFlags }) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale

    if (rebuildIndex) {
      const index = new Supercluster({ maxZoom: 20, radius: props.sizeScale })
      index.load(
        props.data.map((d) => ({
          geometry: { coordinates: props.getPosition(d) },
          properties: d,
        }))
      )
      this.setState({ index })
    }

    const z = Math.floor(this.context.viewport.zoom)
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z,
      })
    }
  }

  getPickingInfo({ info, mode }) {
    const newInfo = info
    const pickedObject = info?.object?.properties
    if (pickedObject) {
      if (pickedObject?.cluster && mode !== 'hover') {
        newInfo.objects = this.state.index
          .getLeaves(pickedObject.cluster_id, 25)
          .map((f) => f.properties)
      }
      newInfo.object = pickedObject
    }
    return info
  }

  renderLayers() {
    const { data } = this.state
    const { iconAtlas, iconMapping, sizeScale } = this.props

    return [
      new IconLayer(
        this.getSubLayerProps({
          id: 'icon',
          data,
          iconAtlas,
          iconMapping,
          sizeScale,
          getPosition: (d) => d.geometry.coordinates,
          getIcon: () => 'marker',
          getSize: (d) => (d.properties.cluster ? 0 : 1),
        })
      ),
      new ScatterplotLayer(
        this.getSubLayerProps({
          id: 'scatterplot-layer',
          data,
          pickable: true,
          opacity: 0.9,
          stroked: true,
          filled: true,
          radiusScale: 6,
          radiusMinPixels: 25,
          radiusMaxPixels: 25,
          lineWidthMinPixels: 3,
          lineWidthMaxPixels: 3,
          getPosition: (d) => d.geometry.coordinates,
          getRadius: (d) => (d.properties.cluster ? 25 : 0),
          getFillColor: (d) => (d.properties.cluster ? [60, 60, 60] : [60, 60, 60, 0]),
          getLineColor: (d) => (d.properties.cluster ? [0, 112, 0] : [0, 112, 0, 0]),
        })
      ),
      new TextLayer(
        this.getSubLayerProps({
          id: 'text',
          data,

          getPosition: (d) => d.geometry.coordinates,
          getText: (d) => `${d.properties.cluster ? d.properties.point_count : ''}`,
          getSize: () => 24,
          getColor: () => [255, 255, 255],
        })
      ),
    ]
  }
}
