import React, { useState, useEffect } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { MapView } from '@deck.gl/core'

import ScatterPlotClusterLayer from 'components/ScatterPlotLayer/scatterplot-cluster-layer'
import Popup from 'components/Popup'

import { ReportServiceClient } from 'proto/report_grpc_web_pb'
import { ReportRequest } from 'proto/report_pb'

import deliveryTruck from 'public/delivery-truck.png'

import './style.css'

const {
  REACT_APP_MAPBOX_ACCESS_TOKEN,
  REACT_APP_GRPC_SERVICE_URL,
  REACT_APP_TOTAL_TRACKERS,
  REACT_APP_TOTAL_CYCLES,
} = process.env

const MAP_VIEW = new MapView({ repeat: true })
const INITIAL_VIEW_STATE = {
  longitude: 6.131935,
  latitude: 49.611622,
  zoom: 14,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
}

const renderTooltip = (info) => {
  const { object, x, y } = info
  const style = { left: x - 184, top: y - 236 }
  return (
    !info?.objects && object && <Popup style={style} object={object} isCluster={object.cluster} />
  )
}

const client = new ReportServiceClient(REACT_APP_GRPC_SERVICE_URL, null, null)
let stream

const ScatterPlotLayerMap = () => {
  const [hoverInfo, setHoverInfo] = useState({})

  const [data, setData] = useState({})

  const callGrpcService = () => {
    const request = new ReportRequest()
    request.setTotaltrackers(REACT_APP_TOTAL_TRACKERS)
    request.setTotalcycles(REACT_APP_TOTAL_CYCLES)
    stream = client.report(request, {})
    stream.on('data', (res) => {
      const id = res.getId()
      const name = res.getName()
      const speed = res.getSpeed()
      const altitude = res.getAltitude()
      const coordinates = [res.getLocation().getLongitude(), res.getLocation().getLatitude()]
      if (data[id]) {
        data[id].coordinates = coordinates

        data[id].altitude = altitude
        data[id].speed = speed

        data[id].name = name
      } else {
        data[id] = {
          id,
          name,
          speed,
          altitude,
          coordinates,
        }
      }
      setData({ ...data })
    })
    stream.on('end', () => {
      stream = null
    })
  }

  useEffect(
    () => () => {
      if (stream) {
        stream.cancel()
        stream = null
      }
    },
    []
  )

  useEffect(() => {
    callGrpcService()
  }, [])

  const hideTooltip = () => {
    setHoverInfo({})
  }
  const expandTooltip = (info) => {
    if (info.picked) {
      setHoverInfo(info)
    } else {
      setHoverInfo({})
    }
  }

  const layerProps = {
    data: Object.values(data),
    pickable: true,
    getPosition: (d) => d.coordinates,
    iconMapping: {
      marker: { x: 0, y: 0, width: 64, height: 64 },
    },
    iconAtlas: deliveryTruck,
    onClick: !hoverInfo.objects && !hoverInfo.object && setHoverInfo,

    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 10,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,

    getRadius: 10,
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
  }

  const layer = new ScatterPlotClusterLayer({ ...layerProps, id: 'icon-cluster', sizeScale: 70 })

  return (
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{ dragRotate: false }}
      onViewStateChange={hideTooltip}
      onClick={expandTooltip}
    >
      <StaticMap
        reuseMaps
        // mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
      />

      {renderTooltip(hoverInfo)}
    </DeckGL>
  )
}

export default ScatterPlotLayerMap
