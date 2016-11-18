import { Injectable } from '@angular/core';
import { Headers,Http,RequestOptions,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Document } from './document';
import { DOCUMENTS } from './document-mock';

@Injectable()
export class DocumentService {
  private fileDownloaddUrl = '/api/v1/file/download';
  private headers = new Headers({ 'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers, responseType: ResponseContentType.ArrayBuffer});
  constructor(private http: Http) { }

  getDocuments(): Promise<Document[]> {
    return Promise.resolve(DOCUMENTS);
  }

  // getDocuments_url(): Promise<Document[]> {
  //   const url = `GetDocumentData`;
  //   return this.http
  //     .post(url, {headers: this.headers})
  //     .toPromise()
  //     .then(response => response.json().documents as Document[])
  //     .catch(this.handleError);
  // }

  removeDocument(document: Document): Promise<boolean> {
    let index = DOCUMENTS.indexOf(document);
    if (index > -1) {
      DOCUMENTS.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  downloadFile(baseDir: string, path: string, name: string,type:string){
    console.log("downloadFile(" + baseDir + ", " + path + ", " + name + ", " + type +")");
    const url = `${this.fileDownloaddUrl}/${baseDir}`;
    return this.http.post(url,JSON.stringify({path: path,name: name,type:type}),this.options);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
  }
  
}