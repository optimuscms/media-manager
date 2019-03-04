const mix = require('laravel-mix');

mix.sass('src/sass/index.scss', 'dist/styles.css')
   .setPublicPath('dist');
