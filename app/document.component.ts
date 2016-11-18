import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Document } from './document';
import { DocumentService } from './document.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
//import { File } from './file';

@Component({
    moduleId: module.id,
    selector: 'document',
    templateUrl: 'document.component.html',
    styleUrls: ['./document.component.css'],
    providers: [DocumentService]
})

export class DocumentComponent implements OnInit {
    selectedFile: File;
    files = FILES;
    documents: Document[];
    private baseDir: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private documentService: DocumentService
    ) { }

    ngOnInit(): void {
        console.log("init DocumentComponent");
        this.route.params.forEach((params: Params) => {
            this.baseDir = params['baseDir'];
        });

        this.getDocuments();
    }

    getDocuments(): void {
        this.documentService.getDocuments().then(documents => this.documents = documents);
    }

    downloadFile(path: string, name: string,type:string): void {
        console.log('get files in path :'+path + name);
        this.documentService.downloadFile(this.baseDir,path,name,type)
              .subscribe(data => this.downloadFileData(data,name,type),
                  error => console.log("Error downloading the file."),
                  () => console.log('Completed file download.'));
    }

    downloadFileData(data:Response,name:string,type:string){
        var downloadname=name+ '.zip';
        if(type=='file')
        {
            downloadname=name;
        }
        
        var blob = new Blob([data["_body"]], {type: 'application/zip'}); 
        var downloadLink = document.createElement("a");
        downloadLink.download = downloadname;
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    removeDocument(document: Document): void{
        this.documentService.removeDocument(document);
        this.getDocuments();
    }

    /*delete(file: File): void {
        this.documentService
        .delete(this.baseDir,file.path,file.name,file.type)
        .then(() => {
            this.files = this.files.filter(h => h !== file);
            if (this.selectedFile === file) { this.selectedFile = null; }
        });
    }*/
}
const FILES: File[] = [];