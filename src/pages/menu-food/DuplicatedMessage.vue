<template>
  <div class="msg-container" v-if="isAlert">
    <div class="main-msg">
      <div class="header">
        <div class="title">{{ title }}</div>
      </div>

      <div class="body">
        <div class="body-inside">
          <div class="icon"></div>
          <div class="content" v-if="isCode">
            Mã
            <span>&lt;{{ currentCode }}&gt;</span>
            đã tồn tại trong danh sách {{ model }}. Bạn vui lòng kiểm tra lại.
          </div>

          <div class="content" v-else-if="isFavorService">
            Sở thích phục vụ
            <span
              >&lt;&lt;{{ favorContent }} - {{ favorSurcharge }}&gt;&gt;</span
            >
            đã tồn tại. Bạn vui lòng kiểm tra lại.
          </div>

          <div class="content" v-else>
            {{ model }}
            <span>&lt;{{ currentCode }}&gt;</span>
            đã tồn tại.
          </div>
        </div>
      </div>

      <div class="footer">
        <button
          class="button"
          @click="$emit('closeMessage', null)"
          ref="autoFocus"
        >
          <div class="content">{{ agree }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
export default {
  props: [
    "isAlert",
    "currentCode",
    "model",
    "isCode",
    "isFavorService",
    "favorContent",
    "favorSurcharge",
  ],

  data() {
    return {
      agree: resourceCukcuk.VI.buttons.btnAgree,
      title: resourceCukcuk.VI.formLabels.titleAlertDel,

      timeout: null,
    };
  },

  watch: {
    /**
     * Author: VQPhong (11/08/2022)
     * Auto focus button "Agree"
     */
    isAlert: function (value) {
      if (value) {
        this.timeout = setTimeout(() => {
          this.$refs.autoFocus.focus();
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.msg-container {
  z-index: 1111;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.4);
}

.main-msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  height: 132px;
  background-color: #fff;
  border: 5px solid #0072bc;
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
  padding-top: 3px;
  padding-left: 2px;
}

.body-inside {
  height: 51px;
  padding: 10px;
  display: flex;
}

.body-inside .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/shared/icon-warning.png");
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

.footer .button:focus-visible, .footer .button:focus {
  background-image: -webkit-linear-gradient(top, #eff0ee, #e1f2ec);
  border-color: #0072bc;
  outline: none;
}

.footer .button .content {
  color: #000;
  font-weight: normal;
  font-size: 12px;
  padding: 0 5px;
  text-align: center;
}
</style>