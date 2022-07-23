<template>
  <div class="alert-changed-container" v-show="isOpen">
    <div class="alert-changed">
      <div class="header">
        <div class="title">{{ title }}</div>
      </div>

      <div class="body">
        <div class="body-inside">
          <div class="icon"></div>
          <div class="content">Dữ liệu đã thay đổi, bạn có muốn cất không?</div>
        </div>
      </div>

      <div class="footer">
        <div class="button" @click="eventYes">
          <div class="content">{{ yesBtn }}</div>
        </div>
        <div class="button" @click="eventNo">
          <div class="content">{{ noBtn }}</div>
        </div>
        <div class="button" @click="eventCancel">
          <div class="content">{{ cancelBtn }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";

export default {
  props: ["isOpen"],

  data() {
    return {
      title: resourceCukcuk.VI.formLabels.titleAlertDel,
      yesBtn: resourceCukcuk.VI.buttons.btnYes,
      noBtn: resourceCukcuk.VI.buttons.btnNo,
      cancelBtn: resourceCukcuk.VI.buttons.btnCancel,
      changedDataMsg: resourceCukcuk.VI.message.changedDataMsg,
    };
  },

  methods: {
    /**
     * Event $emit store
     * Author: VQPhong (23/07/2022)
     */
    eventYes() {
      this.$emit("yesChangedData", null);
    },

    /**
     * Event $emit cancel all process
     * Author: VQPhong (23/07/2022)
     */
    eventNo() {
      this.$emit("noChangedData", null);
    },

    /**
     * Event $emit close alert
     * Author: VQPhong (23/07/2022)
     */
    eventCancel() {
      this.$emit("cancelChangedData", null);
    },
  },
};
</script>

<style scoped>
.alert-changed-container {
  z-index: 111;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.4);
}

.alert-changed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 113px;
  min-height: 113px;
  max-height: 113px;
  width: 390px;
  max-width: 390px;
  min-width: 390px;
  background-color: #fff;
  border: 5px solid #0072bc;
  border-radius: 4px;
}

.header {
  height: 25px;
  width: 100%;
  background-color: #0072bc;
}

.header .title {
  color: #fff;
  font-size: 13px;
  font-weight: normal;
  padding-top: 2px;
  padding-left: 2px;
}

.body {
  height: 54px;
}

.body-inside {
  padding: 10px;
  display: flex;
}

.body-inside .icon {
  background-image: url("https://cdn2.cukcuk.vn/QLNH/resources/Image/icon-question.png");
  height: 32px;
  width: 32px;
  background-position: left top;
  background-repeat: no-repeat;
  margin-right: 10px;
}

.body .content {
  color: #000;
  font-size: 13px;
  font-weight: normal;
  width: calc(100% - 42px);
  padding-top: 1px;
}

.footer {
  padding: 6px;
  height: 24px;
  display: flex;
  justify-content: right;
}

.footer .button {
  cursor: pointer;
  background-color: #fcfcfc !important;
  background-image: -webkit-linear-gradient(top, #f2f2f2, #e0e0e0);
  padding: 3px 3px 3px 3px;
  border: 1px solid #ccc;
  margin-right: 6px;
  width: 67px;
}

.footer .button:hover {
  background-image: -webkit-linear-gradient(top, #eff0ee, #e1f2ec);
  border-color: #0072bc;
}

.footer .button:focus-visible {
  background-image: -webkit-linear-gradient(top, #eff0ee, #e1f2ec);
  outline: none;
  border-color: #0072bc;
}

.footer .button .content {
  color: #000;
  font-weight: normal;
  font-size: 12px;
  padding: 0 5px;
  text-align: center;
}
</style>