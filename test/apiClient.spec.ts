import {TestBed, inject} from '@angular/core/testing';
import {
    BaseRequestOptions,
    Headers,
    Http,
    HttpModule,
    RequestMethod,
    RequestOptions,
    Response,
    ResponseOptions,
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {ApiClient, ApiBaseCommand} from '../src/index';
import {QueryParameters, UrlPathParameters} from '../src/apiBaseCommand';
import {UrlBuilder} from '../src/url.builder';
import {UrlSearchParamsBuilder} from '../src/url-search-params.builder';

/* tslint:disable:max-classes-per-file */
class GetCommand implements ApiBaseCommand {
    public url: string = '/my-get-endpoint/';
    public method: RequestMethod = RequestMethod.Get;
    public queryParameters: QueryParameters;

    constructor (name: string) {
        this.queryParameters = [['name', name]];
    }
}

class GetIdCommandWithHeader implements ApiBaseCommand {
    public url: string = '/my-get-endpoint/:id-number/whatever/:name';
    public method: RequestMethod = RequestMethod.Get;
    public urlPathParameters: UrlPathParameters;
    public headers: Headers = new Headers({
        'X-My-Custom-Header': 'Angular'
    });

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
    public body = 'My request body';
    public queryParameters: QueryParameters;

    constructor (name?: string) {
        this.queryParameters = name ? [['name', name]] : [];
    }
}
/* tslint:enable:max-classes-per-file */

describe('Api Client Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ApiClient,
                UrlBuilder,
                UrlSearchParamsBuilder,
                {
                    provide: Http,
                    useFactory: (mockBackend: MockBackend, options: RequestOptions): Http => new Http(mockBackend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions,
            ]
        });
    });

    it(
        'should execute GET method and return a response',
        inject([ApiClient, MockBackend], (apiClient: ApiClient, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toBe('/my-get-endpoint/?name=john');
                expect(connection.request.method).toBe(0);

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify([{id: 5}, {id: 21}])
                })));
            });

            apiClient.executeRequest(new GetCommand('john'), 0).subscribe((response: any) => {
                expect(response.length).toBe(2);
            });
        })
    );

    it(
        'should execute GET with placeholder replace',
        inject([ApiClient, MockBackend], (apiClient: ApiClient, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toBe('/my-get-endpoint/4/whatever/john');
                expect(connection.request.method).toBe(0);
                expect(connection.request.headers.toJSON()['X-My-Custom-Header'][0]).toBe('Angular');
                expect(connection.request.headers.values()[0][0]).toBe('Angular');
            });

            apiClient.executeRequest(new GetIdCommandWithHeader(4, 'john'), 0).subscribe();
        })
    );

    it(
        'should execute POST method and return a response',
        inject([ApiClient, MockBackend], (apiClient: ApiClient, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toBe('/my-post-endpoint/');
                expect(connection.request.method).toBe(1);

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify([{id: 5}, {id: 21}])
                })));
            });

            apiClient.executeRequest(new PostCommand(), 0).subscribe((response: any) => {
                expect(response.length).toBe(2);
            });
        })
    );

    it(
        'should execute POST method with query parameter and return a response',
        inject([ApiClient, MockBackend], (apiClient: ApiClient, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toBe('/my-post-endpoint/?name=Markus');
                expect(connection.request.method).toBe(1);

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify([{id: 5}, {id: 21}])
                })));
            });

            apiClient.executeRequest(new PostCommand('Markus'), 0).subscribe((response: any) => {
                expect(response.length).toBe(2);
            });
        })
    );
});
