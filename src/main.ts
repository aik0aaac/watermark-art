import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";

// FontAwesomeアイコン
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
library.add(faCamera);
library.add(faUpload);

const app = createApp(App);
app.use(router);

// FontAwesomeをバインド
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
