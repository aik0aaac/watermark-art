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

const artFrameWidth = 360;
const artFrameHeight = 500;

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

// ローカルの画像を使える様に
const uploadImage = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  state.image = URL.createObjectURL(files[0]);
};

// スクショを簡単に撮れる様に
const snapshotCanvasIdName = "snapshotCanvas";
const imgIdName = "imgIdName";
const generateSnapshot = () => {
  const canvas = document.getElementById(
    snapshotCanvasIdName
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const video = document.getElementById(videoIdName) as HTMLVideoElement;
  const imageEle = document.getElementById(imgIdName) as HTMLImageElement;
  canvas.setAttribute("width", artFrameWidth.toString());
  canvas.setAttribute("height", artFrameHeight.toString());
  ctx.drawImage(video, 0, 0, artFrameWidth, artFrameHeight);
  ctx.drawImage(imageEle, 0, 0, artFrameWidth, artFrameHeight);
  canvas.toBlob((blob) => {
    if (!blob) return;
    // 画像を生成
    const snapshotImageUrl = window.URL.createObjectURL(blob);
    const mimeTypeArray = blob.type.split("/");
    const extension = mimeTypeArray[1];
    // 画像をローカルに保存させる
    const saveAnchor = document.createElement("a");
    saveAnchor.href = snapshotImageUrl;
    saveAnchor.download = `fileName.${extension}`;
    document.body.appendChild(saveAnchor);
    saveAnchor.click();
    document.body.removeChild(saveAnchor);
  });
};
</script>

<template>
  <!-- エラー表示 -->
  <section class="error">{{ error }}</section>

  <!-- 透かし絵表示エリア -->
  <section class="watermark-art-wrapper">
    <video
      :id="videoIdName"
      class="capture-video"
      :width="artFrameWidth"
      :height="artFrameHeight"
      autoplay
      muted
      playsinline
    ></video>
    <img
      :id="imgIdName"
      :width="artFrameWidth"
      :height="artFrameHeight"
      class="cover-watermark-art"
      :src="image"
    />
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

  <!-- キャプチャ -->
  <section class="capture-control">
    <button type="button" @click="generateSnapshot">
      <font-awesome-icon icon="fa-solid fa-camera" />キャプチャ
    </button>
  </section>

  <!-- 自分の画像を使う -->
  <section class="upload-image">
    <p class="desc">
      お手持ちの画像を透かし絵にできます。<br />
      PNG形式の画像のみ対応しております。<br />
      画像サイズはスマホの場合、幅360px/高さ500pxかこの比率に合わせた画像推奨です。<br />
      ※アップロードされた画像はご自身の端末内部でのみ処理され、外部へのアップロードはされません。お好きな画像をお試しください。<br />
    </p>
    <label for="upload-image"
      ><font-awesome-icon icon="fa-solid fa-upload" />画像を選択</label
    >
    <input
      id="upload-image"
      type="file"
      accept="image/png"
      @change="uploadImage"
    />
  </section>

  <section class="capture-display">
    <canvas :id="snapshotCanvasIdName" />
  </section>
</template>

<style lang="sass" scoped>
.watermark-art-wrapper
  position: relative
  width: 100%
  .capture-video
    display: block
    margin: 0 auto
  .cover-watermark-art
    position: absolute
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    object-fit: contain

.capture-control
  margin: 0
  button
    width: 100%
    padding: .5em
    font-size: 1em
    background-color: transparent
    border: 1px solid white
    appearance: none
    svg
      margin-right: .2em
.capture-display
  display: none

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
    svg
      margin-right: .2em
  input
    display: none
</style>
