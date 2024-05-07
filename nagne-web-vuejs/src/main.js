import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// 필요한 아이콘 라이브러리를 추가하세요
import {
  fas
} from "@fortawesome/free-solid-svg-icons";

// 사용할 아이콘을 라이브러리에 추가하세요
library.add(fas);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
