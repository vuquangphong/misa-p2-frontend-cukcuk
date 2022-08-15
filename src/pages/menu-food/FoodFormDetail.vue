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
        <div class="x-form-panel-container">
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
              <div class="x-main-body-general" v-show="isGeneralTab">
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
                <div class="title-food">
                  <span class="label">Món ăn:&nbsp;</span>
                  <span class="food-name">{{ formInfo.FoodName }}</span>
                </div>

                <div class="addition-note">
                  Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ
                  chọn nhanh order.
                  <br />
                  VD: không cay/ít hành/thêm phomai...
                </div>

                <div class="grid-panel-container">
                  <div class="grid-panel">
                    <table>
                      <thead>
                        <tr>
                          <th class="left">Sở thích phục vụ</th>
                          <th
                            :class="{
                              rightFlow: currentFavorService.length >= 8,
                            }"
                          >
                            Thu thêm
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(data, index) in currentFavorService"
                          :key="index"
                          :class="{ even: index % 2 === 1 }"
                          @click="chooseFavorService(data)"
                        >
                          <BaseFavorServiceRow :index="index" />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="panel-button">
                  <button class="button" @click="addRowEvent">
                    <div class="add-row-btn">
                      <span class="icon"></span>
                      <span class="title">{{ btnAddRow }}</span>
                    </div>
                  </button>
                  <button
                    :class="{
                      button: true,
                      cannotDel: currentFavorService.length <= 0,
                    }"
                    @click="delRowEvent"
                  >
                    <div class="del-row-btn">
                      <span class="icon"></span>
                      <span class="title">{{ btnDelRow }}</span>
                    </div>
                  </button>
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

    <!-- DuplicatedMessage for Food -->
    <DuplicatedMessage
      :isAlert="isAlertDuplicatedCode"
      :currentCode="formInfo.FoodCode"
      :model="'món ăn'"
      :isCode="true"
      @closeMessage="isAlertDuplicatedCode = false"
    />

    <!-- DuplicatedMessage for FS -->
    <DuplicatedFavorService
      :isAlert="isAlertDuplicatedCode"
      :listFS="currentFSsDuplicated"
      :isNoContent="isNoContent"
      @closeMessage="
        isAlertDuplicatedCode = false;
        isNoContent = false;
      "
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
import DuplicatedFavorService from "./DuplicatedFavorService.vue";
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { mapActions, mapGetters } from "vuex";
import { enumCukcuk } from "@/utils/enumCukcuk";
import { reactive, toRefs } from "vue";
import { createMasterDetail } from "@/utils/call_apis/Post";
import { updateMasterDetailById } from "@/utils/call_apis/Put";
import { requireFoodFields } from "@/utils/constants";
import { getById, getCheckDuplicatedCode } from "@/utils/call_apis/Get";
import {
  filterFromMoney,
  filterToMoney,
  genCode_3,
  genCode_1,
  genCode_2,
  filterEmptyFavorService,
  listDuplicatedFS,
  isNoContentInFS,
} from "@/utils/commonFunc";
import AddGroupForm from "./AddGroupForm.vue";
import AddUnitForm from "./AddUnitForm.vue";
import AddPlaceForm from "./AddPlaceForm.vue";
import AlertChangedData from "./AlertChangedData.vue";
import BaseFavorServiceRow from "../../components/base/BaseFavorServiceRow.vue";

export default {
  components: {
    DuplicatedMessage,
    DuplicatedFavorService,
    AddGroupForm,
    AddUnitForm,
    AddPlaceForm,
    AlertChangedData,
    BaseFavorServiceRow,
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
      "currentFavorService",
      "isCurrentFavorChanging",
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
      btnAddRow: resourceCukcuk.VI.buttons.btnAddRow,
      btnDelRow: resourceCukcuk.VI.buttons.btnDelRow,
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
      currentFSsDuplicated: "",
      isNoContent: false,

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
        // Flag that current favor has not been changed in init state of Modification
        // ... hmmm actually this part has something wrong
        this.isCurrentFavorChanging = false;

        // Change mode action => PUT
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
    "formInfo.FoodPrice": function (newValue, oldValue) {
      if (newValue) {
        if (newValue.toString().length > 18) {
          this.formInfo.FoodPrice = filterFromMoney(oldValue);
        } else {
          this.formInfo.FoodPrice = filterFromMoney(newValue);
        }
      }
    },

    /**
     * Filter Money in Form Detail
     * Author: VQPhong (20/07/2022)
     */
    "formInfo.FoodInvest": function (newValue, oldValue) {
      if (newValue) {
        if (newValue.toString().length > 18) {
          this.formInfo.FoodInvest = filterFromMoney(oldValue);
        } else {
          this.formInfo.FoodInvest = filterFromMoney(newValue);
        }
      }
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
      handler: function () {
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
     * Event for adding a new row in FavorService
     * Author: VQPhong (25/07/2022)
     */
    addRowEvent() {
      let payload = this.currentFavorService;

      payload.push({
        Index: this.currentFavorService.length,
        FavorServiceID: 0,
        Content: "",
        Surcharge: 0,
        Selected: false,
      });

      if (payload.length === 1) {
        payload[0].Selected = true;
      }

      this.changeCurrentFavorService(payload);
    },

    /**
     * Event for removing a row in FavorService
     * Author: VQPhong (09/08/2022)
     */
    delRowEvent() {
      let payload = this.currentFavorService;

      payload = payload.filter((item) => !item.Selected);

      if (payload.length > 0) {
        payload[0].Selected = true;
      }

      this.changeCurrentFavorService(payload);
    },

    /**
     * Author: VQPhong (09/08/2022)
     * Event choosing a row of Favorite service
     */
    chooseFavorService({ Index, Selected }) {
      if (!Selected) {
        let checkBreak = 0;
        for (const item of this.currentFavorService) {
          if (item.Selected) {
            item.Selected = false;
            checkBreak++;
            if (checkBreak >= 2) break;
            else continue;
          }

          if (item.Index === Index) {
            item.Selected = true;
            checkBreak++;
            if (checkBreak >= 2) break;
            else continue;
          }
        }
      }
    },

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

      // For money
      if (field === "Price" || field === "Invest") {
        if (!this.formInfo[`Food${field}`]) {
          this.formInfo[`Food${field}`] = 0;
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
        this.isGeneralTab = true;
        this.emptyCurrentFavorService();
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

      // Get the (init) list of Favorite services remove all empty FS
      let tempFavorServices = filterEmptyFavorService(cur.currentFavorService);

      // Validate Compulsory fields
      requireFoodFields.forEach((field) => {
        if (
          !cur.formInfo[`Food${field}`] ||
          (field === "Price" && cur.formInfo.FoodPrice === "0")
        ) {
          cur[`isEmpty${field}`] = true;
          cur.alertInterrupt = true;
        }
      });

      if (cur.alertInterrupt) {
        cur.isGeneralTab = true;
        return;
      }

      // Check if FoodCode is duplicated
      if (cur.modeAction === enumCukcuk.modeAction.put) {
        if (cur.formInfo.FoodCode !== this.currentCodeForUpdate) {
          if (await cur.isDuplicatedCode(cur.formInfo.FoodCode)) {
            cur.alertInterrupt = true;
            cur.isAlertDuplicatedCode = true;
            cur.isGeneralTab = true;
            return;
          }
        }
      } else {
        if (await cur.isDuplicatedCode(cur.formInfo.FoodCode)) {
          cur.alertInterrupt = true;
          cur.isAlertDuplicatedCode = true;
          cur.isGeneralTab = true;
          return;
        }
      }

      // Validate list of FavorServices
      // 1. FavorService has a surcharge but no content
      if (isNoContentInFS(tempFavorServices)) {
        cur.isNoContent = true;
        cur.alertInterrupt = true;
        cur.isAlertDuplicatedCode = true;
        return;
      }

      // 2. Duplicated FavorServices
      let listOfDuplicatedFS = listDuplicatedFS(tempFavorServices);
      if (listOfDuplicatedFS.length > 0) {
        cur.currentFSsDuplicated = listOfDuplicatedFS
          .map((i) => i.Content + " - " + i.Surcharge)
          .join(", ");
        cur.alertInterrupt = true;
        cur.isAlertDuplicatedCode = true;
        return;
      }

      // Everything is Okay
      try {
        cur.controlLoader();

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
          FavorServices: tempFavorServices,
        };

        if (cur.modeAction === enumCukcuk.modeAction.post) {
          const res = await createMasterDetail(
            "v1",
            "Foods",
            "FavorServices",
            formPost
          );

          if (
            res.data.customStatusCode === enumCukcuk.customizeStatusCode.created
          ) {
            // Reload List of menu food
            cur.$emit("reloadForAdd", null);

            // Remove the interruptions
            cur.alertInterrupt = false;
          }
        } else {
          const res = await updateMasterDetailById(
            "v1",
            "Foods",
            "FavorServices",
            formPost,
            cur.currentFood.FoodID
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
        Object.keys(cur.formInfo).forEach(async (key) => {
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
            // If FoodName is just one word
            if (this.formInfo.FoodName.trim().split(" ").length <= 1) {
              this.formInfo.FoodCode = genCode_3(this.formInfo.FoodName);
            } else {
              // Auto Generate code from name when Replica
              // Call API check duplicate code and then auto generate code
              if (
                !(await this.isDuplicatedCode(
                  genCode_1(this.formInfo.FoodName)
                ))
              ) {
                this.formInfo.FoodCode = genCode_1(this.formInfo.FoodName);
              } else if (
                !(await this.isDuplicatedCode(
                  genCode_2(this.formInfo.FoodName)
                ))
              ) {
                this.formInfo.FoodCode = genCode_2(this.formInfo.FoodName);
              } else {
                this.formInfo.FoodCode = genCode_3(this.formInfo.FoodName);
              }
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
        const res = await getCheckDuplicatedCode("v1", "Foods", currentCode);
        return res.data.responseData;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    /**
     * Auto binding Code only when Add New Food
     * Author: VQPhong (21/07/2022)
     */
    async blurInputName() {
      if (
        this.modeAction === enumCukcuk.modeAction.post &&
        !this.isReplication
      ) {
        // If FoodName is just one word
        if (this.formInfo.FoodName.trim().split(" ").length <= 1) {
          this.formInfo.FoodCode = genCode_3(this.formInfo.FoodName);
          return;
        }

        // Call API check duplicate code and then auto generate code
        if (!(await this.isDuplicatedCode(genCode_1(this.formInfo.FoodName)))) {
          this.formInfo.FoodCode = genCode_1(this.formInfo.FoodName);
        } else if (
          !(await this.isDuplicatedCode(genCode_2(this.formInfo.FoodName)))
        ) {
          this.formInfo.FoodCode = genCode_2(this.formInfo.FoodName);
        } else {
          this.formInfo.FoodCode = genCode_3(this.formInfo.FoodName);
        }
      }
    },

    /**
     * Author: VQPhong (08/08/2022)
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
      "emptyCurrentFavorService",
      "changeCurrentFavorService",
    ]),
  },
};
</script>

<style scoped>
@import url('../../styles/food-detail-form.css');
</style>