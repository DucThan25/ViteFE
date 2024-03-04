// import VueToastificationPlugin from 'vue-toastification'
// Import the CSS or use your own!
// import 'vue-toastification/dist/index.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import {useToast} from 'vue-toast-notification';
// const options = {
//   // You can set your default options here
//   allowHtml: true,
//   postition: "top-right"
// }

// export default {
//   install (Vue) {
//     Vue.use(VueToastificationPlugin, options);
//   }
// }


export default {
  install: function (app) {
    app.config.globalProperties.$toast = useToast();
  }
}