import { Injectable } from '@angular/core';

declare function acquireVsCodeApi();

@Injectable({
  providedIn: 'root'
})
export class WebviewPostService {
  private testMode = false;  // 用于单独
  private readonly vscode = this.testMode ? {} : acquireVsCodeApi();

  constructor() { 
  }

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
