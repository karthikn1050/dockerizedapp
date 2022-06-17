#  Dockerfile for Node Express Backend
FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing Mongo DB 
#RUN apt-get install gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" |tee /etc/apt/sources.list.d/mongodb-org-5.0.list

RUN apt-get update && apt-get install -y mongodb-org

# Install Dependencies
COPY package*.json ./


RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000
ADD start.sh /
RUN chmod +x /start.sh
CMD ["/start.sh"]

