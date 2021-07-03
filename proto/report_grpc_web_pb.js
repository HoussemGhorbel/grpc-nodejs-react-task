/**
 * @fileoverview gRPC-Web generated client stub for report
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_type_latlng_pb = require('./google/type/latlng_pb.js')
const proto = {};
proto.report = require('./report_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.report.ReportServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.report.ReportServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.report.ReportRequest,
 *   !proto.report.ReportResponse>}
 */
const methodDescriptor_ReportService_report = new grpc.web.MethodDescriptor(
  '/report.ReportService/report',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.report.ReportRequest,
  proto.report.ReportResponse,
  /**
   * @param {!proto.report.ReportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.report.ReportResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.report.ReportRequest,
 *   !proto.report.ReportResponse>}
 */
const methodInfo_ReportService_report = new grpc.web.AbstractClientBase.MethodInfo(
  proto.report.ReportResponse,
  /**
   * @param {!proto.report.ReportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.report.ReportResponse.deserializeBinary
);


/**
 * @param {!proto.report.ReportRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.report.ReportResponse>}
 *     The XHR Node Readable Stream
 */
proto.report.ReportServiceClient.prototype.report =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/report.ReportService/report',
      request,
      metadata || {},
      methodDescriptor_ReportService_report);
};


/**
 * @param {!proto.report.ReportRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.report.ReportResponse>}
 *     The XHR Node Readable Stream
 */
proto.report.ReportServicePromiseClient.prototype.report =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/report.ReportService/report',
      request,
      metadata || {},
      methodDescriptor_ReportService_report);
};


module.exports = proto.report;

