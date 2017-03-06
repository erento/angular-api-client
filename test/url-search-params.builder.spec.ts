import {UrlSearchParamsBuilder} from '../src/url-search-params.builder';

describe('Url search params builder', () => {
    let builder: UrlSearchParamsBuilder;

    beforeEach(() => {
        builder = new UrlSearchParamsBuilder();
    });

    it('should build query parameters list', () => {
        expect(
            builder.build([['name', 'John'], ['lastname', 'Doe'], ['age', 62]]).toString()
        ).toBe('name=John&lastname=Doe&age=62');
    });

    it('should not fail on edge cases', () => {
        [
            [],
            null,
            undefined,
        ].forEach(value => {
            expect(builder.build(value).toString()).toBe('');
        });
    });
});
