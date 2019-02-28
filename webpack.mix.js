const mix = require('laravel-mix');

mix.sass('src/sass/index.scss', 'dist/style.css')
   .setPublicPath('dist');
