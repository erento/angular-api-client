import {TestBed, inject} from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    RequestMethod,
    Response,
    ResponseOptions,
    RequestOptions,
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {ApiClient, ApiBaseCommand} from '../src/index';

/* tslint:disable:max-classes-per-file */
class GetCommand extends ApiBaseCommand {
    public method: RequestMethod = RequestMethod.Get;

    constructor (name: string) {
        super('/my-get-endpoint/');
        this.queryParametersList = [['name', name]];
    }
}

class GetIdCommand extends ApiBaseCommand {
    public method: RequestMethod = RequestMethod.Get;

    constructor (id: number, name: string) {
        super('/my-get-endpoint/:id-number/whatever/:name', {
            'id-number': id,
            'name': name,
        });
    }
}

class PostCommand extends ApiBaseCommand {
    public method: RequestMethod = RequestMethod.Post;

    constructor (name?: string) {
        super('/my-post-endpoint/');
        this.body = 'My request body';
        this.queryParametersList = name ? [['name', name]] : [];
    }
}
/* tslint:enable:max-classes-per-file */

describe('Api Client Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ApiClient,
                {
                    provide: Http,
                    useFactory: (mockBackend: MockBackend, options: RequestOptions): Http => new Http(mockBackend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
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
            });

            apiClient.executeRequest(new GetIdCommand(4, 'john'), 0).subscribe();
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
