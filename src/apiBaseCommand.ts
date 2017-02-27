import {RequestMethod, Headers} from '@angular/http';

export type QueryParameter = [string, string | number];

export interface UrlPathParameters {
    [key: string]: string | number;
}

export interface ApiBaseCommand {
    method: RequestMethod;
    url: string;

    // optional
    body?: any;
    headers?: Headers;
    queryParameters?: QueryParameter[];
    urlPathParameters?: UrlPathParameters;
}
