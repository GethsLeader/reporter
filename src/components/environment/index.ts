import {Injectable} from '@angular/core';

@Injectable()

export class Environment {
    private _tick = 0;
    private timer;

    constructor() {
        this.timer = setInterval(() => {
            this._tick++;
            console.log('Environment ticks:', this._tick);
        }, 500);
    }

    get tick(): Number {
        return this._tick;
    }

    set tick(value: Number) {
        console.error('Its constant value!');
    }
}