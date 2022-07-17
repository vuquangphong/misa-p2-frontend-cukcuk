<template>
  <div class="tool-bar-container">
    <div class="tool-bar-body">
      <BaseComboboxToolBar :isChainStore="false" />

      <div class="notification">
        <div class="icon-globe">
          <img src="../../../assets/imgs/icon-globe.png" alt="Global icon">
        </div>
      </div>

      <div class="misa-support">
        <div class="support-icon"></div>
      </div>

      <div class="user-setting">
        <div class="user-setting-container">
          <div class="avatar-name">
            <div class="avatar-name-container">
              <div class="avatar"></div>
              <div class="name">Phong</div>
            </div>
          </div>
          <div class="drop-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComboboxToolBar from "@/components/base/BaseComboboxToolBar.vue";

export default {
  components: { BaseComboboxToolBar },
};
</script>

<style scoped>
.tool-bar-container {
  margin: 0px;
  height: 55px;
  right: 0;
  top: 0px;
  width: 620px;
  margin-right: 8px !important;
  position: absolute;
}

.tool-bar-body {
  height: 100%;
  width: 620px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.notification {
  height: 55px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification img {
  width: 24px;
}

.misa-support {
  height: 55px;
  width: 65px;
}

.support-icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/ic_support.svg");
  background-repeat: no-repeat;
  background-size: 65px;
  height: 55px;
  width: 65px;
  background-color: transparent;
  cursor: pointer;
}

.user-setting {
  height: 55px;
  display: flex;
  align-items: center;
}

.user-setting-container {
  width: 190px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 164px;
}

.avatar-name-container {
  display: flex;
  align-items: center;
}

.avatar-name-container .avatar {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/EmployeeImage.png");
  background-size: cover;
  background-position: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #fff;
}

.avatar-name-container .name {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  padding: 5px;
}

.user-setting-container .drop-down {
  width: 20px;
  padding-top: 6px;
  padding-right: 16px;
  background: url('https://cdn2-new.cukcuk.vn/QLNH/resources/images/button/default-small-arrow.png') no-repeat right center;
}
</style>