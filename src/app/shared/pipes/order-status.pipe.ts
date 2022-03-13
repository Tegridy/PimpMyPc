import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('_', ' ');
  }
}
