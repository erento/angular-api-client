import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';
import {catchError, delay as delayObservable, switchMap} from 'rxjs/operators';
import {ApiBaseCommand, QueryParameters, RequestHeaders} from './apiBaseCommand';
import {UrlBuilder} from './url.builder';

@Injectable()
export class ApiClient {
    private defaultRetryDelay: number | Date = 0;

    constructor (private httpClient: HttpClient, private urlBuilder: UrlBuilder) {}

    public executeRequest<T> (command: ApiBaseCommand, retries: number = 0): Observable<T> {
        return this.httpClient.request<T>(
            command.method,
            this.urlBuilder.build(command.url, command.urlPathParameters),
            this.getRequestOptions(command),
        ).pipe(
            catchError<any, T>((error: any) => {
                if (retries > 0) {
                    // tslint:disable-next-line
                    const newCommand: ApiBaseCommand = Object.assign({}, command, {__api_client_random_key__: this.getRandomId()});

                    return of(undefined).pipe(
                        delayObservable(this.defaultRetryDelay),
                        switchMap((): Observable<T> => this.executeRequest(newCommand, retries - 1)),
                    );
                }

                return _throw(error);
            }),
        );
    }

    public setRetryDelay (delay: number | Date): void {
        this.defaultRetryDelay = delay;
    }

    private getRequestOptions (command: ApiBaseCommand): object {
        return {
            body: command.body,
            headers: this.getHttpHeaders(command.headers),
            params: this.getHttpParams(command.queryParameters),
            responseType: command.responseType || 'json',
            reportProgress: command.reportProgress === true,
            withCredentials: command.withCredentials === true,
        };
    }

    private getHttpParams (queryParameters: QueryParameters): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(queryParameters || {}).forEach((key: string): void => {
            if (queryParameters[key] !== undefined && queryParameters[key] !== null) {
                params = params.set(key, '' + queryParameters[key]);
            }
        });

        return params;
    }

    private getHttpHeaders (headers: RequestHeaders): HttpHeaders {
        let httpHeaders: HttpHeaders = new HttpHeaders();
        Object.keys(headers || {}).forEach((key: string): void => {
            const h: string | string[] = headers[key];
            const headerList: string[] = typeof h === 'string' ? [h] : h;
            headerList.forEach((header: string): void => {
                if (header !== undefined && header !== null) {
                    httpHeaders = httpHeaders.has(key) ? httpHeaders.append(key, header) : httpHeaders.set(key, header);
                }
            });
        });

        return httpHeaders;
    }

    private getRandomId (length: number = 20): string {
        const s: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array(length)
            .fill('')
            .map(() => s.charAt(Math.floor(Math.random() * s.length)))
            .join('');
    }
}
