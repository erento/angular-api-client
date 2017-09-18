import typescript from 'rollup-plugin-typescript';

let pkg = require('./package.json');

export default {
  entry: 'src/index.ts',
  dest: pkg.main,
  format: 'umd',
  moduleName: 'api.client',
  external: [
      '@angular/core',
      '@angular/common/http',
      'rxjs/add/observable/of',
      'rxjs/add/observable/throw',
      'rxjs/add/operator/delay',
      'rxjs/add/operator/catch',
      'rxjs/add/operator/switchMap',
      'rxjs/Observable',
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common/http': 'ng.common.http',
    'rxjs/Observable': 'rxjx.observable',
  },
  plugins: [typescript({typescript: require('typescript')})]
}
