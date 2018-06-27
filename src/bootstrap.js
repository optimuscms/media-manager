window.Vue = require('vue');

window.eventBus = new Vue();

Vue.component('media-manager', require('./components/Manager'));
Vue.component('o-picker', require('./components/Picker'));

// Utilities
import './util/icons';
