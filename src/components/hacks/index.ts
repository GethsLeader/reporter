import {Pipe, PipeTransform} from '@angular/core';

// pipes
@Pipe({name: 'values', pure: false})
export class ValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => value[key]);
    }
}