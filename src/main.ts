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
  faArrowUp,
  faArrowDown,
  faArrowCircleUp,
  faArrowCircleDown,
  faTrash,
  faExpandAlt,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faWallet);
library.add(faBars);
library.add(faTimes);
library.add(faMoneyCheck);
library.add(faArrowUp);
library.add(faArrowDown);
library.add(faPlus);
library.add(faArrowCircleUp);
library.add(faArrowCircleDown);
library.add(faTrash);
library.add(faExpandAlt);

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

const app = createApp(App);

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
