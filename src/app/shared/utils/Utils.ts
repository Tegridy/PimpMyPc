import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, UrlSegment, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { parse } from 'search-params';
import { Param } from '../model/Param';

export default class Utils {
  public static buildUrl(queryParams: Param[] | Params): string {
    const url: string[] = [];

    if (Array.isArray(queryParams)) {
      queryParams.forEach((param: Param) =>
        url.push(`&${param.key}=${param.value}`)
      );
    } else {
      for (const param of Object.entries(queryParams)) {
        url.push(`&${param[0]}=${param[1]}`);
      }
    }

    return url.join('');
  }

  public static validatePageNumber(pageNumber: number): number {
    if (isNaN(pageNumber) || pageNumber < 1) {
      return 1;
    } else {
      return pageNumber;
    }
  }

  public static updateUrl(queryParams: Param[] | Params, router: Router): void {
    const currentUrl: ActivatedRoute = new ActivatedRoute();
    currentUrl.url = of([new UrlSegment(router.url, {})]);

    const params = parse(Utils.buildUrl(queryParams));

    router.navigate([], {
      relativeTo: currentUrl,
      queryParams: params,
    });
  }

  public static handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
