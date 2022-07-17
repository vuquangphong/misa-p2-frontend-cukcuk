<template>
  <div class="combo-container">
    <div class="comboLabel">
      <input
        type="text"
        :value="valueOfInput"
        @input="changeValue"
        ref="input"
      />

      <div class="drop-down"></div>

      <div class="add-trigger"></div>
    </div>

    <div
      class="required-alert"
      v-if="true"
      @mouseover="isShowAlert = true"
      @mouseleave="isShowAlert = false"
    >
      <div class="alert-icon"></div>
      <div class="alert-hover" v-show="isShowAlert">
        <div class="alert-hover-inside">
          <div class="icon"></div>
          <div class="message">{{ alertRequired }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";

export default {
  props: [
    "valueOfInput",
    "isFoodGroup",
    "isFoodUnit",
    "isFoodPlace",
    "isAlert",
    "isCompulsory"
  ],

  data() {
    return {
      currentValue: "",
      isFocus: false,
      isShowAlert: false,
      alertRequired: resourceCukcuk.VI.message.alertRequired,
    };
  },

  methods: {
    /**
     * Event change value of Input
     * Author: VQPhong (13/07/2022)
     */
    changeValue(event) {
      this.currentValue = event.target.value;
      this.$emit("changeValue", this.currentValue);
    },
  },
};
</script>

<style scoped>
.combo-container {
  display: flex;
}

.comboLabel {
  display: flex;
  height: calc(100% - 2px);
  width: 100%;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
  color: #000;
  font-weight: normal;
}

.comboLabel input {
  border: none;
  outline: none;
  width: calc(100% - 54px);
  padding: 3px 5px;
  font-size: 12px;
  height: 16px;
}

.drop-down {
  background: #fff
    url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/trigger.png")
    no-repeat 0 center;
  width: 22px;
  display: table-cell;
  vertical-align: top;
  cursor: pointer;
}

.add-trigger {
  background: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png")
    no-repeat center center;
  display: table-cell;
  vertical-align: top;
  cursor: pointer;
  width: 22px;
}

.required-alert {
  width: 26px;
  display: flex;
  align-items: center;
  position: relative;
}

.alert-icon {
  width: 16px;
  height: 16px;
  margin: 0 5px 0 5px;
  background: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png")
    no-repeat;
}

.alert-hover {
  z-index: 1;
  position: absolute;
  top: 30px;
  left: 30px;
  min-width: 100px;
  width: 231px;
}

.alert-hover .icon {
  width: 16px;
  height: 16px;
  margin: 0 5px 0 5px;
  background: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/exclamation.png")
    no-repeat;
}

.alert-hover-inside {
  border-radius: 3px;
  padding: 7px 2px 7px 2px;
  border: 1px solid #e1e1e1;
  background-color: #eaf3fa;
  display: flex;
}

.alert-hover .message {
  font-size: 13px;
}
</style>