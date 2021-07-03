# grpc-nodejs-react-task

This app is about getting a continuous stream of 1000 trackers delayed with 10ms between each tracker information. The server stream will be active for 60 seconds (6 cycles).
You can update the total number of trackers (TOTAL_TRACKERS) and/or the number of data sent for each tracker (TOTAL_CYCLES) in /web/.env file.

The repository contains 3 projects:

1.  node-server: port 8080
2.  envoy-proxy: port 9090
3.  React web application: port 3000

After starting them, the web app will be running at [localhost:3000](http://localhost:3000/).

## Installation

You can run all project with docker-compose

```bash
 $ docker-compose up
```

or you can run each project individually (for development purposes)

1. node-server

```bash
$ npm install
$ node server.js

```

2. React web application

I recommend [pnpm](https://pnpm.io/) package manager for several [reasons](https://pnpm.io/benchmark)

```bash
$ pnpm install
$ pnpm run start

```

PS. You need to reconfigure the envoy-proxy to communicate the node-server and the web application locally
