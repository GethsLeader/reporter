import {Component} from '@angular/core';

import {Environment} from '../../components/environment';
import {FileProvider} from '../../components/file-provider';
import {AlertsProvider, Alert} from '../../components/alerts';

class Upload {
    file: File;
    payload: String;

    constructor(file: File) {
        this.file = file;
    }

    destroy() {
        this.file = null;
        this.payload = null;
    }
}

@Component({
    selector: 'uploader',
    templateUrl: Environment.getComponentsPath() + 'uploader/template.html'
})
export class Uploader {
    environment: Environment;
    fileProvider: FileProvider;
    alertsProvider: AlertsProvider;

    upload: Upload;

    private _allowedFileTypes: Array<String>;
    private _allowedFileExtensions: Array<String>;

    constructor(environment: Environment, fileProvider: FileProvider, alertsProvider: AlertsProvider) {
        this.environment = environment;
        this.fileProvider = fileProvider;
        this.alertsProvider = alertsProvider;
        this.setAllowedFileTypes(this.fileProvider.allowedFileTypes);
        this.setAllowedFileExtensions(this.fileProvider.allowedFileExtensions);
        setTimeout(() => {
            this.alertsProvider.addAlert('uploader', new Alert('danger', 'this is message 1!'));
            this.alertsProvider.addAlert('uploader', new Alert('info', 'this is message 2!'));
            this.alertsProvider.addAlert('uploader', new Alert('success', 'this is message 3!'));
            this.alertsProvider.addAlert('uploader', new Alert('warning', 'this is message 4!'));
        }, 2000);
    }

    get allowedFileTypes(): String {
        if (this._allowedFileTypes || this._allowedFileTypes.length > 0) {
            return this._allowedFileTypes.join(', ');
        }
        return 'any'
    }

    set allowedFileTypes(value: String) {
        throw new Error('Cannot set allowedFileTypes directly! Use setAllowedFileTypes instead.');
    }

    setAllowedFileTypes(value: Array<String>) {
        this._allowedFileTypes = value;
    }

    get allowedFileExtensions(): String {
        if (this._allowedFileExtensions || this._allowedFileExtensions.length > 0) {
            return this._allowedFileExtensions.join(', ');
        }
        return 'any'
    }

    set allowedFileExtensions(value: String) {
        throw new Error('Cannot set allowedFileExtensions directly! Use setAllowedFileExtensions instead.');
    }

    setAllowedFileExtensions(value: Array<String>) {
        this._allowedFileExtensions = value;
    }

    sheetFileOnChange($event: any) {
        let files: Array<File> = $event.srcElement.files;
        let file: File;
        if (files.length > 0) {
            file = files[0];
            // ---!!!---
        }
    }

    private _loadFile(file: File): Promise<String> {
        return new Promise((resolve, reject) => {
            this.fileProvider.putFileIn(file);
            if (this.upload) {
                this.upload.destroy();
            }
            this.upload = new Upload(file);
            let checker: number = setInterval(() => {
                if (!this.fileProvider.isLoading()) {
                    clearInterval(checker);
                    this.upload.payload = this.fileProvider.getPayload();
                    if (!this.upload.payload) {
                        throw new Error('Error during file loading! Cannot get file content.');
                    }
                    return resolve(this.upload.payload);
                }
            }, 100);
        });
    }
}