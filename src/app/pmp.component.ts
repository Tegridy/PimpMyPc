import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'pmp-root',
  templateUrl: './pmp.component.html',
  styleUrls: ['./pmp.component.scss'],
})
export class PmpComponent {
  showScreenBreakpoints = environment.showScreenBreakpoints;
  title = 'PimpMyPc';
}
