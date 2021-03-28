## Vscode插件开发



#### 硬盘挂载

```shell
mount -t cifs -o username=Administrator,password=JeremyYv0417. //192.168.0.107/projects  /home/windows-disk/
```



#### 使用docker 部署应用

先把前段工程打包

```shell
ng build --prod
```

将dist文件夹放到docker中运行

```shell
docker run --name some-nginx -v /home/windows-disk/VSCode-Extension/extension-angular/dist/extension-angular:/usr/share/nginx/html:ro -d -p 8080:80 nginx
```

访问 `ip:8080`访问应用





#### 插件端和angular工程通信



##### angular中创建个service，封装和插件端通信

```typescript
import { Injectable } from '@angular/core';

declare function acquireVsCodeApi();  // 声明acquireVsCodeApi，用于获取vscode实例

@Injectable({
  providedIn: 'root'
})
export class WebviewPostService {
  private testMode = true;  // 用于测试模式时，正常ng serve查看网页
  private readonly vscode = this.testMode ? {} : acquireVsCodeApi();

  constructor() { 
  }

  // 封装个方法，在组件内直接调用发消息
  public errorMessage(message) {
    this.vscode.postMessage({
      command: 'alert',
      text: message
    });
  }

  public commonMessage(message) {
    this.vscode.postMessage({
      command: 'message',
      text: message
    });
  }
}
```

##### 插件端

先`vscode.window.createWebviewPanel`创建panel，

然后设置html样式：

```typescript
  // Set the webview's initial html content
  this.panel.webview.html = this._getHtmlForWebview();

  private _getHtmlForWebview() {
    // path to dist folder
    const appDistPath = path.join(this.extensionPath, 'extension-angular');
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // path as uri
    const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

    // get path to index.html file from dist folder
    const indexPath = path.join(appDistPath, 'index.html');

    // read index file from file system
    let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });

    // update the base URI tag
    indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);

    return indexHtml;
  }
```

最后监听消息

```typescript
    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      (message: any) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
          case 'message':
            console.log('message.text:', message.text);
            vscode.window.showInformationMessage(message.text);
            return;
        }
      },
      null,
      this.disposables
    );
```

