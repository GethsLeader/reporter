import {Component} from '@angular/core';

import {Environment} from '../../components/environment';

@Component({
    selector: 'test',
    template: `
    <h1>Test</h1>
    <p>{{environment.tick}}</p>`
})
export class Test {
    environment: Environment;

    constructor(environment: Environment) {
        this.environment = environment;
    }
}