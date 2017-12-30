import typescript from 'rollup-plugin-typescript';

let pkg = require('./package.json');

export default {
    input: 'src/index.ts',
    file: pkg.main,
    output: {
        format: 'umd',
    },
    name: 'api.client',
    external: [
        '@angular/core',
        '@angular/common/http',
        'rxjs/observable/of',
        'rxjs/observable/throw',
        'rxjs/operators/catchError',
        'rxjs/operators/delay',
        'rxjs/operators/switchMap',
        'rxjs/Observable',
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common/http': 'ng.common.http',
        'rxjs/observable/of': 'rxjs.observable.of',
        'rxjs/observable/throw': 'rxjs.observable.throw',
        'rxjs/Observable': 'rxjx.observable',
        'rxjs/operators/catchError': 'rxjx.operators.catchError',
        'rxjs/operators/delay': 'rxjx.operators.delay',
        'rxjs/operators/switchMap': 'rxjx.operators.switchMap',
    },
    plugins: [typescript({typescript: require('typescript')})]
}
