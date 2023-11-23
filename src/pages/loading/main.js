
import { createApp } from 'vue';
import 'uno.css'
import router from './router';
import App from './App.vue';
import '@common/styles/reset.scss';
import MyLoading from './components/loading/index'

const app = createApp(App);

app.use(router);
app.use(MyLoading);
app.mount('#app');
