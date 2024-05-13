import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const pinia = createPinia();

library.add(fas);

createApp(App).use(pinia).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
