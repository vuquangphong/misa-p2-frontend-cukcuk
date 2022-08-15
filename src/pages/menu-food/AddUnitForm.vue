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
    /**
     * Author: VQPhong (14/07/2022)
     * Clear form when this form close/open
     */
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
@import url("../../styles/add-form.css");

.add-form {
  height: 158px;
  min-height: 158px;
  max-height: 158px;
  width: 420px;
  max-width: 420px;
  min-width: 420px;
}
</style>