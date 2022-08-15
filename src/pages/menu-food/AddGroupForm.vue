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
                    <div class="x-field code">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.groupCode }}</span>
                          <span class="required">&nbsp;(*)</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-container">
                          <div
                            :class="{
                              inputLabel: true,
                              focus: isFocusCode,
                              alert: isEmptyCode,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.FoodGroupCode"
                              @focusin="focusinEvent('Code', true)"
                              @focusout="focusoutEvent('Code', true)"
                              ref="firstInput"
                            />
                          </div>

                          <div
                            class="required-alert"
                            v-if="isEmptyCode"
                            @mouseover="isShowAlertCode = true"
                            @mouseleave="isShowAlertCode = false"
                          >
                            <div class="alert-icon"></div>
                            <div class="alert-hover" v-show="isShowAlertCode">
                              <div class="alert-hover-inside">
                                <div class="icon"></div>
                                <div class="message">{{ alertRequired }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field name">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.groupName }}</span>
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
                              v-model="formInfo.FoodGroupName"
                              @focusin="focusinEvent('Name', true)"
                              @focusout="focusoutEvent('Name', true)"
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
      :isAlert="isAlertDuplicatedCode"
      :currentCode="formInfo.FoodGroupCode"
      :model="'nhóm thực đơn'"
      :isCode="true"
      @closeMessage="isAlertDuplicatedCode = false"
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
        FoodGroupCode: "",
        FoodGroupName: "",
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
      formTitle: resourceCukcuk.VI.formLabels.titleFormAddGroup,
      alertRequired: resourceCukcuk.VI.message.alertRequired,
      alertErrorMsg: resourceCukcuk.VI.message.generalErrMsg,

      isFocusCode: false,
      isFocusName: false,
      isFocusDescription: false,

      isEmptyCode: false,
      isEmptyName: false,

      isShowAlertCode: false,
      isShowAlertName: false,

      btnHelp: resourceCukcuk.VI.buttons.btnHelp,
      btnStore: resourceCukcuk.VI.buttons.btnStore,
      btnCancel: resourceCukcuk.VI.buttons.btnCancel,

      timeout: null,
      alertInterrupt: false,
      isAlertDuplicatedCode: false,
    };
  },

  computed: {
    ...mapGetters(["foodGroup"]),
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

      cur.isEmptyCode = false;
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
        if (!this.formInfo[`FoodGroup${field}`]) {
          this[`isEmpty${field}`] = true;
        }
      }
    },

    /**
     * Event store button
     * Author: VQPhong (18/07/2022)
     */
    async eventStoreBtn() {
      await this.addNewFoodGroup();
      if (!this.alertInterrupt) {
        this.closeForm();
      }
    },

    /**
     * Add a new FoodGroup
     * Author: PhongVQ (18/07/2022)
     */
    async addNewFoodGroup() {
      const cur = this;

      cur.alertInterrupt = false;

      let formPost = {
        FoodGroupCode: cur.formInfo.FoodGroupCode,
        FoodGroupName: cur.formInfo.FoodGroupName,
        Description: cur.formInfo.Description,
      };

      // Validate Compulsory fields
      if (!formPost.FoodGroupCode) {
        cur.isEmptyCode = true;
        cur.alertInterrupt = true;
      }

      if (!formPost.FoodGroupName) {
        cur.isEmptyName = true;
        cur.alertInterrupt = true;
      }

      if (cur.alertInterrupt) return;

      // Check if FoodGroupCode is duplicated
      if (cur.isDuplicatedCode(formPost.FoodGroupCode)) {
        cur.alertInterrupt = true;
        cur.isAlertDuplicatedCode = true;
        return;
      }

      try {
        cur.controlLoader();

        const res = await createModel("v1", "FoodGroups", formPost);

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.created
        ) {
          cur.$store.dispatch("getFoodGroup");
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
     * Check if the FoodGroupCode is duplicated.
     * Author: VQPhong (19/07/2022)
     */
    isDuplicatedCode(currentCode) {
      for (const group of this.foodGroup) {
        if (currentCode === group.FoodGroupCode) {
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
  height: 193px;
  min-height: 193px;
  max-height: 193px;
  width: 475px;
  max-width: 475px;
  min-width: 475px;
}

.form-body .form-panel-container {
  padding: 8px;
  height: 111px;
}
</style>