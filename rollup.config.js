import typescript from 'rollup-plugin-typescript';

let pkg = require('./package.json');

export default {
  entry: 'src/index.ts',
  dest: pkg.main,
  format: 'umd',
  moduleName: 'api.client',
  external: [
      '@angular/core',
      '@angular/http',
      'rxjs/add/operator/map',
      'rxjs/add/operator/catch',
      'rxjs/Observable',
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/http': 'ng.http',
    'rxjs/Observable': 'rxjx.observable',
  },
  plugins: [typescript({typescript: require('typescript')})]
}
