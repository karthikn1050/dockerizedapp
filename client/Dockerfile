
# Dockerfile for React client

# Build react client
FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y build-essential
RUN apt-get update
# Working directory be app
WORKDIR /usr/src/app
COPY package*.json ./

###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]