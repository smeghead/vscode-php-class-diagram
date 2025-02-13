# vscode-php-class-diagram



## Development

### Build

```bash
docker compose up -d --build
```

### Container

```bash
docker exec -it vscode-extension-dev bash
```

### Install TypeScript (on Container)
```bash
npm install --save-dev typescript
```


### Run Tests

```bash
Xvfb :99 -screen 0 1024x768x16  &> /tmp/xvfb.log &
export DISPLAY=:99
npm run test
```
