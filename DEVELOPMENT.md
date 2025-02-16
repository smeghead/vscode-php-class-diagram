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

## Publish Extension

### Install vsce

拡張機能をパッケージ化して公開するために、vsce (Visual Studio Code Extensions) をインストールします。

```bash
npm install -g @vscode/vsce
```

### パッケージの作成

拡張機能のディレクトリで、以下のコマンドを実行し、.vsix ファイルを作成します。

```bash
vsce package
```

### Azure DevOps アカウントの作成

VSCode拡張機能を公開するには、Azure DevOps でアカウントを作成し、パーソナルアクセストークン (PAT) を取得する必要があります。

### 拡張機能の公開

以下のコマンドを実行して、拡張機能をMarketplaceに公開します。

```bash
vsce publish
```

初回のみ、Azure DevOpsのパブリッシャーIDを作成する必要があります。

```bash
vsce create-publisher your-publisher-name
```

その後、パブリッシャーIDで vsce publish を実行すると公開されます。
