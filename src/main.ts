import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Icon, Toast, Field, CellGroup } from "pagoda-mobile";
import "pagoda-mobile/lib/index.css";
import "./style/base.stylus";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Field);
Vue.use(CellGroup);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
