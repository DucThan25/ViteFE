import { createApp } from 'vue'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.vue'
import router from "./router.js";
// import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
// import * as Router from 'vue-router'
import axiosPlugin from "./plugins/axiosPlugin";
import ToastPlugin from 'vue-toast-notification';
import Auth from "./plugins/auth";
import Root from "./plugins/root";
import 'vue-toast-notification/dist/theme-sugar.css';
// import Toast from './plugins/toastPlugin'
// import ToastPlugin from 'vue-toast-notification';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(VueAxios, axiosPlugin);
app.use(Auth);
app.use(Root);
// app.use(Toast);
app.use(ToastPlugin, {position:"top-right"});
app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"
import "jquery/dist/jquery.slim.min.js"