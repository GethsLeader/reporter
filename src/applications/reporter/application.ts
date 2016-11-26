// angular 2 imports
import {enableProdMode} from '@angular/core';
// enableProdMode(); TODO: 1 - make it work with WEBPACK_ENV

import 'zone.js/dist/zone';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule}   from '@angular/forms';

// services
import {Environment} from '../../components/environment';
// components
import {Reporter} from '../../components/reporter';
import {Test} from '../../components/test';

// application
@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
        Reporter,
        Test
    ],
    providers: [Environment],
    bootstrap: [
        Reporter,
        Test
    ]
})
class Application {
}

platformBrowserDynamic().bootstrapModule(Application);