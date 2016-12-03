import {Component} from '@angular/core';

import {Environment} from '../../components/environment';
import {Upload} from '../../components/uploader';

import * as FileSaver from 'file-saver';
import * as XLSX from 'ts-xlsx';

//https://github.com/DxCx/ts-xlsx
//https://github.com/SheetJS/js-xlsx

@Component({
    selector: 'reporter',
    templateUrl: Environment.getComponentsPath() + 'reporter/template.html'
})
export class Reporter {
    environment: Environment;

    loadedWorkbook: XLSX.IWorkBook;
    savedWorkbook: XLSX.IWorkBook;

    constructor(environment: Environment) {
        this.environment = environment;
        if (Environment.get('onSheetFileLoad')) {
            throw new Error('Another Reporter application already loaded! Only one Reporter application available!');
        }
        Environment.set('onSheetFileLoad', this.onSheetFileLoad.bind(this));
    }

    onSheetFileLoad(upload: Upload) {
        this.loadedWorkbook = XLSX.read(upload.payload, {type: 'base64'});
        let data: String = XLSX.write(this.loadedWorkbook, {bookType: 'xlsx', type: 'binary'});
        let buffer: ArrayBuffer = new ArrayBuffer(data.length),
            view = new Uint8Array(buffer);
        for (let i = 0; i != data.length; ++i) {
            view[i] = data.charCodeAt(i) & 0xFF
        }
        FileSaver.saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'test.xlsx');
    }
}