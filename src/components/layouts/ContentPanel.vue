<template>
  <div class="content-panel">
    <BaseTitle :title="title" />

    <div class="main-content">
      <div class="inside-main-content">
        <ToolBarButton />
        <MenuFoodList />
        <div class="pagination">
          <BasePagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import BaseTitle from "../base/BaseTitle.vue";
import ToolBarButton from './content-material/ToolBarButton.vue';
import MenuFoodList from './content-material/MenuFoodList.vue';
import BasePagination from '../base/BasePagination.vue';

export default {
  components: { BaseTitle, ToolBarButton, MenuFoodList, BasePagination },
  
  data() {
    return {
      title: resourceCukcuk.VI.menuList.menuFood,
    };
  },
};
</script>

<style scoped>
.content-panel {
  position: relative;
  width: 100%;
  height: 100%;
}

.main-content {
  position: absolute;
  padding: 0px 1px 1px;
  margin: 0px;
  right: auto;
  left: 8px;
  width: calc(100vw - 248px);
  height: calc(100vh - 122px);
  top: 58px;
}

.inside-main-content {
  height: 100%;
  border: 1px solid #ccc;
}

.pagination {
  height: 26px;
}
</style>