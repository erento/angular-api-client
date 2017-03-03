import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {QueryParameters} from './apiBaseCommand';

@Injectable()
export class UrlSearchParamsBuilder {
    public build (queryParameters: QueryParameters): URLSearchParams {
        if (!queryParameters) {
            queryParameters = [];
        }
        const params: URLSearchParams = new URLSearchParams();
        queryParameters.forEach((searchParameter: QueryParameter): void => {
            params.set(searchParameter[0], '' + searchParameter[1]);
        });

        return params;
    }
}
