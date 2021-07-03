var grpc = require("grpc");
var reportProto = grpc.load("proto/report.proto");
var server = new grpc.Server();

const generatePositiveNegativeNumber = (range) =>
  Math.floor(Math.random() * 2 * range) - range;

server.addService(reportProto.report.ReportService.service, {
  report: function (call) {
    const totalTrackers = call?.request?.totalTrackers ?? 10;
    const totalCycles = call?.request?.totalCycles ?? 10;
    const delay = () => new Promise((resolve) => setTimeout(resolve, 10));

    const main = async () => {
      const trackers = {};
      for (let j = 0; j < totalCycles; j++) {
        for (let i = 1; i <= totalTrackers; i++) {
          let tracker = trackers[i];
          if (tracker) {
            tracker.location.latitude +=
              generatePositiveNegativeNumber(10) / 10000;
            tracker.location.longitude +=
              generatePositiveNegativeNumber(10) / 10000;
            tracker.altitude = Math.min(
              20,
              Math.max(
                0,
                tracker.altitude + generatePositiveNegativeNumber(10) / 1000
              )
            );
            tracker.speed = Math.min(
              120,
              Math.max(
                0,
                tracker.speed + generatePositiveNegativeNumber(10) / 10
              )
            );
          } else {
            tracker = {
              id: `${i}`,
              location: {
                latitude: 49.611622 + generatePositiveNegativeNumber(100) / 1000,
                longitude: 6.131935 + generatePositiveNegativeNumber(100) / 1000,
              },
              altitude: 1,
              name: `Delivery Truck No.${i}`,
              speed: 20,
            };
            trackers[i] = tracker;
          }
          call.write(tracker);
          await delay();
        }
      }
      call.end();
    };

    main();
  },
});

server.bind("0.0.0.0:8080", grpc.ServerCredentials.createInsecure());
server.start();
