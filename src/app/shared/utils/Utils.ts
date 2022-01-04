import {Params} from '@angular/router';

export default class Utils {

  public static buildUrl(queryParams: Params): string {
    const url: string[] = [];
    //queryParams.forEach((x: any) => url.push(`&${x.key}=${x.value}`));
    for (const x of Object.entries(queryParams)) {
      url.push(`&${x[0]}=${x[1]}`);
    }
    return url.join('');
  }


}
