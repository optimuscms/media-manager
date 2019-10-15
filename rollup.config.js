import sass from 'node-sass';
import cssnano from 'cssnano';
import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const globals = {
    'vuex': 'Vuex',
    'axios': 'axios',
    'moment': 'moment',
};

const external = [
    'vuex',
    'axios',
    'moment',
];

const plugins = [
    eslint({
        include: [
            '**/*.js',
            '**/*.vue',
        ],
    }),
    resolve({
        only: [
            'lodash',
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-regular-svg-icons',
        ],
    }),
    commonjs({
        namedExports: {
            'node_modules/lodash/lodash.js': [
                'groupBy',
                'mapValues',
                'sortBy',
                'union',
                'unionBy',
            ],
        },
    }),
    vue({
        compileTemplate: true,
    }),
    babel({
        extensions: ['.js', '.vue'],
    }),
];

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                name: 'MediaManager',
                format: 'umd',
                globals,
                exports: 'named',
            },
            {
                file: pkg.module,
                format: 'esm',
                globals,
                exports: 'named',
            },
        ],
        external,
        plugins,
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/media-manager.min.js',
            name: 'MediaManager',
            format: 'umd',
            globals,
            exports: 'named',
            sourcemap: true,
        },
        external,
        plugins: [
            ...plugins,
            terser(),
        ],
    },
    {
        input: 'src/styles/index.scss',
        output: {
            file: 'dist/media-manager.min.css',
            format: 'es',
        },
        plugins: [
            postcss({
                extract: true,
                minimize: true,
                sourceMap: true,
                extensions: [ '.sass' ],
                plugins: [
                    cssnano(),
                    autoprefixer,
                ],
                preprocessor: (content, id) => new Promise(resolve => {
                    const result = sass.renderSync({ file: id });

                    resolve({
                        code: result.css.toString(),
                    });
                }),
            }),
        ],
    },
];
