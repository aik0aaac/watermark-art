<script lang="ts" setup>
import MainComponent from "@/components/MainComponent.vue";
import { reactive, toRefs } from "vue";

interface State {
  /**
   * カメラデバイスがサポートされてるデバイスかどうか。
   * `true`:サポートされてる/`false`:サポートされてない
   */
  isSupportDevice: boolean;
}
const state = reactive<State>({
  isSupportDevice: false,
});
const { isSupportDevice } = toRefs(state);

// デバイスのサポートチェック
if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
  state.isSupportDevice = true;
}
</script>

<template>
  <div class="wrapper">
    <template v-if="isSupportDevice">
      <MainComponent />
    </template>

    <section v-else class="no-support-device">
      <p>
        カメラ起動が非対応のデバイスです。<br />
        カメラ機能が搭載されている機種からアクセスするか、ブラウザを変えてお試しください。<br />
        製作者が対応しているデバイスは下記の通りです:
      </p>
      <ul>
        <li>iPhone 12(iOS16.3.1) - Chrome</li>
      </ul>
    </section>
  </div>
</template>

<style lang="sass" scoped>
.no-support-device
  text-align: center
</style>
