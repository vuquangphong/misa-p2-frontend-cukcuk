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
  </div>
</template>

<script>
import ContentPanel from "@/components/layouts/ContentPanel.vue";
import MenuNav from "@/components/layouts/MenuNav.vue";
import HeaderBar from "@/components/layouts/HeaderBar.vue";

export default {
  components: { ContentPanel, MenuNav, HeaderBar },
};
</script>

<style scoped>
.layout-container {
  min-height: 100%;
  margin: 0;
  padding: 0;
  border: 0 none;
  overflow: hidden;
  position: static;
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
  height: 684px;
}

.content-panel-container {
  right: auto;
  left: 230px;
  top: 55px;
  margin: 0px;
  height: 684px;
  width: 925px;
  background: #fff !important;
}
</style>
