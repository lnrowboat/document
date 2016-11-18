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
var document_service_1 = require('./document.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
//import { File } from './file';
var DocumentComponent = (function () {
    function DocumentComponent(router, route, documentService) {
        this.router = router;
        this.route = route;
        this.documentService = documentService;
        this.files = FILES;
    }
    DocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("init DocumentComponent");
        this.route.params.forEach(function (params) {
            _this.baseDir = params['baseDir'];
        });
        this.getDocuments();
    };
    DocumentComponent.prototype.getDocuments = function () {
        var _this = this;
        this.documentService.getDocuments().then(function (documents) { return _this.documents = documents; });
    };
    DocumentComponent.prototype.downloadFile = function (path, name, type) {
        var _this = this;
        console.log('get files in path :' + path + name);
        this.documentService.downloadFile(this.baseDir, path, name, type)
            .subscribe(function (data) { return _this.downloadFileData(data, name, type); }, function (error) { return console.log("Error downloading the file."); }, function () { return console.log('Completed file download.'); });
    };
    DocumentComponent.prototype.downloadFileData = function (data, name, type) {
        var downloadname = name + '.zip';
        if (type == 'file') {
            downloadname = name;
        }
        var blob = new Blob([data["_body"]], { type: 'application/zip' });
        var downloadLink = document.createElement("a");
        downloadLink.download = downloadname;
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    };
    DocumentComponent.prototype.removeDocument = function (document) {
        this.documentService.removeDocument(document);
        this.getDocuments();
    };
    DocumentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'document',
            templateUrl: 'document.component.html',
            styleUrls: ['./document.component.css'],
            providers: [document_service_1.DocumentService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute, document_service_1.DocumentService])
    ], DocumentComponent);
    return DocumentComponent;
}());
exports.DocumentComponent = DocumentComponent;
var FILES = [];
