export interface RequestHeaders {
    [key: string]: string | string[];
}

export interface QueryParameters {
    [key: string]: string | number;
}

export interface UrlPathParameters {
    [key: string]: string | number;
}

export enum RequestMethod {
    Delete = 'DELETE',
    Get = 'GET',
    Head = 'HEAD',
    Jsonp = 'JSONP',
    Options = 'OPTIONS',
    Patch = 'PATCH',
    Post = 'POST',
    Put = 'PUT',
}

export interface ApiBaseCommand {
    method: RequestMethod;
    url: string;

    // optional
    body?: any;
    headers?: RequestHeaders;
    queryParameters?: QueryParameters;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    reportProgress?: boolean;
    urlPathParameters?: UrlPathParameters;
    withCredentials?: boolean;
}
