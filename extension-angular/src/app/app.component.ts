import { Component } from '@angular/core';
import { RequestService } from './service/request.service';
import { WebviewPostService } from './service/webview-post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'extension-angular';
  
  constructor(private vscode: WebviewPostService, private requestService: RequestService) {}

  public onSubmit() {
    this.vscode.errorMessage('message');
  }

  public getLocation() {
    this.requestService.getLocation('玲珑府')
    .then((res) => {
      this.vscode.commonMessage(res);
    });
  }
}
