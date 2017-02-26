import {RequestMethod, URLSearchParams, Headers} from '@angular/http';

export type QueryParameter = [string, string | number];

export interface UrlPathParameter {
    [key: string]: string | number;
}

export abstract class ApiBaseCommand {
    public abstract method: RequestMethod;
    public url: string;
    public body: any;
    public headers: Headers;
    protected queryParametersList: QueryParameter[] = [];

    public constructor (url: string, protected urlParameterList: UrlPathParameter = {}) {
        this.url = this.replaceUrlPathParameters(url);
    }

    public getQueryParameterList (): URLSearchParams {
        const params: URLSearchParams = new URLSearchParams();
        this.queryParametersList.forEach((searchParameter: QueryParameter): void => {
            params.set(searchParameter[0], '' + searchParameter[1]);
        });
        return params;
    }

    protected replaceUrlPathParameters (url: string): string {
        this.checkUrlPathParameters(url);

        const urlPartsFiltered: (string | number)[] = url
            .split('/')
            .map((urlPart: string) => urlPart.charAt(0) === ':' ? this.urlParameterList[urlPart.substr(1)] : urlPart);

        return urlPartsFiltered.join('/');
    }

    private checkUrlPathParameters (url: string): void {
        const diff: Function = (left: string[], right: string[]): string[] => left
            .filter((x: string) => right.indexOf(x) === -1)
            .concat(right.filter((x: string) => left.indexOf(x) === -1));

        const replaceParts: string[] = url
            .split('/')
            .filter((urlPart: string) => urlPart.charAt(0) === ':')
            .map((urlPart: string) => urlPart.substr(1));

        if (diff(replaceParts, Object.keys(this.urlParameterList)).length > 0) {
            throw new Error('Url path parameters are not aligned.');
        }
    }
}
