// angular 2 imports
import 'zone.js/dist/zone';
import {NgModule, enableProdMode}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule}   from '@angular/forms';

// services and components
import {Environment} from '../../components/environment';
import {FileProvider} from '../../components/file-provider';
import {Uploader} from '../../components/uploader';
import {Alerts, AlertsProvider} from '../../components/alerts';
import {Reporter} from '../../components/reporter';
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

if (Environment.get('production')) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Application);