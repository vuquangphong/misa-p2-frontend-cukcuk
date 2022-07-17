<template>
  <div class="loader-container" v-show="isLoading">
    <div class="loader">
      <div class="loader-inside">
        <div class="content">{{ contentLoader }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoading"]),
  },

  data() {
    return {
      contentLoader: resourceCukcuk.VI.message.loading,
    };
  },
};
</script>

<style scoped>
.loader-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(10, 10, 10, 0.4);
  transition: 0.5s;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  background: #e5e5e5;
  padding: 8px;
}

.loader-inside {
  padding: 0;
  background-color: transparent;
  color: #666;
  font-size: 13px;
}

.content {
  padding: 21px 0 0;
  background-image: url('https://cdn2-new.cukcuk.vn/QLNH/resources/images/loadmask/loading.gif');
  background-repeat: no-repeat;
  background-position: center 0;
}
</style>
