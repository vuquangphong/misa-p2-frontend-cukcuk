<template>
  <div
    class="whole-container"
    v-if="isFSOptionsOpen"
    v-bind:style="{
      top: coordinateOptionFS.clientY,
      left: coordinateOptionFS.clientX,
    }"
    v-click-outside="eventClickOutside"
  >
    <div class="list-option-container">
      <div class="grid-view">
        <table>
          <thead>
            <tr>
              <th style="min-width: 200px" class="text-align-center">
                Sở thích phục vụ
              </th>
              <th style="min-width: 120px" class="text-align-center">
                Thu thêm
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(data, index) in allFavorService"
              :key="index"
              @click="chooseFavorService(data)"
            >
              <td class="text-align-left">{{ data.Content }}</td>
              <td class="text-align-right">
                {{ filterMoney(data.Surcharge) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      "allFavorService",
      "isFSOptionsOpen",
      "coordinateOptionFS",
      "currentFavorService",
      "isClickDropDownFS"
    ]),
  },

  methods: {
    /**
     * Filter money: 1000000 => 1.000.000
     * Author: VQPhong (12/08/2022)
     */
    filterMoney(value) {
      value = Math.round(value);

      const formatterVN = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return formatterVN.format(value).slice(0, -2);
    },

    /**
     * Author: VQPhong (12/08/2022)
     * Choosing FavorService into corresponding row
     */
    chooseFavorService(data) {
      // Choosing...
      let i = this.coordinateOptionFS.indexOfRow;
      this.currentFavorService[i].FavorServiceID = data.FavorServiceID;
      this.currentFavorService[i].Content = data.Content;
      this.currentFavorService[i].Surcharge = data.Surcharge;

      // Close this Table
      this.closeFSOptions();
    },

    /**
     * Author: VQPhong (22/08/2022)
     */
    eventClickOutside() {
      if (this.isClickDropDownFS) {
        this.changeIsClickDropDownFS(false);
      } else {
        this.closeFSOptions();
      }
    },

    ...mapActions(["openFSOptions", "closeFSOptions", "changeIsClickDropDownFS"]),
  },
};
</script>

<style scoped>
@import url("../../styles/common.css");

.whole-container {
  z-index: 10001;
  position: fixed;
  width: 347px;
  height: 308px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: rgb(136, 136, 136) 0 1px 8px;
}

.list-option-container {
  overflow: auto;
  width: 100%;
  height: 100%;
}

.list-option-container .grid-view {
  overflow: unset;
}

table {
  border-spacing: 0;
}

table tbody {
  overflow: auto;
}

table tr th,
table tr td {
  border-collapse: collapse;
  padding: 5px 10px 4px 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-left: none;
  border-top: none;
}

table tr th {
  padding: 0;
}

thead,
thead th {
  z-index: 1;
  position: sticky;
  top: 0;
}

thead th {
  margin: 0;
  border-right: 1px solid #ccc;
  background-image: none;
  background-color: #ededed;
  color: #000;
  font-size: 13px;
  font-weight: bold;
}

thead tr {
  height: 28px;
}

tbody tr {
  height: 33px;
  cursor: pointer;
}

tbody tr:hover {
  background-color: #d5e8f6;
}
</style>