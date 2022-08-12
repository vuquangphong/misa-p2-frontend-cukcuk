<template>
  <div class="alert-delete-container" v-show="isAlertDeleteOpen">
    <div class="alert-delete">
      <div class="header">
        <div class="title">{{ title }}</div>
      </div>

      <div class="body">
        <div class="body-inside">
          <div class="icon"></div>
          <div class="content">
            Bạn có chắc chắn muốn xóa món
            <span
              >&lt;&lt;{{ currentFood.FoodCode }} -
              {{ currentFood.FoodName }}&gt;&gt;</span
            >
            không?
          </div>
        </div>
      </div>

      <div class="footer">
        <button class="button" @click="eventYes" ref="autoFocus">
          <div class="content">{{ yesBtn }}</div>
        </button>
        <button class="button" @click="closeAlertDelete">
          <div class="content">{{ noBtn }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { mapActions, mapGetters } from "vuex";
import { deleteModelById } from "@/utils/call_apis/Delete";
import { enumCukcuk } from "@/utils/enumCukcuk";

export default {
  computed: {
    ...mapGetters(["isAlertDeleteOpen", "currentFood"]),
  },

  data() {
    return {
      title: resourceCukcuk.VI.formLabels.titleAlertDel,
      yesBtn: resourceCukcuk.VI.buttons.btnYes,
      noBtn: resourceCukcuk.VI.buttons.btnNo,
      alertErrorMsg: resourceCukcuk.VI.message.generalErrMsg,

      timeout: null,
    };
  },

  watch: {
    /**
     * Author: VQPhong (12/08/2022)
     * Auto focus on Button "Yes" when this form is displayed
     */
    isAlertDeleteOpen: function (value) {
      if (value) {
        this.timeout = setTimeout(() => {
          this.$refs.autoFocus.focus();
        }, 10);
      }
    },
  },

  methods: {
    /**
     * Delete the current food
     * Author: VQPhong (17/07/2022)
     */
    async eventYes() {
      const cur = this;

      try {
        cur.controlLoader();

        const res = await deleteModelById(
          "v1",
          "Foods",
          cur.currentFood.FoodID
        );

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.deleted
        ) {
          cur.closeAlertDelete();
          cur.changeReloadFlag();
        }

        cur.controlLoader();
      } catch (err) {
        cur.controlLoader();
        cur.closeAlertDelete();
        alert(cur.alertErrorMsg);
        console.log(err);
      }
    },

    ...mapActions(["closeAlertDelete", "controlLoader", "changeReloadFlag"]),
  },
};
</script>

<style scoped>
.alert-delete-container {
  z-index: 111;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.4);
}

.alert-delete {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 115px;
  min-height: 115px;
  max-height: 115px;
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

.footer .button:focus-visible,
.footer .button:focus {
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