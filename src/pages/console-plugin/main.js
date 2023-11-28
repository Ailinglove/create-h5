
import { createApp } from 'vue';

import _logger from '@logger'
import App from './App.vue';
import 'uno.css';
import VConsole from 'vconsole'

import '@common/utils/rem'
import '@common/styles/reset.scss';

const app = createApp(App);
window._logger = _logger;

new VConsole()

app.mount('#app');
