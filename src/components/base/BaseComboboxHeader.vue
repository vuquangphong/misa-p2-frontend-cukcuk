<template>
  <div class="combobox-container">
    <div class="combo-inside">
      <div class="combo-body">
        <div class="combo-input">
          <div class="input-container">
            <input disabled type="text" :value="valueInput" />
          </div>
        </div>

        <div class="drop-down"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["valueInput"],

  methods: {
    test() {
      alert("test ref");
    },
  },
};
</script>

<style scoped>
.combobox-container {
  margin: 0px;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
}

.combo-inside {
  height: 22px;
}

.combo-body {
  border-width: 1px;
  border-style: none;
  display: flex;
}

.combo-input {
  height: 22px;
  width: calc(100% - 22px);
}

.input-container {
  padding-left: 5px;
  height: 100%;
  background-color: #fff;
}

.combo-input input {
  background-color: #fff;
  color: #000000;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  margin: 0;
  font-size: 12px;
}

.drop-down {
  background: #fff
    url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/trigger.png")
    no-repeat;
  background-position: 0 center;
  width: 22px;
  cursor: pointer;
}
</style>
