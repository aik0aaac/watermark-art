<script lang="ts" setup>
import { onMounted, reactive, toRefs } from "vue";
import { sampleImageSelectList } from "@/setting/sampleImageSelectList";

interface State {
  /**
   * 現在表示しているサンプル画像。
   */
  image: any;
  /**
   * ビデオ読み込みエラー内容。
   */
  error: string;
}
const state = reactive<State>({
  image: sampleImageSelectList[0].value,
  error: "",
});
const { image, error } = toRefs(state);

const videoIdName = "captureVideo";
onMounted(() => {
  // Videoタグ経由でカメラへアクセス
  const video = document.getElementById(videoIdName) as HTMLVideoElement;
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch((e) => {
      console.log(e);
      state.error = e;
    });
});

// 自分の画像を使える様に
const uploadImage = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  state.image = URL.createObjectURL(files[0]);
};
</script>

<template>
  <!-- エラー表示 -->
  <section class="error">{{ error }}</section>

  <!-- 透かし絵表示エリア -->
  <section class="wrapper">
    <video
      :id="videoIdName"
      class="capture-video"
      autoplay
      muted
      playsinline
    ></video>
    <img class="cover-watermark-art" :src="image" />
  </section>

  <!-- 透かし絵選択 -->
  <section class="select-image">
    <select v-model="image">
      <option
        v-for="(select, i) in sampleImageSelectList"
        :key="i"
        :value="select.value"
      >
        ▼{{ select.label }}
      </option>
    </select>
  </section>

  <!-- 自分の画像を使う -->
  <section class="upload-image">
    <p class="desc">
      自分のお手持ちの画像を透かし絵にできます。<br />
      PNG形式の画像のみ対応しております。<br />
      画像サイズはスマホの場合、幅360px/高さ500px推奨です。<br />
      ※アップロードされた画像はサーバー等へのアップロードはされません。お好きな画像をお試しください。<br />
    </p>
    <label for="upload-image">ファイルを選択</label>
    <input
      id="upload-image"
      type="file"
      accept="image/png"
      @change="uploadImage"
    />
  </section>
</template>

<style lang="sass" scoped>
$art-area-width: 360px
$art-area-height: 500px

.wrapper
  position: relative
  width: 100%
  .capture-video
    display: block
    margin: 0 auto
    width: $art-area-width
    height: $art-area-height
  .cover-watermark-art
    position: absolute
    top: 50%
    left: 50%
    width: $art-area-width
    height: $art-area-height
    transform: translateX(-50%) translateY(-50%)
    object-fit: contain

.select-image
  select
    appearance: none
    width: 100%
    margin: 1em 0
    padding: 1em
    color: white
    background: black
    border: none
    border-radius: 0
    border-bottom: 2px solid white
    box-sizing: border-box
.upload-image
  margin-top: 1em
  .desc
    margin-bottom: .5rem
    font-size: .8em
  label
    display: inline-block
    width: 100%
    margin: .2em 0
    padding: .5em 0
    text-align: center
    border: 1px solid white
    box-sizing: border-box
  input
    display: none
</style>
