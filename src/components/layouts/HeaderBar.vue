<template>
  <div class="container">
    <TopLogo />
    <div class="chain-store">
      <BaseComboboxToolBar :isChainStore="true" />
    </div>
    <ToolBar />
  </div>
</template>

<script>
import BaseComboboxToolBar from "../base/BaseComboboxToolBar.vue";
import ToolBar from "./header-material/ToolBar.vue";
import TopLogo from "./header-material/TopLogo.vue";
export default {
  components: { TopLogo, ToolBar, BaseComboboxToolBar },
};
</script>,

<style scoped>
.container {
  height: 55px;
  width: 1536px;
  left: 0px;
  top: 0px;
  background-color: #0973b9;
  position: relative;
}

.chain-store {
  margin: 0px;
  height: 55px;
  right: auto;
  left: 232px;
  top: 0px;
  width: 240px;
  position: absolute;
  width: 240px;
  display: flex;
  justify-content: flex-end;
}
</style>