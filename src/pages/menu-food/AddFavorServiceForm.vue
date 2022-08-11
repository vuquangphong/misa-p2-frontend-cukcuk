<template>
  <div class="add-form-container" v-if="isFavorServiceFormOpen">
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
                    <div class="x-field content">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.favorContent }}</span>
                          <span class="required">&nbsp;(*)</span>
                        </div>
                      </div>
                      <div class="text-area">
                        <div class="text-area-container">
                          <div
                            :class="{
                              textArea: true,
                              focus: isFocusContent,
                              alert: isEmptyContent,
                            }"
                          >
                            <textarea
                              name=""
                              id=""
                              v-model="formInfo.Content"
                              @focusin="focusinEvent('Content', true)"
                              @focusout="focusoutEvent('Content', true)"
                              ref="firstInput"
                            ></textarea>
                          </div>

                          <div
                            class="required-alert"
                            v-if="isEmptyContent"
                            @mouseover="isShowAlertContent = true"
                            @mouseleave="isShowAlertContent = false"
                          >
                            <div class="alert-icon"></div>
                            <div
                              class="alert-hover"
                              v-show="isShowAlertContent"
                            >
                              <div class="alert-hover-inside">
                                <div class="icon"></div>
                                <div class="message">{{ alertRequired }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field surcharge">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.favorSurcharge }}</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-container">
                          <div
                            :class="{
                              inputLabel: true,
                              focus: isFocusSurcharge,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.Surcharge"
                              @focusin="focusinEvent('Surcharge', false)"
                              @focusout="focusoutEvent('Surcharge', false)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Maybe "Group of FavorService" -->
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
      :isFavorService="true"
      :isAlert="isAlertDuplicated"
      :favorContent="formInfo.Content"
      :favorSurcharge="formInfo.Surcharge"
      @closeMessage="isAlertDuplicated = false"
    />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import DuplicatedMessage from "./DuplicatedMessage.vue";
import { mapActions, mapGetters } from "vuex";
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { enumCukcuk } from "@/utils/enumCukcuk";
import { createModel } from "@/utils/call_apis/Post";
import { filterFromMoney, filterToMoney } from "@/utils/commonFunc";

export default {
  components: { DuplicatedMessage },

  setup() {
    const state = reactive({
      formInfo: {
        Content: "",
        Surcharge: 0,
      },
    });

    return { ...toRefs(state) };
  },

  data() {
    return {
      isAlertDuplicated: false,
      alertInterrupt: false,
      timeout: null,
      isFocusContent: false,
      isFocusSurcharge: false,
      isEmptyContent: false,
      isShowAlertContent: false,

      labels: resourceCukcuk.VI.tableHeader,
      formTitle: resourceCukcuk.VI.formLabels.titleFormAddFavorService,
      alertRequired: resourceCukcuk.VI.message.alertRequired,

      btnHelp: resourceCukcuk.VI.buttons.btnHelp,
      btnStore: resourceCukcuk.VI.buttons.btnStore,
      btnCancel: resourceCukcuk.VI.buttons.btnCancel,

      msgNoFunction: resourceCukcuk.VI.message.noFunction,
      alertErrorMsg: resourceCukcuk.VI.message.generalErrMsg,
    };
  },

  computed: {
    ...mapGetters(["isFavorServiceFormOpen", "allFavorService"]),
  },

  watch: {
    /**
     * Author: VQPhong (10/08/2022)
     * Clear form and focus on first input when this form close/open
     */
    isFavorServiceFormOpen: function (value) {
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

    /**
     * Author: VQPhong (11/08/2022)
     *
     */
    "formInfo.Surcharge": function (newValue, oldValue) {
      if (newValue) {
        if (newValue.toString().length > 18) {
          this.formInfo.Surcharge = filterFromMoney(oldValue);
        } else {
          this.formInfo.Surcharge = filterFromMoney(newValue);
        }
      }
    },
  },

  methods: {
    /**
     * Alert no function
     * Author: VQPhong (10/08/2022)
     */
    noFunction() {
      alert(this.msgNoFunction);
    },

    /**
     * Close this form
     * Author: VQPhong (22/07/2022)
     */
    closeForm() {
      this.closeFavorServiceForm();
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
        if (!this.formInfo[`${field}`]) {
          this[`isEmpty${field}`] = true;
        }
      }

      // For money
      if (field === "Surcharge") {
        if (!this.formInfo.Surcharge) {
          this.formInfo.Surcharge = 0;
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
        Content: cur.formInfo.Content,
        Surcharge: cur.formInfo.Surcharge,
      };

      // Validate Compulsory fields
      if (!formPost.Content) {
        cur.isEmptyContent = true;
        cur.alertInterrupt = true;
      }

      if (cur.alertInterrupt) return;

      // Check if current FavorService is duplicated
      if (cur.isDuplicatedFavor(formPost.Content, formPost.Surcharge)) {
        cur.alertInterrupt = true;
        cur.isAlertDuplicated = true;
        return;
      }

      try {
        cur.controlLoader();

        const res = await createModel("v1", "FavorServices", formPost);

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.created
        ) {
          cur.$store.dispatch("getAllFavorService");
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
     * Author: VQPhong (11/08/2022)
     */
    clearForm() {
      Object.keys(this.formInfo).forEach((key) => {
        if (key === "Surcharge") {
          this.formInfo[key] = 0;
        } else {
          this.formInfo[key] = "";
        }
      });
    },

    /**
     * Check if the current FavorService is duplicated.
     * Author: VQPhong (11/08/2022)
     */
    isDuplicatedFavor(content, surcharge) {
      let tempContent = content.toLowerCase();
      let tempSurcharge = filterToMoney(surcharge);

      for (const item of this.allFavorService) {
        if (
          tempContent === item.Content.toLowerCase() &&
          tempSurcharge === item.Surcharge
        ) {
          return true;
        }
      }

      return false;
    },

    ...mapActions(["controlLoader", "closeFavorServiceForm"]),
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
  height: 160px;
  min-height: 160px;
  max-height: 160px;
  width: 450px;
  max-width: 450px;
  min-width: 450px;
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
  height: 79px;
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
  width: 185px;
}

.label-input-inside {
  padding: 4px 5px 0 0;
}

.x-field .label-input span.required {
  color: red;
}

.x-field .input,
.x-field .text-area {
  height: 100%;
  flex: 1;
}

.x-field.content {
  height: 50px;
}

.x-field.content .textArea {
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
  width: 100%;
}

.x-field.content .textArea.focus {
  border-color: #0071c1;
}

.x-field.content .textArea.alert {
  border-color: red;
}

.x-field.content .textArea {
  padding: 3px 5px 3px;
}

.content textarea {
  min-height: 39px;
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
  align-items: flex-end;
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

.input-container {
  height: 24px;
  display: flex;
}

.text-area-container {
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

.x-field.surcharge input {
  text-align: right;
}
</style>