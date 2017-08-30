import {RequestMethod, Headers} from '@angular/http';

export interface QueryParameters {
    [key: string]: string | number;
};

export interface UrlPathParameters {
    [key: string]: string | number;
}

export interface ApiBaseCommand {
    method: RequestMethod;
    url: string;

    // optional
    body?: any;
    headers?: Headers;
    queryParameters?: QueryParameters;
    urlPathParameters?: UrlPathParameters;
    withCredentials?: boolean;
}
