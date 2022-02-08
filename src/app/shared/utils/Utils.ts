import { Params } from '@angular/router';

export default class Utils {
  public static buildUrl(queryParams: Params): string {
    const url: string[] = [];
    for (const param of Object.entries(queryParams)) {
      url.push(`&${param[0]}=${param[1]}`);
    }
    return url.join('');
  }
}
