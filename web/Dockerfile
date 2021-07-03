# pull official base image
FROM node:12-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g pnpm
# RUN npm install react-scripts@3.4.1 -g --silent

# install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["pnpm", "start"]