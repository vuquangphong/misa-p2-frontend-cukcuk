<template>
  <div class="tool-bar-container">
    <div class="tool-bar-inside">
      <BaseButtonToolBar
        :title="btnAdd"
        :isAddition="true"
        @eventButton="eventOpenForAdd"
      />

      <BaseButtonToolBar
        :title="btnReplica"
        :isReplica="true"
        @eventButton="eventOpenForReplica"
      />

      <BaseButtonToolBar
        :title="btnEdit"
        :isModification="true"
        @eventButton="eventOpenForModify"
      />

      <BaseButtonToolBar
        :title="btnDelete"
        :isDelete="true"
        @eventButton="eventDelete"
      />

      <div class="tool-bar-separator"></div>

      <BaseButtonToolBar
        :title="btnReload"
        :isReload="true"
        @eventButton="eventReload"
      />
    </div>

    <BaseAlertDelete />
  </div>
</template>

<script>
import BaseButtonToolBar from "@/components/base/BaseButtonToolBar.vue";
import { resourceCukcuk } from "../../../utils/resourceCukcuk";
import { mapActions, mapGetters } from "vuex";
import BaseAlertDelete from "@/components/base/BaseAlertDelete.vue";

export default {
  components: { BaseButtonToolBar, BaseAlertDelete },

  computed: {
    ...mapGetters(["currentFood", "dataFoodPaging", "isBinding"]),
  },

  data() {
    return {
      btnAdd: resourceCukcuk.VI.buttons.btnAdd,
      btnReplica: resourceCukcuk.VI.buttons.btnReplica,
      btnEdit: resourceCukcuk.VI.buttons.btnEdit,
      btnDelete: resourceCukcuk.VI.buttons.btnDelete,
      btnReload: resourceCukcuk.VI.buttons.btnReload,
    };
  },

  methods: {
    /**
     * Event add button
     * Author: VQPhong (17/07/2022)
     */
    eventOpenForAdd() {
      this.changeCurrentFood(false);
      this.openFormDetail();
    },

    /**
     * Event replica button
     * Author: VQPhong (17/07/2022)
     */
    eventOpenForReplica() {
      this.resetCurrentFood();
      this.beingReplication();
      this.changeIsBinding();
      this.openFormDetail();
    },

    /**
     * Event modify button
     * Author: VQPhong (17/07/2022)
     */
    eventOpenForModify() {
      this.resetCurrentFood();
      this.beingModify();
      this.changeIsBinding();
      this.openFormDetail();
    },

    /**
     * Event delete button
     * Author: VQPhong (17/07/2022)
     */
    eventDelete() {
      this.resetCurrentFood();
      this.openAlertDelete();
    },

    /**
     * Event reload button
     * Author: VQPhong (17/07/2022)
     */
    eventReload() {
      this.changeReloadFlag();
    },

    /**
     * Reset currentFood if false
     * Author: VQPhong (17/07/2022)
     */
    resetCurrentFood() {
      if (!this.currentFood) {
        for (const food of this.dataFoodPaging) {
          if (food.Selected) {
            this.changeCurrentFood({
              FoodID: food.FoodID,
              FoodCode: food.FoodCode,
              FoodName: food.FoodName,
            });

            break;
          }
        }
      }
    },

    ...mapActions([
      "openFormDetail",
      "changeCurrentFood",
      "openAlertDelete",
      "beingReplication",
      "changeIsBinding",
      "changeReloadFlag",
      "beingModify",
    ]),
  },
};
</script>

<style scoped>
.tool-bar-container {
  background-image: -webkit-linear-gradient(top, #f9f9f9, #e3e4e6);
  border-color: #d9d9d9;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-bottom: none;
  padding: 2px;
}

.tool-bar-inside {
  width: 100%;
  height: 22px;
  display: flex;
  align-items: center;
}

.tool-bar-separator {
  border-left-color: #ccc;
  height: 14px;
  border-style: solid;
  border-width: 0 0 0 1px;
  margin-right: 8px;
}
</style>