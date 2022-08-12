<template>
  <div class="layout-container">
    <div class="header-bar-container">
      <HeaderBar />
    </div>

    <div class="menu-nav-container">
      <MenuNav />
    </div>

    <div class="content-panel-container">
      <ContentPanel />
    </div>

    <div class="loader">
      <BaseLoader />
    </div>

    <!-- Adding FavorService form here -->
    <AddFavorServiceForm />

    <!-- FS Options is registered here -->
    <BaseFavorServiceOptions />
  </div>
</template>

<script>
import ContentPanel from "@/components/layouts/ContentPanel.vue";
import MenuNav from "@/components/layouts/MenuNav.vue";
import HeaderBar from "@/components/layouts/HeaderBar.vue";
import BaseLoader from "../../components/base/BaseLoader.vue";
import AddFavorServiceForm from "./AddFavorServiceForm.vue";
import BaseFavorServiceOptions from "../../components/base/BaseFavorServiceOptions.vue";

export default {
  /**
   * Call API FoodGroup, FoodUnit and FoodPlace to Vuex
   * Author: VQPhong (16/07/2022)
   */
  mounted() {
    this.$store.dispatch("getFoodGroup");
    this.$store.dispatch("getFoodUnit");
    this.$store.dispatch("getFoodPlace");
    this.$store.dispatch("getAllFavorService");
  },

  components: {
    ContentPanel,
    MenuNav,
    HeaderBar,
    BaseLoader,
    AddFavorServiceForm,
    BaseFavorServiceOptions,
  },
};
</script>

<style scoped>
.layout-container {
  min-height: 100%;
  margin: 0;
  padding: 0;
  border: 0 none;
  overflow: hidden;
  position: relative;
  touch-action: none;
}

.header-bar-container {
  padding: 0px;
  height: 55px;
  right: auto;
  left: 0px;
  top: 0px;
  margin: 0px;
}

.menu-nav-container {
  width: 230px;
  right: auto;
  left: 0px;
  top: 55px;
  margin: 0px;
  height: calc(100vh);
}

.content-panel-container {
  left: 230px;
  top: 55px;
  margin: 0px;
  height: calc(100vh);
  width: calc(100vw - 230px);
  background: #fff;
  position: absolute;
}
</style>
