<template>
  <div class="add-form-container" v-show="isOpenExtraForm">
    <div class="add-form">
      <div class="form-header">
        <div class="form-header-inside">
          <div class="form-title">{{ formTitle }}</div>
          <div class="form-close-btn">
            <div class="close-icon" @click="closeForm"></div>
          </div>
        </div>
      </div>

      <div class="form-body">
        <div class="form-panel-container">
          <div class="form-panel">
            <div class="main-body-container">
              <div class="main-body-general">
                <div class="list-input-container">
                  <div class="list-input">
                    <div class="x-field name">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.unitName }}</span>
                          <span class="required">&nbsp;(*)</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-container">
                          <div
                            :class="{
                              inputLabel: true,
                              focus: isFocusName,
                              alert: isEmptyName,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.FoodUnitName"
                              @focusin="focusinEvent('Name', true)"
                              @focusout="focusoutEvent('Name', true)"
                              ref="firstInput"
                            />
                          </div>

                          <div
                            class="required-alert"
                            v-if="isEmptyName"
                            @mouseover="isShowAlertName = true"
                            @mouseleave="isShowAlertName = false"
                          >
                            <div class="alert-icon"></div>
                            <div class="alert-hover" v-show="isShowAlertName">
                              <div class="alert-hover-inside">
                                <div class="icon"></div>
                                <div class="message">{{ alertRequired }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field description">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.descriptionExtra }}</span>
                        </div>
                      </div>
                      <div :class="{ input: true, focus: isFocusDescription }">
                        <div class="textArea">
                          <textarea
                            name=""
                            id=""
                            v-model="formInfo.Description"
                            @focusin="focusinEvent('Description', false)"
                            @focusout="focusoutEvent('Description', false)"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-footer">
          <div class="form-buttons">
            <div class="left-buttons">
              <button class="button" @click="noFunction">
                <div class="help-btn">
                  <span class="icon"></span>
                  <span class="title">{{ btnHelp }}</span>
                </div>
              </button>
            </div>

            <div class="right-buttons">
              <button class="button" @click="eventStoreBtn">
                <div class="store-btn">
                  <span class="icon"></span>
                  <span class="title">{{ btnStore }}</span>
                </div>
              </button>

              <button class="button" @click="closeForm">
                <div class="cancel-btn">
                  <span class="icon"></span>
                  <span class="title">{{ btnCancel }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DuplicatedMessage
      :isAlert="isAlertDuplicatedName"
      :currentCode="formInfo.FoodUnitName"
      :model="'Đơn vị tính'"
      @closeMessage="isAlertDuplicatedName = false"
    />
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { reactive, toRefs } from "@vue/reactivity";
import { enumCukcuk } from "@/utils/enumCukcuk";
import { mapActions, mapGetters } from "vuex";
import { createModel } from "@/utils/call_apis/Post";
import DuplicatedMessage from "./DuplicatedMessage.vue";

export default {
  components: { DuplicatedMessage },

  setup() {
    const state = reactive({
      formInfo: {
        FoodUnitName: "",
        Description: "",
      },
    });

    return { ...toRefs(state) };
  },

  props: ["isOpenExtraForm"],

  data() {
    return {
      msgNoFunction: resourceCukcuk.VI.message.noFunction,
      labels: resourceCukcuk.VI.tableHeader,
      formTitle: resourceCukcuk.VI.formLabels.titleFormAddUnit,
      alertRequired: resourceCukcuk.VI.message.alertRequired,
      alertErrorMsg: resourceCukcuk.VI.message.generalErrMsg,

      isFocusName: false,
      isFocusDescription: false,

      isEmptyName: false,

      isShowAlertName: false,

      btnHelp: resourceCukcuk.VI.buttons.btnHelp,
      btnStore: resourceCukcuk.VI.buttons.btnStore,
      btnCancel: resourceCukcuk.VI.buttons.btnCancel,

      timeout: null,
      alertInterrupt: false,
      isAlertDuplicatedName: false,
    };
  },

  computed: {
    ...mapGetters(["foodUnit"]),
  },

  watch: {
    isOpenExtraForm: function (value) {
      const cur = this;

      if (!value) {
        cur.clearForm();
      }

      clearTimeout(cur.timeout);

      cur.timeout = setTimeout(() => {
        cur.$refs.firstInput.focus();
      }, 100);

      cur.isEmptyName = false;
    },
  },

  methods: {
    /**
     * Alert no function
     * Author: VQPhong (14/07/2022)
     */
    noFunction() {
      alert(this.msgNoFunction);
    },

    /**
     * Close this form
     * Author: VQPhong (22/07/2022)
     */
    closeForm() {
      this.$emit("closeExtraForm", null);
    },

    /**
     * Event focus in input
     * Author: VQPhong (17/07/2022)
     */
    focusinEvent(field, required) {
      this[`isFocus${field}`] = true;

      // Remove alert if it exists
      if (required) {
        this[`isEmpty${field}`] = false;
      }
    },

    /**
     * Event focus out input
     * Author: VQPhong (17/07/2022)
     */
    focusoutEvent(field, required) {
      this[`isFocus${field}`] = false;

      // Check if required field is empty
      if (required) {
        if (!this.formInfo[`FoodUnit${field}`]) {
          this[`isEmpty${field}`] = true;
        }
      }
    },

    /**
     * Event store button
     * Author: VQPhong (18/07/2022)
     */
    async eventStoreBtn() {
      await this.addNewFoodUnit();
      if (!this.alertInterrupt) {
        this.closeForm();
      }
    },

    /**
     * Add a new FoodUnit
     * Author: PhongVQ (18/07/2022)
     */
    async addNewFoodUnit() {
      const cur = this;

      cur.alertInterrupt = false;

      let formPost = {
        FoodUnitName: cur.formInfo.FoodUnitName,
        Description: cur.formInfo.Description,
      };

      // Validate Compulsory fields
      if (!formPost.FoodUnitName) {
        cur.isEmptyName = true;
        cur.alertInterrupt = true;
      }

      if (cur.alertInterrupt) return;

      // Check if FoodUnitName is duplicated
      if (cur.isDuplicatedName(formPost.FoodUnitName)) {
        cur.alertInterrupt = true;
        cur.isAlertDuplicatedName = true;
        return;
      }

      try {
        cur.controlLoader();

        const res = await createModel("v1", "FoodUnits", formPost);

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.created
        ) {
          cur.$store.dispatch("getFoodUnit");
          cur.alertInterrupt = false;
        }

        cur.controlLoader();
      } catch (err) {
        cur.controlLoader();
        alert(cur.alertErrorMsg);
        console.log(err);
      }
    },

    /**
     * Clear all field
     * Author: VQPhong (18/07/2022)
     */
    clearForm() {
      Object.keys(this.formInfo).forEach((key) => {
        this.formInfo[key] = "";
      });
    },

    /**
     * Check if the FoodUnitName is duplicated.
     * Author: VQPhong (19/07/2022)
     */
    isDuplicatedName(currentName) {
      let tempName = currentName.toLowerCase();
      for (const unit of this.foodUnit) {
        if (tempName === unit.FoodUnitName.toLowerCase()) {
          return true;
        }
      }
      return false;
    },

    ...mapActions(["controlLoader"]),
  },
};
</script>

<style scoped>
.add-form-container {
  z-index: 11;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.4);
}

.add-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 158px;
  min-height: 158px;
  max-height: 158px;
  width: 420px;
  max-width: 420px;
  min-width: 420px;
  background-color: #fff;
  border: 5px solid #0072bc;
}

.form-header {
  width: 100%;
  height: 20px;
  background-color: #0072bc;
  border-bottom: 5px solid #0072bc;
}

.form-header-inside {
  padding: 3px 4px 1px 4px;
  display: flex;
}

.form-title {
  font-size: 13px;
  color: #fff;
  flex: 1;
}

.form-close-btn {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.form-close-btn .close-icon {
  background-color: transparent;
  opacity: 1;
  overflow: hidden;
  width: 16px;
  height: 16px;
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/tools/tool-sprites.png");
  margin: 0;
  cursor: pointer;
}

.form-body {
  width: 100%;
}

.form-body .form-panel-container {
  padding: 8px;
  height: 76px;
}

.form-panel {
  width: 100%;
  height: 100%;
}

.form-panel .tab-bar {
  width: 100%;
  height: 29px;
  background-color: #f2f2f2;
  display: flex;
  font-size: 13px;
}

.generalTab,
.favorServiceTab {
  cursor: pointer;
  padding: 5px 8px;
  border-top: 2px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.generalTab:hover,
.favorServiceTab:hover {
  background-color: rgba(127, 199, 227, 0.4);
  border-top: 2px solid #005082;
  border-right: 1px solid #ccc;
}

.tab-bar .selected {
  background-color: #fff;
  color: #0072bc;
  border-top: 2px solid #0072bc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.main-body-container {
  height: 100%;
}

.main-body-general {
  display: flex;
}

.list-input-container {
  width: 506px;
}

.x-field {
  height: 24px;
  margin-bottom: 5px;
  display: flex;
}

.x-field .label-input {
  font-size: 13px;
  width: 105px;
}

.label-input-inside {
  padding: 4px 5px 0 0;
}

.x-field .label-input span.required {
  color: red;
}

.x-field .input {
  height: 100%;
  flex: 1;
}

.x-field.description {
  height: 50px;
}

.x-field.description .input {
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
}

.x-field.description .input.focus {
  border-color: #0071c1;
}

.x-field.description .input .textArea {
  padding: 3px 5px 3px;
}

.description textarea {
  min-height: 48px;
  color: #000;
  padding: 0;
  outline: none;
  font-size: 12px;
  border: none;
  border-radius: 0;
  display: block;
  background: repeat-x 0 0;
  width: 100%;
  resize: none;
}

.form-body .form-footer {
  height: 25px;
  padding: 8px;
}

.form-buttons {
  width: 100%;
  height: 100%;
  display: flex;
}

.right-buttons {
  flex: 1;
  display: flex;
  justify-content: right;
}

.form-buttons .button {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 3px;
}

.form-buttons .button:hover {
  border-color: #0071c1;
  background-image: -webkit-linear-gradient(top, #eff0ee, #eff2e9);
}

.form-buttons .button:focus-visible {
  background-image: -webkit-linear-gradient(top, #eff0ee, #eff2e9);
  outline: none;
  border-color: #0071c1;
}

.help-btn {
  width: 67px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.store-btn {
  width: 86px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.cancel-btn {
  width: 91px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.form-buttons .icon {
  width: 16px;
  height: 16px;
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/IconSprite.png");
  background-color: transparent;
  background-repeat: no-repeat;
  display: inline-block;
}

.form-buttons .title {
  font-size: 12px;
  padding: 0.5px 5px 0 5px;
}

.help-btn .icon {
  background-position: 0 -1600px;
}

.store-btn .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/Save16.png");
  margin-top: 1px;
}

.cancel-btn .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/Disable16.png");
  margin-top: 0.5px;
}

.right-buttons .button {
  margin-left: 8px;
}

.avatar-container {
  width: calc(100% - 514px);
}

fieldset {
  padding: 0px 8px 8px;
  border: 1px solid #afafaf;
  height: 185px;
  position: relative;
}

.fieldset-header {
  position: absolute;
  top: -11px;
  left: 8px;
  padding: 0 3px 1px;
  line-height: 16px;
  color: #000;
  font-size: 13px;
  font-weight: normal;
  background-color: #fff;
}

.fieldset-header .title {
  padding: 1px 0;
}

.fieldset-body {
  display: flex;
  width: 100%;
  margin-top: 12px;
}

.fieldset-body .panel-default {
  width: 160px;
  margin-right: 4px;
  position: relative;
}

.panel-default .theme {
  padding-bottom: 8px;
}

.panel-default img {
  height: 120px;
  width: 160px;
}

.panel-default .guide {
  text-align: center;
  font-size: 12px;
}

.panel-default .guide div + div {
  padding-top: 2px;
  font-weight: bold;
}

.panel-default .select-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 25px;
}

.select-icon-inside {
  background-color: #fcfcfc;
  border: 1px solid #ccc;
  padding: 3px;
  height: calc(100% - 8px);
  cursor: pointer;
}

.select-icon-inside:hover {
  border-color: #1064a1;
}

.select-icon-inside .content {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.select-icon-inside .content .icon {
  background: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/menu/selectIconMenu.png")
    no-repeat 3px center;
  width: 16px;
  height: 16px;
}

.select-icon-inside .content .title {
  font-size: 12px;
  color: #026b97;
  font-weight: normal;
  padding: 0 5px;
}

.fieldset-body .panel-extend {
  width: calc(100% - 164px);
}

.panel-extend .select-img,
.panel-extend .remove-img {
  height: 25px;
  width: 27px;
  margin-bottom: 4px;
}

.panel-extend .inside {
  background-color: #fcfcfc;
  border: 1px solid #ccc;
  padding: 3px;
  text-align: center;
  color: #000;
  font-size: 13px;
  font-weight: normal;
  height: calc(100% - 8px);
  cursor: pointer;
}

.panel-extend .inside:hover {
  border-color: #0071c1;
  background-image: -webkit-linear-gradient(top, #eff0ec, #eff2e9);
}

.remove-img img {
  width: 11px;
}

.main-body-favor-service {
  padding-top: 200px;
  text-align: center;
  font-weight: 600;
  font-size: x-large;
}

.input-container {
  height: 24px;
  display: flex;
}

.inputLabel {
  height: calc(100% - 2px);
  width: 100%;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
  color: #000;
  font-weight: normal;
}

.inputLabel.focus {
  border-color: #0071c1;
}

.inputLabel.alert {
  width: calc(100% - 26px);
  border-color: red;
}

.inputLabel input {
  border: none;
  outline: none;
  width: calc(100% - 10px);
  padding: 3px 5px;
  font-size: 12px;
  height: 16px;
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