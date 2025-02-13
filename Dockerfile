FROM node:18-bullseye

WORKDIR /workspace

RUN apt-get update && apt-get install -y \
    git libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libx11-xcb1 \
    libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxtst6 libasound2 libpango-1.0-0 libcups2 \
    libwayland-client0 libwayland-cursor0 libwayland-egl1 libxkbcommon0 libxshmfence1 \
    libgbm1 libdrm2 libgtk-3-0 xvfb \
    && rm -rf /var/lib/apt/lists/*
RUN Xvfb :99 -screen 0 1024x768x16  &> /tmp/xvfb.log

RUN npm install -g yo generator-code
RUN npm install --save-dev typescript

RUN mkdir -p /workspace/app

WORKDIR /workspace/app
