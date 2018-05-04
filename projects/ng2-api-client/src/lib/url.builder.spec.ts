import {UrlBuilder} from './url.builder';

describe('Url builder', () => {
    let builder: UrlBuilder;

    beforeEach(() => {
        builder = new UrlBuilder();
    });

    it('should keep url as is when there are no parameters', () => {
        expect(builder.build('/endpoint/', {})).toBe('/endpoint/');
        expect(builder.build('/endpoint/', undefined)).toBe('/endpoint/');
        expect(builder.build('/endpoint/', null)).toBe('/endpoint/');
    });

    it('should replace path parameters', () => {
        expect(builder.build(
            '/endpoint/:name/user/:lastname',
            {
                name: 'John',
                lastname: 'Doe',
            },
        )).toBe('/endpoint/John/user/Doe');
    });

    it('should throw an error', () => {
        const init: () => string = (): string => builder.build(
            '/endpoint/:name',
            {
                id: 4,
                name: 'John',
                NOT_IN_TEMPLATE: 'whatever',
            },
        );

        expect(init).toThrowError('Url path parameters are not aligned.');
    });
});
