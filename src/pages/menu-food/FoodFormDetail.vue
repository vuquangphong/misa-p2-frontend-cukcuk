<template>
  <div class="form-detail-container" v-show="isOpenFormDetail">
    <div class="form-detail">
      <div class="form-header">
        <div class="form-header-inside">
          <div class="form-title">
            {{ isModify ? formTitleUpdate : formTitleAdd }}
          </div>
          <div class="form-close-btn">
            <div class="close-icon" @click="eventCloseXButton"></div>
          </div>
        </div>
      </div>

      <div class="form-body">
        <div class="form-panel-container">
          <div class="form-panel">
            <div class="tab-bar">
              <div
                :class="{ generalTab: true, selected: isGeneralTab }"
                @click="isGeneralTab = true"
              >
                <div class="title-tab">{{ generalTab }}</div>
              </div>

              <div
                :class="{ favorServiceTab: true, selected: !isGeneralTab }"
                @click="isGeneralTab = false"
              >
                <div class="title-tab">{{ favorServiceTab }}</div>
              </div>
            </div>

            <div class="main-body-container">
              <div class="main-body-general" v-show="isGeneralTab">
                <div class="list-input-container">
                  <div class="list-input">
                    <div class="x-field food-name">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodName }}</span>
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
                              v-model="formInfo.FoodName"
                              @focusin="focusinEvent('Name', true)"
                              @focusout="
                                focusoutEvent('Name', true);
                                blurInputName();
                              "
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

                    <div class="x-field food-code">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodCode }}</span>
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
                              v-model="formInfo.FoodCode"
                              @focusin="focusinEvent('Code', true)"
                              @focusout="focusoutEvent('Code', true)"
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

                    <div class="x-field food-group">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodGroup }}</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="combo-container">
                          <div
                            :class="{
                              comboLabel: true,
                              focus: isFocusGroup,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.FoodGroup.Name"
                              @focusin="focusinEvent('Group', false)"
                              @blur="focusoutComboEvent('Group')"
                              @keypress="eventEnterPress('Group')"
                              ref="inputGroup"
                            />

                            <div
                              class="drop-down"
                              @click="eventDropDown('Group')"
                            ></div>

                            <div
                              class="add-trigger"
                              @click="eventAddTrigger('Group')"
                            ></div>
                          </div>

                          <div class="shadowOption" v-if="isOptionGroup"></div>

                          <div
                            class="expandOption"
                            v-if="isOptionGroup"
                            v-click-outside="eventBlurGroup"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in foodGroup"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Group')"
                                >
                                  {{ option.FoodGroupName }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="expandOption filter"
                            v-if="!isOptionGroup && tempFoodGroup.length > 0"
                            v-click-outside="eventBlurFilterGroup"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in tempFoodGroup"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Group')"
                                >
                                  {{ option.FoodGroupName }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field food-unit">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodUnit }}</span>
                          <span class="required">&nbsp;(*)</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="combo-container">
                          <div
                            :class="{
                              comboLabel: true,
                              focus: isFocusUnitID,
                              alert: isEmptyUnitID,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.FoodUnit.Name"
                              @focusin="focusinEvent('UnitID', true)"
                              @blur="focusoutComboEvent('Unit')"
                              @keypress="eventEnterPress('Unit')"
                              ref="inputUnit"
                            />

                            <div
                              class="drop-down"
                              @click="eventDropDown('Unit')"
                            ></div>

                            <div
                              class="add-trigger"
                              @click="eventAddTrigger('Unit')"
                            ></div>
                          </div>

                          <div
                            class="required-alert"
                            v-if="isEmptyUnitID"
                            @mouseover="isShowAlertUnitID = true"
                            @mouseleave="isShowAlertUnitID = false"
                          >
                            <div class="alert-icon"></div>
                            <div class="alert-hover" v-show="isShowAlertUnitID">
                              <div class="alert-hover-inside">
                                <div class="icon"></div>
                                <div class="message">{{ alertRequired }}</div>
                              </div>
                            </div>
                          </div>

                          <div class="shadowOption" v-if="isOptionUnit"></div>

                          <div
                            class="expandOption"
                            v-if="isOptionUnit"
                            v-click-outside="eventBlurUnit"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in foodUnit"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Unit')"
                                >
                                  {{ option.FoodUnitName }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="expandOption filter"
                            v-if="!isOptionUnit && tempFoodUnit.length > 0"
                            v-click-outside="eventBlurFilterUnit"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in tempFoodUnit"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Unit')"
                                >
                                  {{ option.FoodUnitName }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field food-price">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodPrice }}</span>
                          <span class="required">&nbsp;(*)</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-container">
                          <div
                            :class="{
                              inputLabel: true,
                              focus: isFocusPrice,
                              alert: isEmptyPrice,
                            }"
                          >
                            <input
                              type="text"
                              class="number"
                              v-model="formInfo.FoodPrice"
                              @focusin="focusinEvent('Price', true)"
                              @focusout="focusoutEvent('Price', true)"
                            />
                          </div>

                          <div
                            class="required-alert"
                            v-if="isEmptyPrice"
                            @mouseover="isShowAlertPrice = true"
                            @mouseleave="isShowAlertPrice = false"
                          >
                            <div class="alert-icon"></div>
                            <div class="alert-hover" v-show="isShowAlertPrice">
                              <div class="alert-hover-inside">
                                <div class="icon"></div>
                                <div class="message">{{ alertRequired }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field food-invest">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodInvest }}</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-container">
                          <div
                            :class="{
                              inputLabel: true,
                              focus: isFocusInvest,
                            }"
                          >
                            <input
                              class="number"
                              type="text"
                              v-model="formInfo.FoodInvest"
                              @focusin="focusinEvent('Invest', false)"
                              @focusout="focusoutEvent('Invest', false)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field description">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.description }}</span>
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

                    <div class="x-field food-place" style="padding-top: 2.5px">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span>{{ labels.foodPlace }}</span>
                        </div>
                      </div>
                      <div class="input">
                        <div class="combo-container">
                          <div
                            :class="{
                              comboLabel: true,
                              focus: isFocusPlace,
                            }"
                          >
                            <input
                              type="text"
                              v-model="formInfo.FoodPlace.Name"
                              @focusin="focusinEvent('Place', false)"
                              @blur="focusoutComboEvent('Place')"
                              @keypress="eventEnterPress('Place')"
                              ref="inputPlace"
                            />

                            <div
                              class="drop-down"
                              @click="eventDropDown('Place')"
                            ></div>

                            <div
                              class="add-trigger"
                              @click="eventAddTrigger('Place')"
                            ></div>
                          </div>

                          <div
                            class="expandOption foodPlace"
                            v-if="isOptionPlace"
                            v-click-outside="eventBlurPlace"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in foodPlace"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Place')"
                                >
                                  {{ option.FoodPlaceName }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="expandOption filter foodPlace"
                            v-if="!isOptionPlace && tempFoodPlace.length > 0"
                            v-click-outside="eventBlurFilterPlace"
                          >
                            <div class="option-container">
                              <div
                                v-for="(option, index) in tempFoodPlace"
                                :key="index"
                              >
                                <div
                                  class="option"
                                  @click="chooseOptionCombo(option, 'Place')"
                                >
                                  {{ option.FoodPlaceName }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="x-field appear-on-menu">
                      <div class="label-input">
                        <div class="label-input-inside">
                          <span></span>
                        </div>
                      </div>
                      <div class="input">
                        <input
                          type="button"
                          :class="{
                            checkbox: true,
                            notAppear: formInfo.Appear >= 1,
                          }"
                          id="MISACheckboxFormDetail"
                          @click="eventNotAppear"
                        />
                        <label for="MISACheckboxFormDetail">
                          {{ notAppearOnMenu }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="avatar-container">
                  <fieldset>
                    <div class="fieldset-header">
                      <div class="title">{{ avatar }}</div>
                    </div>

                    <div class="fieldset-body">
                      <div class="panel-default">
                        <div class="theme">
                          <img
                            src="https://misatest06.cukcuk.vn/Handler/ImageHandler.ashx?FileType=1&IsTemp=True&W=160&H=120&IsFit=true"
                            alt=""
                          />
                        </div>
                        <div class="guide">
                          <div>{{ guideAvatar1 }}</div>
                          <div>{{ guideAvatar2 }}</div>
                        </div>
                        <div class="select-icon">
                          <div class="select-icon-inside" @click="noFunction">
                            <div class="content">
                              <div class="icon"></div>
                              <div class="title">{{ symbol }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="panel-extend">
                        <div class="select-img">
                          <div class="inside" @click="noFunction">
                            <div>...</div>
                          </div>
                        </div>

                        <div class="remove-img">
                          <div class="inside" @click="noFunction">
                            <div>
                              <img src="../../assets/imgs/x-sign.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="main-body-favor-service" v-show="!isGeneralTab">
                Tính năng đang phát triển!
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
              <button class="button" @click="eventStoreAndAddBtn">
                <div class="store-add-btn">
                  <span class="icon"></span>
                  <span class="title">{{ btnStoreAndAdd }}</span>
                </div>
              </button>
              <button class="button" @click="closeFormDetail">
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
      :currentCode="formInfo.FoodCode"
      :model="'món ăn'"
      :isCode="true"
      @closeMessage="isAlertDuplicatedCode = false"
    />

    <AlertChangedData
      :isOpen="isChangedDataOpen"
      @yesChangedData="
        eventStoreBtn();
        isChangedDataOpen = false;
      "
      @noChangedData="noChangedDataFunc"
      @cancelChangedData="isChangedDataOpen = false"
    />

    <AddGroupForm
      :isOpenExtraForm="isGroupFormOpen"
      @closeExtraForm="isGroupFormOpen = false"
    />

    <AddUnitForm
      :isOpenExtraForm="isUnitFormOpen"
      @closeExtraForm="isUnitFormOpen = false"
    />

    <AddPlaceForm
      :isOpenExtraForm="isPlaceFormOpen"
      @closeExtraForm="isPlaceFormOpen = false"
    />
  </div>
</template>

<script>
import DuplicatedMessage from "./DuplicatedMessage.vue";
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { mapActions, mapGetters } from "vuex";
import { enumCukcuk } from "@/utils/enumCukcuk";
import { reactive, toRefs } from "vue";
import { createModel } from "@/utils/call_apis/Post";
import { updateModelById } from "@/utils/call_apis/Put";
import { requireFoodFields } from "@/utils/constants";
import { getAll, getById } from "@/utils/call_apis/Get";
import {
  genCodeFromName,
  filterFromMoney,
  filterToMoney,
} from "@/utils/commonFunc";
import AddGroupForm from "./AddGroupForm.vue";
import AddUnitForm from "./AddUnitForm.vue";
import AddPlaceForm from "./AddPlaceForm.vue";
import AlertChangedData from "./AlertChangedData.vue";

export default {
  components: {
    DuplicatedMessage,
    AddGroupForm,
    AddUnitForm,
    AddPlaceForm,
    AlertChangedData,
  },

  setup() {
    const state = reactive({
      formInfo: {
        FoodName: "",
        FoodCode: "",
        FoodGroup: {
          Name: "",
          ID: "",
        },
        FoodUnit: {
          Name: "",
          ID: "",
        },
        FoodPrice: "0",
        FoodInvest: "0",
        Description: "",
        FoodPlace: {
          Name: "",
          ID: "",
        },
        Appear: enumCukcuk.appearOnMenu.appear,
      },
    });

    return { ...toRefs(state) };
  },

  computed: {
    ...mapGetters([
      "isOpenFormDetail",
      "foodGroup",
      "foodUnit",
      "foodPlace",
      "pageIndex",
      "currentFood",
      "isReplication",
      "isBinding",
      "isModify",
    ]),
  },

  data() {
    return {
      alertRequired: resourceCukcuk.VI.message.alertRequired,
      formTitleAdd: resourceCukcuk.VI.formLabels.titleFormAdd,
      formTitleUpdate: resourceCukcuk.VI.formLabels.titleFormUpdate,
      isGeneralTab: true,
      generalTab: resourceCukcuk.VI.formLabels.generalTab,
      favorServiceTab: resourceCukcuk.VI.formLabels.favorServiceTab,
      labels: resourceCukcuk.VI.tableHeader,
      btnHelp: resourceCukcuk.VI.buttons.btnHelp,
      btnStore: resourceCukcuk.VI.buttons.btnStore,
      btnStoreAndAdd: resourceCukcuk.VI.buttons.btnStoreAndAdd,
      btnCancel: resourceCukcuk.VI.buttons.btnCancel,
      avatar: resourceCukcuk.VI.tableHeader.avatar,
      msgNoFunction: resourceCukcuk.VI.message.noFunction,
      guideAvatar1: resourceCukcuk.VI.tableHeader.guideChooseAvatar1,
      guideAvatar2: resourceCukcuk.VI.tableHeader.guideChooseAvatar2,
      symbol: resourceCukcuk.VI.tableHeader.symbol,
      alertErrorMsg: resourceCukcuk.VI.message.generalErrMsg,
      modeAction: enumCukcuk.modeAction.post,
      notAppearOnMenu: resourceCukcuk.VI.formLabels.notAppearOnMenu,

      alertInterrupt: false,
      currentCodeForUpdate: "",
      isAlertDuplicatedCode: false,

      isEmptyName: false,
      isEmptyCode: false,
      isEmptyUnitID: false,
      isEmptyPrice: false,

      isFocusName: false,
      isFocusCode: false,
      isFocusPrice: false,
      isFocusInvest: false,
      isFocusDescription: false,
      isFocusGroup: false,
      isFocusUnitID: false,
      isFocusPlace: false,

      isShowAlertName: false,
      isShowAlertCode: false,
      isShowAlertPrice: false,
      isShowAlertUnitID: false,

      isOptionGroup: false,
      isOptionUnit: false,
      isOptionPlace: false,

      tempAutoCode: "",
      timeoutFoodName: null,
      timeoutOpenForm: null,

      isClickDropdownGroup: false,
      isClickDropdownUnit: false,
      isClickDropdownPlace: false,

      isChoseGroup: false,
      isChoseUnit: false,
      isChosePlace: false,

      isGroupFormOpen: false,
      isUnitFormOpen: false,
      isPlaceFormOpen: false,

      tempFoodGroup: [],
      tempFoodUnit: [],
      tempFoodPlace: [],

      isBindingLocalGroup: false,
      isBindingLocalUnit: false,
      isBindingLocalPlace: false,

      isChangedDataOpen: false,
      isChangedData: false,
      isClearOrBinding: false,
    };
  },

  watch: {
    /**
     * Alter some states when Form Detail close/open
     * Author: VQPhong (19/07/2022)
     */
    isOpenFormDetail: function (value) {
      const cur = this;

      if (!value) {
        cur.clearForm();
        cur.isGeneralTab = true;
        cur.stopReplication();
        cur.stopModify();
      }

      clearTimeout(cur.timeoutOpenForm);

      cur.timeoutOpenForm = setTimeout(() => {
        cur.$refs.firstInput.focus();
      }, 100);

      requireFoodFields.forEach((field) => {
        this[`isEmpty${field}`] = false;
      });
    },

    /**
     * isBinding is changing <=> start bindingFoodInfo()
     * Author: VQPhong (20/07/2022)
     */
    isBinding: function () {
      this.bindingFoodInfo(this.currentFood.FoodID);
    },

    /**
     * Watch isReplica
     * If true => change mode action to post
     * Author: VQPhong (20/07/2022)
     */
    isReplication: function (value) {
      if (value) {
        this.modeAction = enumCukcuk.modeAction.post;
      }
    },

    /**
     * Watch isModify
     * If true => change mode action to put
     * Author: VQPhong (20/07/2022)
     */
    isModify: function (value) {
      if (value) {
        this.modeAction = enumCukcuk.modeAction.put;
      }
    },

    /**
     * Alter some states when Current Food being changed
     * Author: PhongVQ (11/02/2022)
     */
    currentFood: async function (value) {
      if (!value) {
        this.clearForm();
        this.modeAction = enumCukcuk.modeAction.post;
      } else {
        this.currentCodeForUpdate = this.currentFood.FoodCode;
      }
    },

    /**
     * Filter Money in Form Detail
     * Author: VQPhong (20/07/2022)
     */
    "formInfo.FoodPrice": function (val) {
      this.formInfo.FoodPrice = filterFromMoney(val);
    },

    /**
     * Filter Money in Form Detail
     * Author: VQPhong (20/07/2022)
     */
    "formInfo.FoodInvest": function (val) {
      this.formInfo.FoodInvest = filterFromMoney(val);
    },

    /**
     * Auto Generate FoodCode from FoodName
     * Author: VQPhong (21/07/2022)
     */
    "formInfo.FoodName": function (val) {
      const cur = this;

      clearTimeout(cur.timeoutFoodName);

      cur.timeoutFoodName = setTimeout(() => {
        cur.tempAutoCode = genCodeFromName(val);
      }, 100);
    },

    /**
     * Filter FoodGroup combobox
     * Author: VQPhong (22/07/2022)
     */
    "formInfo.FoodGroup.Name": function (val) {
      if (!val) {
        this.tempFoodGroup = [];
      } else {
        if (this.isBindingLocalGroup) {
          this.isBindingLocalGroup = false;
        } else {
          if (this.isChoseGroup) {
            this.isChoseGroup = false;
          } else {
            let tempVal = val.toLowerCase();
            let tempFilter = this.foodGroup.filter((group) =>
              group.FoodGroupName.toLowerCase().includes(tempVal)
            );
            this.tempFoodGroup = tempFilter;
          }
        }
      }
    },

    /**
     * Filter FoodGroup combobox
     * Author: VQPhong (22/07/2022)
     */
    "formInfo.FoodUnit.Name": function (val) {
      if (!val) {
        this.tempFoodUnit = [];
      } else {
        if (this.isBindingLocalUnit) {
          this.isBindingLocalUnit = false;
        } else {
          if (this.isChoseUnit) {
            this.isChoseUnit = false;
          } else {
            let tempVal = val.toLowerCase();
            let tempFilter = this.foodUnit.filter((unit) =>
              unit.FoodUnitName.toLowerCase().includes(tempVal)
            );
            this.tempFoodUnit = tempFilter;
          }
        }
      }
    },

    /**
     * Filter FoodGroup combobox
     * Author: VQPhong (22/07/2022)
     */
    "formInfo.FoodPlace.Name": function (val) {
      if (!val) {
        this.tempFoodPlace = [];
      } else {
        if (this.isBindingLocalPlace) {
          this.isBindingLocalPlace = false;
        } else {
          if (this.isChosePlace) {
            this.isChosePlace = false;
          } else {
            let tempVal = val.toLowerCase();
            let tempFilter = this.foodPlace.filter((place) =>
              place.FoodPlaceName.toLowerCase().includes(tempVal)
            );
            this.tempFoodPlace = tempFilter;
            console.log(this.tempFoodPlace);
          }
        }
      }
    },

    /**
     * Watch whether data is being changed
     * Author: VQPhong (23/07/2022)
     */
    formInfo: {
      handler: function() {
        if (this.isClearOrBinding) {
          this.isChangedData = false;
          this.isClearOrBinding = false;
        } else {
          this.isChangedData = true;
        }
      },
      deep: true,
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
        if (!this.formInfo[`Food${field}`]) {
          this[`isEmpty${field}`] = true;
        }
      }
    },

    /**
     * Event blur combobox
     * Author: VQPhong (22/07/2022)
     */
    focusoutComboEvent(field) {
      if (field === "Unit") {
        this.isFocusUnitID = false;
      } else {
        this[`isFocus${field}`] = false;
      }

      let temp = this[`food${field}`].filter(
        (item) =>
          item[`Food${field}Name`] === this.formInfo[`Food${field}`].Name
      );

      if (temp.length === 0 || !this.formInfo[`Food${field}`].ID) {
        this.formInfo[`Food${field}`].Name = "";
        this.formInfo[`Food${field}`].ID = "";
      }

      this[`tempFood${field}`] = [];
    },

    /**
     * Event when press Enter key in combobox
     * Author: VQPhong (22/07/2022)
     */
    eventEnterPress(field) {
      if (event.keyCode === 13) {
        if (this[`tempFood${field}`].length > 0) {
          this.formInfo[`Food${field}`].Name =
            this[`tempFood${field}`][0][`Food${field}Name`];
          this.formInfo[`Food${field}`].ID =
            this[`tempFood${field}`][0][`Food${field}ID`];

          this[`isChose${field}`] = true;
          this[`tempFood${field}`] = [];
        }
      }
    },

    /**
     * Event click drop down btn in combobox
     * Author: VQPhong (19/07/2022)
     */
    eventDropDown(field) {
      this.$refs[`input${field}`].focus();
      this[`isOption${field}`] = !this[`isOption${field}`];
      this[`isClickDropdown${field}`] = true;
    },

    /**
     * Event choose 1 option of combobox
     * Author: VQPhong (19/07/2022)
     */
    chooseOptionCombo(option, field) {
      console.log("choosing...");
      this[`isChose${field}`] = true;
      this[`isOption${field}`] = false;
      this[`tempFood${field}`] = [];
      this.formInfo[`Food${field}`].Name = option[`Food${field}Name`];
      this.formInfo[`Food${field}`].ID = option[`Food${field}ID`];
    },

    /**
     * Event store button
     * Author: VQPhong (18/07/2022)
     */
    async eventStoreBtn() {
      await this.addNewOrUpdateFood();
      if (!this.alertInterrupt) {
        this.closeFormDetail();
      }
    },

    /**
     * Event store and add button
     * Author: VQPhong (18/07/2022)
     */
    async eventStoreAndAddBtn() {
      await this.addNewOrUpdateFood();
      if (!this.alertInterrupt) {
        this.modeAction = enumCukcuk.modeAction.post;
        this.clearForm();
        this.stopModify();
        this.$refs.firstInput.focus();
      }
    },

    /**
     * Add a new Food / Update current Food
     * Author: PhongVQ (18/07/2022)
     */
    async addNewOrUpdateFood() {
      const cur = this;

      cur.alertInterrupt = false;

      let formPost = {
        FoodName: cur.formInfo.FoodName,
        FoodCode: cur.formInfo.FoodCode,
        FoodGroupID: cur.formInfo.FoodGroup.ID,
        FoodUnitID: cur.formInfo.FoodUnit.ID,
        FoodPrice: filterToMoney(cur.formInfo.FoodPrice),
        FoodInvest: filterToMoney(cur.formInfo.FoodInvest),
        Description: cur.formInfo.Description,
        FoodPlaceID: cur.formInfo.FoodPlace.ID,
        Appear: cur.formInfo.Appear,
      };

      // Validate Compulsory fields
      requireFoodFields.forEach((field) => {
        if (!formPost[`Food${field}`]) {
          cur[`isEmpty${field}`] = true;
          cur.alertInterrupt = true;
        }
      });

      if (cur.alertInterrupt) return;

      // Check if FoodCode is duplicated
      if (cur.modeAction === enumCukcuk.modeAction.put) {
        if (formPost.FoodCode !== this.currentCodeForUpdate) {
          if (await cur.isDuplicatedCode(formPost.FoodCode)) {
            cur.alertInterrupt = true;
            cur.isAlertDuplicatedCode = true;
            return;
          }
        }
      } else {
        if (await cur.isDuplicatedCode(formPost.FoodCode)) {
          cur.alertInterrupt = true;
          cur.isAlertDuplicatedCode = true;
          return;
        }
      }

      // Everything is Okay
      try {
        cur.controlLoader();

        if (cur.modeAction === enumCukcuk.modeAction.post) {
          const res = await createModel("v1", "Foods", formPost);

          if (
            res.data.customStatusCode === enumCukcuk.customizeStatusCode.created
          ) {
            // Reload List of menu food
            cur.$emit("reloadForAdd", null);

            // Remove the interruptions
            cur.alertInterrupt = false;
          }
        } else {
          const res = await updateModelById(
            "v1",
            "Foods",
            cur.currentFood.FoodID,
            formPost
          );

          if (
            res.data.customStatusCode === enumCukcuk.customizeStatusCode.updated
          ) {
            // Reload List of menu food
            cur.$emit("reloadForUpdate", null);

            // Remove the interruptions
            cur.alertInterrupt = false;
          }
        }

        cur.controlLoader();
      } catch (err) {
        cur.controlLoader();
        alert(cur.alertErrorMsg);
        console.log(err);
      }
    },

    /**
     * Clear all field from form detail
     * Author: VQPhong (18/07/2022)
     */
    clearForm() {
      const cur = this;

      Object.keys(cur.formInfo).forEach((key) => {
        if (key === "FoodPrice" || key === "FoodInvest") {
          this.formInfo[key] = "0";
        } else if (key === "Appear") {
          this.formInfo[key] = enumCukcuk.appearOnMenu.appear;
        } else if (
          key === "FoodGroup" ||
          key === "FoodUnit" ||
          key === "FoodPlace"
        ) {
          this.formInfo[key].Name = "";
          this.formInfo[key].ID = "";
        } else {
          this.formInfo[key] = "";
        }
      });

      this.isClearOrBinding = true;
    },

    /**
     * Get a food's info using FoodID,
     * Binding received data into the form.
     * Author: VQPhong (19/07/2022)
     */
    async bindingFoodInfo(id) {
      const cur = this;

      try {
        const res = await getById("v1", "Foods", id);

        // Binding
        Object.keys(cur.formInfo).forEach((key) => {
          if (
            key === "FoodGroup" ||
            key === "FoodUnit" ||
            key === "FoodPlace"
          ) {
            cur.formInfo[key].Name = res.data.responseData[`${key}Name`];
            cur.formInfo[key].ID = res.data.responseData[`${key}ID`];
          } else if (key === "FoodInvest") {
            !res.data.responseData[key]
              ? (cur.formInfo[key] = 0)
              : (cur.formInfo[key] = res.data.responseData[key]);
          } else if (key === "FoodCode" && cur.isReplication) {
            const wholeAutoCode = genCodeFromName(
              res.data.responseData.FoodName,
              true
            );
            const autoCode = genCodeFromName(
              res.data.responseData.FoodName,
              false
            );

            if (
              res.data.responseData[key] !== wholeAutoCode &&
              res.data.responseData[key] !== autoCode
            ) {
              cur.formInfo[key] = autoCode;
            } else {
              res.data.responseData[key] === autoCode
                ? (cur.formInfo[key] = wholeAutoCode)
                : (cur.formInfo[key] = autoCode);
            }
          } else {
            cur.formInfo[key] = res.data.responseData[key];
          }
        });

        this.isBindingLocalGroup = true;
        this.isBindingLocalUnit = true;
        this.isBindingLocalPlace = true;

        this.isClearOrBinding = true;
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Check if the FoodCode is duplicated.
     * Author: VQPhong (19/07/2022)
     */
    async isDuplicatedCode(currentCode) {
      try {
        const res = await getAll("v1", "Foods");

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.getOkay
        ) {
          for (const food of res.data.responseData) {
            if (food.FoodCode === currentCode) {
              return true;
            }
          }
        }

        return false;
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Auto binding Code only when Add New Food
     * Author: VQPhong (21/07/2022)
     */
    blurInputName() {
      if (
        this.modeAction === enumCukcuk.modeAction.post &&
        !this.isReplication
      ) {
        this.formInfo.FoodCode = this.tempAutoCode;
      }
    },

    /**
     * Event check box
     */
    eventNotAppear() {
      if (this.formInfo.Appear) {
        this.formInfo.Appear = enumCukcuk.appearOnMenu.appear;
      } else {
        this.formInfo.Appear = enumCukcuk.appearOnMenu.notAppear;
      }
    },

    /**
     * Event blur to hide group options
     * Author: VQPhong (21/07/2022)
     */
    eventBlurGroup() {
      if (this.isClickDropdownGroup) {
        this.isClickDropdownGroup = false;
      } else {
        this.isOptionGroup = false;
      }
    },

    /**
     * Event blur to hide filter group options
     * Author: VQPhong (22/07/2022)
     */
    eventBlurFilterGroup() {
      if (!this.isFocusGroup) {
        let temp = this.tempFoodGroup.filter(
          (group) => group.FoodGroupName === this.formInfo.FoodGroup.Name
        );

        if (temp.length === 0 || !this.formInfo.FoodGroup.ID) {
          this.formInfo.FoodGroup.Name = "";
          this.formInfo.FoodGroup.ID = "";
        }

        this.tempFoodGroup = [];
      }
    },

    /**
     * Event blur to hide group options
     * Author: VQPhong (21/07/2022)
     */
    eventBlurUnit() {
      if (this.isClickDropdownUnit) {
        this.isClickDropdownUnit = false;
      } else {
        this.isOptionUnit = false;
      }
    },

    /**
     * Event blur to hide filter unit options
     * Author: VQPhong (22/07/2022)
     */
    eventBlurFilterUnit() {
      if (!this.isFocusUnitID) {
        let temp = this.tempFoodUnit.filter(
          (unit) => unit.FoodUnitName === this.formInfo.FoodUnit.Name
        );

        if (temp.length === 0 || !this.formInfo.FoodUnit.ID) {
          this.formInfo.FoodUnit.Name = "";
          this.formInfo.FoodUnit.ID = "";
        }

        this.tempFoodUnit = [];
      }
    },

    /**
     * Event blur to hide group options
     * Author: VQPhong (21/07/2022)
     */
    eventBlurPlace() {
      if (this.isClickDropdownPlace) {
        this.isClickDropdownPlace = false;
      } else {
        this.isOptionPlace = false;
      }
    },

    /**
     * Event blur to hide filter place options
     * Author: VQPhong (22/07/2022)
     */
    eventBlurFilterPlace() {
      if (!this.isFocusPlace) {
        let temp = this.tempFoodPlace.filter(
          (place) => place.FoodPlaceName === this.formInfo.FoodPlace.Name
        );

        if (temp.length === 0 || !this.formInfo.FoodPlace.ID) {
          this.formInfo.FoodPlace.Name = "";
          this.formInfo.FoodPlace.ID = "";
        }

        this.tempFoodPlace = [];
      }
    },

    /**
     * Open Form add Group, Unit, Place
     * Author: VQPhong (22/07/2022)
     */
    eventAddTrigger(field) {
      this[`is${field}FormOpen`] = true;
    },

    /**
     * Close the Dialog alerts that data of employee has changed.
     * Author: VQPhong (23/07/2022)
     */
    noChangedDataFunc() {
      this.closeFormDetail();
      this.isChangedDataOpen = false;
    },

    /**
     * Event close form detail with button X
     * Author: VQPhong (23/07/2022)
     */
    eventCloseXButton() {
      if (this.isChangedData) {
        this.isChangedDataOpen = true;
      } else {
        this.closeFormDetail();
      }
    },

    ...mapActions([
      "closeFormDetail",
      "controlLoader",
      "changePageIndex",
      "stopReplication",
      "changeCurrentFood",
      "stopModify",
    ]),
  },
};
</script>

<style scoped>
.form-detail-container {
  z-index: 11;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.4);
}

.form-detail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 545px;
  min-height: 545px;
  max-height: 545px;
  width: 740px;
  max-width: 740px;
  min-width: 740px;
  background-color: #fff;
  border: 5px solid #0072bc;
}

input.number {
  text-align: right;
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
  height: 463px;
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
  padding-top: 4px;
  height: 100%;
}

.main-body-general {
  display: flex;
  padding-top: 12px;
}

.list-input-container {
  padding-right: 8px;
  width: 506px;
}

.x-field {
  height: 24px;
  margin-bottom: 5px;
  display: flex;
}

.x-field .label-input {
  font-size: 13px;
  width: 125px;
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

.food-invest .input,
.food-price .input {
  max-width: 115px;
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

/* .left-buttons {
  
} */

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

.store-add-btn {
  width: 123px;
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

.store-add-btn .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/SaveAdd16.png");
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

.combo-container {
  display: flex;
  position: relative;
}

.expandOption {
  z-index: 1111;
  position: absolute;
  top: 24px;
  left: 0;
  width: calc(100% - 2px);
  height: 300px;
  max-height: 300px;
  border-width: 1px;
  border-style: solid;
  border-color: #e1e1e1;
  background: #fff;
  color: #000;
  font-size: 13px;
}

.expandOption.foodPlace {
  height: auto;
  max-height: 150px;
  overflow: auto;
}

.expandOption.filter {
  height: auto;
  max-height: 300px;
  overflow: auto;
}

.expandOption.filter.foodPlace {
  height: auto;
  max-height: 150px;
  overflow: auto;
}

.shadowOption {
  box-shadow: rgb(136 136 136) 0px 0px 6px;
  top: 28px;
  height: 297px;
  width: 100%;
  z-index: 1111;
  position: absolute;
  left: 0;
  border-color: transparent;
}

.option-container {
  height: 100%;
  overflow: auto;
}

.expandOption.foodPlace .option-container {
  height: auto;
}

.expandOption .option {
  line-height: 22px;
  padding: 0 6px;
  border: 1px dotted transparent;
  cursor: pointer;
}

.expandOption .option:hover {
  background-color: #d6e8f6;
  border-color: #d6e8f6;
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

.comboLabel.focus {
  border-color: #0071c1;
}

.comboLabel.alert {
  border-color: red;
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

.appear-on-menu .input {
  display: flex;
  align-items: center;
}

.x-field .input input.checkbox {
  background: url("https://cdn2.cukcuk.vn/QLNH/resources/images/form/checkbox.png")
    no-repeat;
  width: 15px;
  height: 15px;
  outline: none;
  border: none;
}

.x-field .input input.checkbox:focus,
.x-field .input input.checkbox:focus-visible {
  background-position: -15px 0px;
}

.x-field .input input.checkbox.notAppear {
  background-position: 0 -15px;
}

.x-field .input input.checkbox.notAppear:focus {
  background-position: -15px -15px;
}

.x-field .input label {
  padding-left: 5px;
  color: #000;
  font-size: 13px;
  font-weight: normal;
}
</style>