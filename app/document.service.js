"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var document_mock_1 = require('./document-mock');
var DocumentService = (function () {
    function DocumentService(http) {
        this.http = http;
        this.fileDownloaddUrl = '/api/v1/file/download';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers, responseType: http_1.ResponseContentType.ArrayBuffer });
    }
    DocumentService.prototype.getDocuments = function () {
        return Promise.resolve(document_mock_1.DOCUMENTS);
    };
    // getDocuments_url(): Promise<Document[]> {
    //   const url = `GetDocumentData`;
    //   return this.http
    //     .post(url, {headers: this.headers})
    //     .toPromise()
    //     .then(response => response.json().documents as Document[])
    //     .catch(this.handleError);
    // }
    DocumentService.prototype.removeDocument = function (document) {
        var index = document_mock_1.DOCUMENTS.indexOf(document);
        if (index > -1) {
            document_mock_1.DOCUMENTS.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    DocumentService.prototype.downloadFile = function (baseDir, path, name, type) {
        console.log("downloadFile(" + baseDir + ", " + path + ", " + name + ", " + type + ")");
        var url = this.fileDownloaddUrl + "/" + baseDir;
        return this.http.post(url, JSON.stringify({ path: path, name: name, type: type }), this.options);
    };
    DocumentService.prototype.handleError = function (error) {
        console.error('An error occurred');
        return Promise.reject(error.message || error);
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
