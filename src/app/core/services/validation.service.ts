import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const password1Control = c.get('newPassword1');
    const password2Control = c.get('newPassword2');
    // console.log(password1Control?.errors);
    console.log(c.errors);

    if (password1Control?.pristine || password2Control?.pristine) {
      return null;
    }

    if (password1Control?.value === password2Control?.value) {
      return null;
    }
    return {match: true};
  }
}
