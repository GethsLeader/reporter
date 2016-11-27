import {Injectable} from '@angular/core';

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

    createUID(): String {
        let chars: String = '0123456789abcdef',
            result: String = '';
        for (let i = 0; i < 32; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

}