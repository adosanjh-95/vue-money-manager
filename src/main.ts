import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWallet,
  faBars,
  faTimes,
  faPlus,
  faArrowCircleUp,
  faArrowCircleDown,
  faTrash,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faWallet);
library.add(faBars);
library.add(faTimes);
library.add(faPlus);
library.add(faArrowCircleUp);
library.add(faArrowCircleDown);
library.add(faTrash);
library.add(faExpandAlt);

const app = createApp(App);

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
