<template>
  <div class="tool-bar-container">
    <div class="tool-bar-inside">
      <BaseButtonToolBar
        :title="btnAdd"
        :isAddition="true"
        @eventButton="openFormDetail"
      />
      <BaseButtonToolBar :title="btnReplica" :isReplica="true" />
      <BaseButtonToolBar :title="btnEdit" :isModification="true" />
      <BaseButtonToolBar :title="btnDelete" :isDelete="true" />
      <div class="tool-bar-separator"></div>
      <BaseButtonToolBar :title="btnReload" :isReload="true" />
    </div>
  </div>
</template>

<script>
import BaseButtonToolBar from "@/components/base/BaseButtonToolBar.vue";
import { resourceCukcuk } from "../../../utils/resourceCukcuk";
import { mapActions } from "vuex";
export default {
  components: { BaseButtonToolBar },

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
    ...mapActions(["openFormDetail"]),
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