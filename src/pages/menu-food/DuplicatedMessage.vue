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
        }, 10);
      }
    },
  },
};
</script>

<style scoped>
@import url("../../styles/duplicated-message.css");
</style>