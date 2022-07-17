<template>
  <div class="filter-container">
    <div class="inside-filter">
      <div class="split-button">
        <div class="inside-split">
          <div class="symbol-split">{{ isFilterPrice ? "≤" : "*" }}</div>
        </div>
      </div>

      <div class="input-filter">
        <div class="input-container">
          <div class="input-inside">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isFilterPrice"],
};
</script>

<style scoped>
.filter-container {
  margin: 0;
  height: 100%;
  border: 1px solid #ccc;
}

.inside-filter {
  display: flex;
}

.split-button {
  width: 22px;
  height: 22px;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
}

.split-button .inside-split {
  width: 16px;
  height: 16px;
}

.symbol-split {
  padding-top: 2px;
  font-size: 10px;
  font-weight: normal;
  line-height: 16px;
}

.input-inside input {
  border: 1px solid transparent;
  padding: 3px 5px 3px;
  font-size: 12px;
  outline: none;
}

.input-inside input:focus {
  border: 1px solid #0071c1;
}
</style>