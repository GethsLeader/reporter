// angular 2 imports
import 'zone.js/dist/zone';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

// my imports
import getScriptArea from './script-area';
import accepter from './accepter';
import Environment from '../../components/environment';

// angular 2 application
@NgModule({
    imports: [BrowserModule, FormsModule]
})

class Application {
    environment = new Environment('application');
}

const application = new Application();

getScriptArea().innerHTML = getScriptArea().innerHTML
    + accepter('SCRIPT DATA PASSED INSIDE' + ' (' + application.environment.result + ')')
    + '<br>';