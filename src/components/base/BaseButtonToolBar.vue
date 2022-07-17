<template>
  <div class="btn-container" @click="eventButton">
    <div class="btn-inside">
      <div
        :class="{
          btnIcon: true,
          iconAdd: isAddition,
          iconRep: isReplica,
          iconMod: isModification,
          iconDel: isDelete,
          iconReload: isReload,
        }"
      ></div>
      <div class="btn-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "isAddition",
    "isReplica",
    "isModification",
    "isDelete",
    "isReload",
  ],

  methods: {
    /**
     * General event of base-button
     * Author: VQPhong (16/07/2022)
     */
    eventButton() {
      this.$emit("eventButton", null);
    },
  },
};
</script>

<style scoped>
.btn-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  margin-right: 10px;
  margin-left: 1px;
  border: 1px solid transparent;
}

.btn-container:hover {
  background-color: #fff;
  border-color: #0071c1;
}

.btn-inside {
  display: flex;
}

.btnIcon {
  width: 16px;
  height: 16px;
  background-color: transparent;
  background-repeat: no-repeat;
  margin: 0;
}

.btnIcon.iconAdd {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/IconSprite.png");
  background-position: 0 -2648px;
}

.btnIcon.iconRep {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/IconSprite.png");
  background-position: 0 -1888px;
}

.btnIcon.iconMod {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/Edit16.png");
  background-position: 50% 50%;
}

.btnIcon.iconDel {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/IconSprite.png");
  background-position: 0 -2680px;
}

.btnIcon.iconReload {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/IconSprite.png");
  background-position: 0 -2584px;
}

.btn-title {
  font-size: 12px;
  padding: 0 5px 0 5px;
}
</style>