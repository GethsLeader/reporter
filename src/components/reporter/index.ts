import {Component} from '@angular/core';

import {Environment} from '../../components/environment';

import * as XLSX from 'ts-xlsx';

//https://github.com/DxCx/ts-xlsx
//https://github.com/SheetJS/js-xlsx/

@Component({
    selector: 'reporter',
    templateUrl: Environment.getComponentsPath() + 'reporter/template.html'
})
export class Reporter {
    environment: Environment;

    constructor(environment: Environment) {
        this.environment = environment;
    }
}