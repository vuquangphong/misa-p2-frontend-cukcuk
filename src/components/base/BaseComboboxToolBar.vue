<template>
  <div class="combobox-container">
    <div class="combo-language-store">
      <div :class="{comboBody: !isChainStore, comboChainStore: isChainStore}">
        <div :class="{comboInput: true, chainStore: isChainStore}">
          <input disabled type="text" :value="isChainStore ? chainStoreValue : langValue" />
        </div>
        <div class="drop-down"></div>
      </div>
    </div>

    <div class="address" v-show="isChainStore">
      <div class="icon-container">
        <div class="icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "../../utils/resourceCukcuk";

export default {
  props: ["isChainStore"],
  data() {
    return {
      langValue: resourceCukcuk.VI.language,
      chainStoreValue: 'Phong Phong restaurant'
    };
  },
};
</script>

<style scoped>
.combobox-container {
  margin: 0px;
  height: 100%;
  display: flex;
  align-items: center;
}

.combo-language-store {
  height: 32px;
}

.address {
  height: 32px;
  width: 28px;
  background-color: #005082;
}

.address .icon-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address .icon-container .icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  background: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/filter_1.png") no-repeat -4px;
}

.comboBody {
  min-width: 170px;
  max-width: 170px;
  border-width: 1px;
  border-style: none;
  border-color: #005082;
  background-color: #005082;
  display: flex;
}

.comboChainStore {
  border-width: 1px;
  border-style: none;
  border-color: #005082;
  background-color: #005082;
  display: flex;
}

.comboInput {
  height: 32px;
}

.comboInput.chainStore {
  width: 178px;
}

.comboInput input {
  background-color: #005082;
  color: #fff;
  line-height: 26px;
  width: 100%;
  padding: 3px 5px 3px;
  border: 0;
  margin: 0;
  font-size: 12px;
}

.drop-down {
  background-color: #005082;
  width: 22px;
  height: 32px;
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/trigger.png");
  background-position: 0 center;
  cursor: pointer;
}
</style>
