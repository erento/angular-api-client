import {Injectable} from '@angular/core';
import {UrlPathParameters} from './apiBaseCommand';

@Injectable()
export class UrlBuilder {
    public build (url: string, urlParameters: UrlPathParameters): string {
        if (!urlParameters) {
            urlParameters = {};
        }
        this.checkUrlPathParameters(url, urlParameters);

        const urlPartsFiltered: (string | number)[] = url
            .split('/')
            .map((urlPart: string) => urlPart.charAt(0) === ':' ? urlParameters[urlPart.substr(1)] : urlPart);

        return urlPartsFiltered.join('/');
    }

    private checkUrlPathParameters (url: string, urlParameters: UrlPathParameters): void {
        const diff: Function = (left: string[], right: string[]): string[] => left
            .filter((x: string) => right.indexOf(x) === -1)
            .concat(right.filter((x: string) => left.indexOf(x) === -1));

        const replaceParts: string[] = url
            .split('/')
            .filter((urlPart: string) => urlPart.charAt(0) === ':')
            .map((urlPart: string) => urlPart.substr(1));

        if (diff(replaceParts, Object.keys(urlParameters)).length > 0) {
            throw new Error('Url path parameters are not aligned.');
        }
    }
}
