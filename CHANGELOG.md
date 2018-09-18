<a name="7.0.1"></a>
# [7.0.1](https://github.com/erento/angular-api-client/compare/v7.0.0...v7.0.1) (2018-09-18)

- Updated ng-packagr to stable v4.2.0
- Updated other dependecies

<a name="7.0.0"></a>
# [7.0.0](https://github.com/erento/angular-api-client/compare/v6.1.0...v7.0.0) (2018-05-04)

- Migrated to angular CLI v6 with support for library generation

### Breaking changes
- Raised version of angular peer dependencies to `@angular/*@>=6.0.0`
- Raised version of peer dependency on rxjs to `>=6.0.0`

<a name="6.1.0"></a>
# [6.1.0](https://github.com/erento/angular-api-client/compare/v6.0.1...v6.1.0) (2018-02-07)

- Updated ng-packagr to stable v2.0.0

  This will fix an error where a request would not be canceled because catchError operator was incorrectly built.
- Updated rest of dependencies

<a name="6.0.1"></a>
# [6.0.1](https://github.com/erento/angular-api-client/compare/v6.0.0...v6.0.1) (2017-12-30)

- Fixed imports of RxJS operators.

<a name="5.0.2"></a>
# [5.0.2](https://github.com/erento/angular-api-client/compare/v5.0.1...v5.0.2) (2017-12-30)

- Fix rollup build.

<a name="5.0.1"></a>
# [5.0.1](https://github.com/erento/angular-api-client/compare/v5.0.0...v5.0.1) (2017-12-30)

- Fixed imports of RxJS operators.

<a name="4.0.2"></a>
# [4.0.2](https://github.com/erento/angular-api-client/compare/v4.0.1...v4.0.2) (2017-12-30)

- Fix rollup build.

<a name="4.0.1"></a>
# [4.0.1](https://github.com/erento/angular-api-client/compare/v4.0.0...v4.0.1) (2017-12-30)

- Fixed imports of RxJS operators.

<a name="6.0.0"></a>
# [6.0.0](https://github.com/erento/angular-api-client/compare/v5.0.0...v6.0.0) (2017-12-18)

The build process has changed and it is using [ng-packagr](https://github.com/dherges/ng-packagr).
Now we output more formats based on Angular package format.
This shouldn't be a breaking change, but to make sure we don't break your app, we raised the major version to 6.0.0.

<a name="5.0.0"></a>
# [5.0.0](https://github.com/erento/angular-api-client/compare/v4.0.0...v5.0.0) (2017-11-02)

There is no breaking change but we still raise a major version as Angular version was raised to new major release.

* Upgrade of Angular to version: 5.x.x.
* Upgrade of rxjs to version: 5.5.2.
* Using lettable operators from rxjs.

<a name="4.0.0"></a>
# [4.0.0](https://github.com/erento/angular-api-client/compare/v4.0.0-beta.1...v4.0.0) (2017-09-01)

### Breaking changes

* Uses new Http client from `@angular/common`, dependency on the angular packages raised to higher or equal to `4.3.0`.
* Headers are now `key=>value` as query/url parameters.
* Typescript 2.4.1 or higher required.

<a name="4.0.0-beta.1"></a>
# [4.0.0-beta.1](https://github.com/erento/angular-api-client/compare/v3.0.2...v4.0.0-beta.1) (2017-09-01)

### Breaking changes

* We have changed the way how query parameters are created. Now it is a simple object (`key: value`).

  _Before:_

  ```ts
  this.queryParameters = [['search', 'neymar'], ['team', 'psg']];
  ```

  _After:_

  ```ts
  this.queryParameters = {search: 'neymar', team: 'psg'};
  ```

<a name="3.0.2"></a>
# [3.0.2](https://github.com/erento/angular-api-client/compare/v3.0.1...v3.0.2) (2017-07-31)
- Bug fix: Add missing throw observable.
- Chore: Update dependencies.

<a name="3.0.1"></a>
# [3.0.1](https://github.com/erento/angular-api-client/compare/v3.0.0...v3.0.1) (2017-05-15)
- Bug fix: The command's property `withCredentials` is now consistently converted to the boolean value.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/erento/angular-api-client/compare/v2.0.3...v3.0.0) (2017-03-30)
- Increased the peer dependency on Angular to the version 4.
- Changed internal property of Request object from search to params (due to the change in Angular).

<a name="2.0.3"></a>
# [2.0.3](https://github.com/erento/angular-api-client/compare/v2.0.2...v2.0.3) (2017-03-09)
- Decrease the version of Angular peer dependency to ^2.4.0 again as implementation doesn't work in Angular v4 anymore.

<a name="2.0.2"></a>
# [2.0.2](https://github.com/erento/angular-api-client/compare/v2.0.1...v2.0.2) (2017-03-09)
- Fix tsconfig file. Added lib to fix the typings error due to changes in @types/core-js.

<a name="2.0.1"></a>
# [2.0.1](https://github.com/erento/angular-api-client/compare/v2.0.0...v2.0.1) (2017-03-09)
- Increase the version of Angular peer dependency from ^2.4.0 to >=2.4.0.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/erento/angular-api-client/compare/v1.0.0...v2.0.0) (2017-03-09)

### Features

* Added `withCredentials` to the command. ([e63e060](https://github.com/erento/angular-api-client/commit/e63e060))

### Breaking changes

* There was a major refactoring for the command. The command is not a super class anymore, it is an interface.
The logic for building query parameters and constructing urls was separated. The command is now a plain
value object responsible to carry information of the desired request. ([d79fb53](https://github.com/erento/angular-api-client/commit/d79fb53))

  _Before:_

  ```ts
  export class FetchUserCommand extends ApiBaseCommand {
      public method: RequestMethod = RequestMethod.Get;
  
      constructor (userUuid: string) {
          super('/api/user/:uuid', {
              uuid: userUuid 
          });
      }
  }
  ```
  
  _After:_
  
  ```ts
  export class FetchUserCommand implements ApiBaseCommand {
      public method: RequestMethod = RequestMethod.Get;
      public url: string = '/api/user/:uuid';
      public urlPathParameters: UrlPathParameters;
  
      constructor (userUuid: string) {
        this.urlPathParameters = {uuid: userUuid};
      }
  }
  ```

<a name="1.0.0"></a>
# 1.0.0 Initial version
