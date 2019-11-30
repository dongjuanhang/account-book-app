import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Icon, Toast, Field, CellGroup, SwipeCell, Cell, NavBar, Loading, RadioGroup, Radio } from "pagoda-mobile";

import "pagoda-mobile/lib/index.css";
import "./style/base.stylus";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Loading);
Vue.use(RadioGroup);
Vue.use(Radio);
// Vue.use(ResultPage);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
