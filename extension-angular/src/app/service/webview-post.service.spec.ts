import { TestBed } from '@angular/core/testing';

import { WebviewPostService } from './webview-post.service';

describe('WebviewPostService', () => {
  let service: WebviewPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebviewPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
