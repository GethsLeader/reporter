// angular 2 imports
import 'zone.js/dist/zone';
import {NgModule, enableProdMode}      from '@angular/core';
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

// application
@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
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
        Test
    ]
})
class Application {
}

// enableProdMode(); TODO: 1 - make it work with WEBPACK_ENV

platformBrowserDynamic().bootstrapModule(Application);