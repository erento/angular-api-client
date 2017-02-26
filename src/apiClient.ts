import {Injectable} from '@angular/core';
import {Response, Http, Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiBaseCommand} from './apiBaseCommand';

@Injectable()
export class ApiClient {
    constructor (private http: Http) {}

    public executeRequest<T> (
        command: ApiBaseCommand,
        retries: number = 0,
    ): Observable<T> {
        return this.buildRequest(command)
            .map((response: Response): T => response.json())
            .catch<any, T>((error: any) => {
                if (retries > 0) {
                    console.error('** API error: Retrying request after', error.error);
                    return this.executeRequest(command, retries - 1);
                }

                return Observable.throw(error);
            });
    }

    private buildRequest (command: ApiBaseCommand): Observable<Response> {
        return this.http.request(new Request({
            url: command.url,
            method: command.method,
            body: command.body,
            headers: command.headers,
            search: command.getQueryParameterList(),
        }));
    }
}
