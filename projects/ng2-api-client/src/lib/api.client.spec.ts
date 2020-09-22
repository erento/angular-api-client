import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {ApiBaseCommand, QueryParameters, RequestHeaders, RequestMethod, UrlPathParameters} from './api-base.command';
import {ApiClient} from './api.client';
import {UrlBuilder} from './url.builder';

/* tslint:disable:max-classes-per-file */
class GetCommand implements ApiBaseCommand {
    public url: string = '/my-get-endpoint/';
    public method: RequestMethod = RequestMethod.Get;
    public queryParameters: QueryParameters;

    constructor (name: string) {
        this.queryParameters = {name};
    }
}

class GetIdCommandWithHeader implements ApiBaseCommand {
    public url: string = '/my-get-endpoint/:id-number/whatever/:name';
    public method: RequestMethod = RequestMethod.Get;
    public urlPathParameters: UrlPathParameters;
    public headers: RequestHeaders = {
        'X-My-Custom-Header': 'Angular',
        'X-My-Custom-List-Header': ['JS', '2', undefined, null],
    };

    constructor (id: number, name: string) {
        this.urlPathParameters = {
            'id-number': id,
            'name': name,
        };
    }
}

class PostCommand implements ApiBaseCommand {
    public url: string = '/my-post-endpoint/';
    public method: RequestMethod = RequestMethod.Post;
    public body: string = 'My request body';
    public queryParameters: QueryParameters;
    public withCredentials: boolean = true;

    constructor (name?: string, withCredentials?: boolean) {
        this.queryParameters = {name};
        if (withCredentials !== undefined) {
            this.withCredentials = withCredentials;
        }
    }
}
/* tslint:enable:max-classes-per-file */

describe('Api Client Service', (): void => {
    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiClient,
                UrlBuilder,
            ],
        });
    });

    afterEach((): void => {
        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);
        httpMock.verify();
    });

    it('should execute GET method and return a response', (): void => {
        const apiClient: ApiClient = TestBed.inject(ApiClient);
        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);

        apiClient.executeRequest(new GetCommand('john')).subscribe((response: any): void => {
            expect(response.length).toBe(2);
            expect(response[0].id).toBe(5);
        });

        const req: TestRequest = httpMock.expectOne('/my-get-endpoint/?name=john');

        expect(req.request.method).toEqual('GET');
        expect(req.request.withCredentials).toEqual(false);

        req.flush([{id: 5}, {id: 21}]);
    });

    it('should execute GET with placeholder replace', (): void => {
        const apiClient: ApiClient = TestBed.inject(ApiClient);
        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);

        apiClient.executeRequest(new GetIdCommandWithHeader(4, 'john')).subscribe();

        const req: TestRequest = httpMock.expectOne('/my-get-endpoint/4/whatever/john');

        expect(req.request.method).toEqual('GET');
        expect(req.request.withCredentials).toEqual(false);
        expect(req.request.headers.get('X-My-Custom-Header')).toEqual('Angular');
        expect(req.request.headers.getAll('X-My-Custom-List-Header')).toEqual(['JS', '2']);
    });

    it('should execute POST method and return a response', (): void => {
        const apiClient: ApiClient = TestBed.inject(ApiClient);
        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);

        apiClient.executeRequest(new PostCommand()).subscribe((response: any): void => {
            expect(response.length).toBe(2);
        });

        const req: TestRequest = httpMock.expectOne('/my-post-endpoint/');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe('My request body');
        expect(req.request.withCredentials).toBe(true);

        req.flush([{id: 5}, {id: 21}]);
    });

    it('should execute POST method with query parameter and return a response', (): void => {
        const apiClient: ApiClient = TestBed.inject(ApiClient);
        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);

        apiClient.executeRequest(new PostCommand('Markus', false)).subscribe((response: any): void => {
            expect(response.length).toBe(2);
        });

        const req: TestRequest = httpMock.expectOne('/my-post-endpoint/?name=Markus');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe('My request body');
        expect(req.request.withCredentials).toBe(false);

        req.flush([{id: 5}, {id: 21}]);
    });
});
