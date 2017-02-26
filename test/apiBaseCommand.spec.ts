import {RequestMethod, URLSearchParams} from '@angular/http';
import {ApiBaseCommand} from '../src/index';

/* tslint:disable:max-classes-per-file */
class GetCommand extends ApiBaseCommand {
    public method: RequestMethod = RequestMethod.Get;

    constructor (name: string, lastName: string) {
        super('/endpoint/');
        this.queryParametersList = [['name', name], ['lastname', lastName]];
    }
}

class GetCommandWithError extends ApiBaseCommand {
    public method: RequestMethod = RequestMethod.Get;

    constructor (id: number, name: string) {
        super('/endpoint/:name', {
            id: id,
            name: name,
            NOT_IN_TEMPLATE: 'whatever',
        });
    }
}
/* tslint:enable:max-classes-per-file */

describe('Api Base Command', () => {
    it('should build query parameters list', () => {
        const command: GetCommand = new GetCommand('John', 'Doe');
        const queryParameterList: URLSearchParams = command.getQueryParameterList();
        expect(queryParameterList.toString()).toBe('name=John&lastname=Doe');
    });

    it('should throw an error', () => {
        const init: Function = (): GetCommandWithError => new GetCommandWithError(4, 'Doe');

        expect(init).toThrowError('Url path parameters are not aligned.');
    });
});
