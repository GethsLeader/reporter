import {Injectable} from '@angular/core';

import {config} from '../../components/environment/config';

@Injectable()
export class Environment {
    private _tick = 0;
    private timer: number;

    constructor() {
        this.timer = setInterval(() => {
            this._tick++;
            console.log('Environment ticks:', this._tick);
        }, 5000);
    }

    get tick(): Number {
        return this._tick;
    }

    set tick(value: Number) {
        console.error('Its constant value!');
    }

    static getDistPath(path: String = './'): String {
        if (path.indexOf('./') < 0) {
            path = './' + path;
        }
        if (path[path.length] != '/') {
            path += '/';
        }
        return path;
    }

    static createUID(): String {
        let chars: String = '0123456789abcdef',
            result: String = '';
        for (let i = 0; i < 32; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    static getComponentsPath(): String {
        return this.getDistPath(config['componentsDist']);
    }

    static getLibsPath(): String {
        return this.getDistPath(config['libsDist']);
    }

    static get(key: string): any {
        return config[key];
    }

    static set(key: string, value: any) {
        config[key] = value;
    }
}