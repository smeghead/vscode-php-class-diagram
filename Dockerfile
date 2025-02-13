FROM node:18-bullseye

WORKDIR /workspace

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yo generator-code

RUN mkdir -p /workspace/app

WORKDIR /workspace/app
