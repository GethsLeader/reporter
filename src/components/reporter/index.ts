import {Component} from '@angular/core';

import {Environment} from '../../components/environment';

import * as XLSX from 'ts-xlsx';

//https://github.com/DxCx/ts-xlsx
//https://github.com/SheetJS/js-xlsx/

@Component({
    selector: 'reporter',
    template: `
    <h1>Reporter</h1>
    <p>{{environment.tick}}</p>`
})
export class Reporter {
    environment: Environment;

    constructor(environment: Environment) {
        this.environment = environment;
    }
}