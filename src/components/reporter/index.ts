import {Component} from '@angular/core';

import {Environment} from '../../components/environment';

@Component({
    selector: 'reporter',
    template: `
    <h1>Reporter</h1>
    <p>{{environment.tick}}</p>`
})

export class Reporter {
    environment;

    constructor(environment: Environment) {
        this.environment = environment;
    }
}