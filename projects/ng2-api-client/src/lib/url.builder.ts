import {Injectable} from '@angular/core';
import {UrlPathParameters} from './api-base.command';

@Injectable()
export class UrlBuilder {
    public build (url: string, urlParameters: UrlPathParameters): string {
        if (!urlParameters) {
            // tslint:disable-next-line no-parameter-reassignment
            urlParameters = {};
        }
        this.checkUrlPathParameters(url, urlParameters);

        const urlPartsFiltered: (string | number)[] = url
            .split('/')
            .map((urlPart: string): string | number => <string | number> (
                urlPart.charAt(0) === ':' ? urlParameters[urlPart.substr(1)] : urlPart
            ));

        return urlPartsFiltered.join('/');
    }

    private checkUrlPathParameters (url: string, urlParameters: UrlPathParameters): void {
        const diff: Function = (left: string[], right: string[]): string[] => left
            .filter((x: string): boolean => right.indexOf(x) === -1)
            .concat(right.filter((x: string): boolean => left.indexOf(x) === -1));

        const replaceParts: string[] = url
            .split('/')
            .filter((urlPart: string): boolean => urlPart.charAt(0) === ':')
            .map((urlPart: string): string => urlPart.substr(1));

        if (diff(replaceParts, Object.keys(urlParameters)).length > 0) {
            throw new Error('Url path parameters are not aligned.');
        }
    }
}
