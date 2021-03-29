import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

const app = createApp(App);

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
