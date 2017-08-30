import {Injectable} from '@angular/core';
import {Response, Http, Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiBaseCommand} from './apiBaseCommand';
import {UrlBuilder} from './url.builder';

@Injectable()
export class ApiClient {
    constructor (private http: Http, private urlBuilder: UrlBuilder) {}

    public executeRequest<T> (command: ApiBaseCommand, retries: number = 0): Observable<T> {
        return this.call(this.getRequest(command))
            .map((response: Response): T => response.json())
            .catch<any, T>((error: any) => {
                if (retries > 0) {
                    return this.executeRequest(command, retries - 1);
                }

                return Observable.throw(error);
            });
    }

    private getRequest (command: ApiBaseCommand): Request {
        return new Request({
            url: this.urlBuilder.build(command.url, command.urlPathParameters),
            method: command.method,
            body: command.body,
            headers: command.headers,
            params: command.queryParameters,
            withCredentials: command.withCredentials === true,
        });
    }

    private call (request: Request): Observable<Response> {
        return this.http.request(request);
    }
}
