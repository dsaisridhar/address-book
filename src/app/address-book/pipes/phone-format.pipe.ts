import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string, isPhoneField: boolean): any {
    if(!isPhoneField) {
        return value;
    }

    if (value && isPhoneField) {
      const strippedValArr = value.split('');

      const first = strippedValArr.splice(0, 3);
      const second = strippedValArr.splice(0, 3);
      const third = strippedValArr.splice(0, 4);

      const firstPortion = `${first.length > 0 ? '(' : ''}${first.join('')}${first.length > 2 ? ') ' : ''}`;
      const secondPortion = `${second.join('')}${second.length > 2 ? '-' : ''}`;

      return `${firstPortion}${secondPortion}${third.join('')}`;
    }

    return null;
  }
}