import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public static passwordMatcher(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password1Control = control.get('password');
    const password2Control = control.get('confirmPassword');

    if (password1Control?.pristine || password2Control?.pristine) {
      return null;
    }

    if (password1Control?.value === password2Control?.value) {
      return null;
    }
    return {match: true};
  }
}
