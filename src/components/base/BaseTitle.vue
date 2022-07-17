<template>
  <div class="title-container">
    <div class="main-title">
      <div class="title-inside">
        <div class="title">{{ title }}</div>
      </div>
    </div>

    <div class="respond-button">
      <div class="btn-container">
        <div class="btn-inside" @click="respondeEvent">
          <div class="btn-content">
            <img class="btn-icon" src="../../assets/imgs/response.png" />
            <div class="btn-title">{{ respondTitle }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
export default {
  props: ["title"],

  data() {
    return {
      respondTitle: resourceCukcuk.VI.buttons.btnRespond,
      msgEvent: resourceCukcuk.VI.message.noFunction,
    };
  },

  methods: {
    /**
     * Alert no function
     * Author: VQPhong (10/07/2022)
     */
    respondeEvent() {
      alert(this.msgEvent);
    },
  },
};
</script>

<style scoped>
.title-container {
  height: 50px;
  display: flex;
}

.main-title {
  padding: 14px 0 0 8px;
  flex: 1;
}

.title-inside {
  padding: 3px 0 1px 0;
  width: 100%;
}

.title-inside .title {
  font-size: 22px;
}

.respond-button {
  height: 42px;
}

.btn-container {
  padding: 13px 8px 0 6px;
}

.btn-inside {
  width: 100px;
  border: 1px solid #ccc;
  background-color: #fcfcfc;
  cursor: pointer;
}

.btn-inside:hover {
  border-color: #0071c1;
  background-image: -webkit-linear-gradient(top, #eff0ec, #e1f2e9);
}

.btn-content {
  padding: 3px;
  height: 20px;
  display: flex;
  align-items: center;
}

.btn-icon {
  width: 16px;
  height: 16px;
  padding-left: 11px;
}

.btn-title {
  font-size: 12px;
  padding: 0 5px 0 5px;
  line-height: 20px;
}
</style>