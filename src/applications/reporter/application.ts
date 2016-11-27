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
import {FileProvider} from '../../components/file-provider';
// components
import {Reporter} from '../../components/reporter';
import {Uploader} from '../../components/uploader';
import {Alerts, AlertsProvider} from '../../components/alerts';
import {Test} from '../../components/test';
// angular 2 hacks
import {ValuesPipe} from '../../components/hacks';

// application
@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
        ValuesPipe, // hack for get Map in ngFor
        Alerts,
        Reporter,
        Uploader,
        Test
    ],
    providers: [
        Environment,
        AlertsProvider,
        FileProvider
    ],
    bootstrap: [
        Reporter,
        Uploader,
        Test
    ]
})
class Application {
}

platformBrowserDynamic().bootstrapModule(Application);