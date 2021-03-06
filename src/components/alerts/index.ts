import {Component, Injectable, Input} from '@angular/core';

import {Environment} from '../../components/environment';

export class Alert {
    type: String;
    message: String;
    created: Number;
    group: AlertsGroup = null;

    constructor(type: String, message: String) {
        this.type = type;
        this.message = message;
        this.created = Date.now();
    }

    addToGroup(group: AlertsGroup) {
        this.group = group;
        this.group.add(this);
    }

    remove() {
        let index = this.group.alerts.indexOf(this);
        if (index >= 0) {
            this.group.alerts.splice(index, 1);
        }
    }

    getTitle(): String {
        return this.type[0].toUpperCase() + this.type.slice(1) + '!';
    }
}

class AlertsGroup {
    id: String;
    alerts: Array<Alert> = [];

    constructor(alertsId: String) {
        this.id = alertsId;
    }

    add(alert: Alert) {
        this.alerts.push(alert);
    }
}

@Injectable()
export class AlertsProvider {
    environment: Environment;

    groups: Array<AlertsGroup> = [];

    constructor(environment: Environment) {
        this.environment = environment;
    }

    addGroup(alertsId: String) {
        let alreadyExists: Boolean = false;
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].id == alertsId) {
                alreadyExists = true;
                break;
            }
        }
        if (alreadyExists) {
            throw new Error('Alerts group with id ' + alertsId + ' already exists!');
        }
        let group = new AlertsGroup(alertsId);
        this.groups.push(group);
        return group;
    }

    addAlert(alertsId: String, alert: Alert) {
        let group: AlertsGroup;
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].id == alertsId) {
                group = this.groups[i];
                break;
            }
        }
        if (!group) {
            throw new Error('Alerts group with id ' + alertsId + ' does not exists!');
        }
        alert.addToGroup(group);
    }
}

@Component({
    selector: 'alerts',
    templateUrl: Environment.getComponentsPath() + 'alerts/template.html'
})
export class Alerts {
    environment: Environment;
    alertsProvider: AlertsProvider;

    @Input() id: String;

    group: AlertsGroup;

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