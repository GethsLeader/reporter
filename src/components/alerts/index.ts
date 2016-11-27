import {Component, Inject, Injectable, Input} from '@angular/core';

import {Environment} from '../../components/environment';

export class Alert {
    type: String;
    message: String;
    created: Number;

    private _id: String;
    private _createUID: Function;

    constructor(@Inject(Environment) environment: Environment, type: String, message: String) {
        this.type = type;
        this.message = message;
        this.created = Date.now();
        this._createUID = environment.createUID;
        this._id = this._createUID();
    }

    addToGroup(group: Map<String, Alert>) {
        while (group.get(this._id)) {
            this.recreateID();
        }
        group.set(this._id, this);
    }

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        throw new Error('Cannot set id directly! Use recreateID instead.');
    }

    recreateID() {
        this._id = this._createUID();
    };
}


@Injectable()
export class AlertsProvider {
    environment: Environment;

    groups: Map<String, Map<String, Alert>>;

    constructor(environment: Environment) {
        this.environment = environment;
        this.groups = new Map<String, Map<String, Alert>>();
    }

    addGroup(alertsId: String) {
        if (this.groups.get(alertsId)) {
            throw new Error('Alerts group with id ' + alertsId + ' already exists!');
        }
        this.groups.set(alertsId, new Map<String, Alert>());
        return this.groups.get(alertsId);
    }

    addAlert(alertsId: String, alert: Alert) {
        let group: Map<String, Alert> = this.groups.get(alertsId);
        if (!group) {
            throw new Error('Alerts group with id ' + alertsId + ' does not exists!');
        }
        if (group.get(alert.id)) {
            throw new Error('Alert with id ' + alert.id + ' already exists in ' + alertsId + ' alerts group!');
        }
        alert.addToGroup(group);
    }

    removeAlert(alertsId: String, alertId: String) {
        let group: Map<String, Alert> = this.groups.get(alertsId);
        if (!group) {
            throw new Error('Alerts group with id ' + alertsId + ' does not exists!');
        }
        let alert: Alert = group.get(alertId);
        if (alert) {
            throw new Error('Alert with id ' + alertId + ' does not exists in ' + alertsId + ' alerts group!');
        }
        alert = null;
        group.delete(alertId);
    }
}

@Component({
    selector: 'alerts',
    template: `
    <div>Alerts {{id}} here!</div>
    <ul>
        <li *ngFor="let alert of group | values;">Alert {{alert.message}}</li>
    </ul>`
})
export class Alerts {
    environment: Environment;
    alertsProvider: AlertsProvider;

    @Input() id: String;

    group: Map<String, Alert>;

    constructor(environment: Environment, alertsProvider: AlertsProvider) {
        this.environment = environment;
        this.alertsProvider = alertsProvider;
    }

    ngOnInit() {
        if (!this.id) {
            throw new Error('Alerts component should have [id] input attribute!');
        }
        this.group = this.alertsProvider.addGroup(this.id);
    }
}