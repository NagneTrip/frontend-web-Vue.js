import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useKakao } from "vue3-kakao-maps/@utils";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
useKakao(import.meta.env.VITE_KAKAO_MAP_KEY);
// fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const pinia = createPinia();

library.add(fas);

createApp(App)
  .component("infinite-loading", InfiniteLoading)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
