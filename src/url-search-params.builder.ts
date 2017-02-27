import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {QueryParameter} from './apiBaseCommand';

@Injectable()
export class UrlSearchParamsBuilder {
    public build (queryParameters: QueryParameter[]): URLSearchParams {
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
