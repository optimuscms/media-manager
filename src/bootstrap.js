window.Vue = require('vue');

window.eventBus = new Vue();

Vue.component('o-picker', require('./components/Picker'));

// Utilities
import './util/icons';
