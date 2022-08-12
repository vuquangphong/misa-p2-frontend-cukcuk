<template>
  <div class="menu-food-list-container">
    <div class="grid-view">
      <table>
        <thead>
          <tr>
            <th style="min-width: 160px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodType }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader :valueInput="filterFoodType" ref="test" />
                </div>
              </div>
            </th>

            <th style="min-width: 180px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodCode }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :field="'Code'" @search="getFoodPaging" />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodName }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :field="'Name'" @search="getFoodPaging" />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodGroup }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :field="'Group'" @search="getFoodPaging" />
                </div>
              </div>
            </th>

            <th style="min-width: 90px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodUnit }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :field="'Unit'" @search="getFoodPaging" />
                </div>
              </div>
            </th>

            <th style="min-width: 120px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodPrice }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :isFilterPrice="true" :field="'Price'" @search="getFoodPaging" />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.changePrice }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.adjustPrice }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 140px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.measureIngredient }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.isShow }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 110px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.stopSell }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseComboboxHeader :valueInput="filterStopSell" />
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(data, index) in dataFoodPaging"
            :key="index"
            :class="{ evenRow: index % 2 === 1, selected: data.Selected }"
            @click="chooseFood(data)"
            @dblclick="displayFood(data)"
          >
            <td class="text-align-left">{{ foodTypeDefault }}</td>
            <td class="text-align-left">{{ data.FoodCode }}</td>
            <td class="text-align-left">{{ data.FoodName }}</td>
            <td class="text-align-left">{{ data.FoodGroupName }}</td>
            <td class="text-align-left">{{ data.FoodUnitName }}</td>
            <td class="text-align-right">{{ filterMoney(data.FoodPrice) }}</td>
            <td class="text-align-left">
              <div>
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  :class="{ checkbox: true, active: false }"
                />
              </div>
            </td>
            <td class="text-align-left">
              <div>
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  :class="{ checkbox: true, active: false }"
                />
              </div>
            </td>
            <td class="text-align-left">{{ notSetup }}</td>
            <td class="text-align-left">
              <div>
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  :class="{ checkbox: true, active: !data.Appear }"
                />
              </div>
            </td>
            <td class="text-align-left">
              <div>
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  :class="{ checkbox: true, active: false }"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="some-dialogs">
      <FoodFormDetail
        @reloadForAdd="reloadForAdd"
        @reloadForUpdate="reloadForAdd"
      />
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import BaseComboboxHeader from "@/components/base/BaseComboboxHeader.vue";
import BaseFilterHeader from "../../base/BaseFilterHeader.vue";
import FoodFormDetail from "../../../pages/menu-food/FoodFormDetail.vue";
import { mapActions, mapGetters } from "vuex";
import { getPaging } from "@/utils/call_apis/Get";
import { enumCukcuk } from "@/utils/enumCukcuk";

export default {
  /**
   * Call paging API at init page
   * Author: VQPhong (16/07/2022)
   */
  created() {
    this.getFoodPaging();
  },

  components: {
    BaseComboboxHeader,
    BaseFilterHeader,
    FoodFormDetail,
  },

  computed: {
    ...mapGetters([
      "codeFilter",
      "nameFilter",
      "groupFilter",
      "unitFilter",
      "priceFilter",
      "pageIndex",
      "pageSize",
      "dataFoodPaging",
      "reloadFlag",
      "totalPages"
    ]),
  },

  data() {
    return {
      headersList: resourceCukcuk.VI.tableHeader,
      filterFoodType: "Tất cả",
      filterStopSell: "Không",
      foodTypeDefault: "Món ăn",
      errorUserMsg: resourceCukcuk.VI.message.generalErrMsg,
      notSetup: resourceCukcuk.VI.formLabels.notSetup,
    };
  },

  watch: {
    /**
     * Call paging API again when pageIndex changed
     * Author: VQPhong (17/07/2022)
     */
    pageIndex: function (value) {
      if (value > this.totalPages) {
        this.pageIndex = this.totalPages;
      }
      this.getFoodPaging();
    },

    /**
     * Call paging API again when pageSize changed
     * Author: VQPhong (17/07/2022)
     */
    pageSize: function () {
      this.getFoodPaging();
    },

    // /**
    //  * Call paging API again when codeFilter changed
    //  * Author: VQPhong (22/07/2022)
    //  */
    // codeFilter: function () {
    //   this.getFoodPaging();
    // },

    // /**
    //  * Call paging API again when nameFilter changed
    //  * Author: VQPhong (22/07/2022)
    //  */
    // nameFilter: function () {
    //   this.getFoodPaging();
    // },

    // /**
    //  * Call paging API again when groupFilter changed
    //  * Author: VQPhong (22/07/2022)
    //  */
    // groupFilter: function () {
    //   this.getFoodPaging();
    // },

    // /**
    //  * Call paging API again when unitFilter changed
    //  * Author: VQPhong (22/07/2022)
    //  */
    // unitFilter: function () {
    //   this.getFoodPaging();
    // },

    // /**
    //  * Call paging API again when priceFilter changed
    //  * Author: VQPhong (22/07/2022)
    //  */
    // priceFilter: function () {
    //   this.getFoodPaging();
    // },

    /**
     * Call paging API again when active Reload button
     * Author: VQPhong (17/07/2022)
     */
    reloadFlag: function () {
      this.getFoodPaging();
    },
  },

  methods: {
    /**
     * Get data of Food from paging API
     * Author: VQPhong (16/07/2022)
     */
    async getFoodPaging() {
      const cur = this;

      try {
        cur.controlLoader();

        // let firstFoodId;

        const res = await getPaging(
          "v1",
          "Foods",
          cur.pageIndex,
          cur.pageSize,
          cur.codeFilter,
          cur.nameFilter,
          cur.groupFilter,
          cur.unitFilter,
          cur.priceFilter
        );

        if (
          res.data.customStatusCode === enumCukcuk.customizeStatusCode.getOkay
        ) {
          res.data.responseData.Data.forEach((food, index) => {
            if (index === 0) {
              // firstFoodId = food["FoodID"];

              food["Selected"] = true;
              cur.changeCurrentFood({
                FoodID: food["FoodID"],
                FoodCode: food["FoodCode"],
                FoodName: food["FoodName"],
              });
            } else {
              food["Selected"] = false;
            }
          });

          cur.loadDataFoodPaging(res.data.responseData.Data);
          cur.changeTotalPages(res.data.responseData.TotalPages);
          cur.changeCurrentTotalNumberFood(res.data.responseData.TotalRecords);
          cur.changeTotalRecordsInPage(
            res.data.responseData.TotalRecordsInPage
          );
        }
        cur.controlLoader();
      } catch (err) {
        cur.controlLoader();

        alert(cur.errorUserMsg);
        console.log(err);
      }
    },

    /**
     * Event reload table after adding new Food
     * Author: VQPhong (18/07/2022)
     */
    async reloadForAdd() {
      this.changeCodeFilter("");
      this.changeNameFilter("");
      this.changeGroupFilter("");
      this.changeUnitFilter("");
      this.changePriceFilter("");

      if (this.pageIndex !== 1) {
        this.changePageIndex(1);
      } else {
        await this.getFoodPaging();
      }
    },

    /**
     * Event click on 1 row of the grid
     * Author: VQPhong (17/07/2022)
     */
    chooseFood({ FoodID, FoodCode, FoodName, Selected }) {
      this.changeCurrentFood("");
      this.changeCurrentFood({ FoodID, FoodCode, FoodName });

      if (!Selected) {
        let checkBreak = 0;
        for (const food of this.dataFoodPaging) {
          if (food.Selected) {
            food.Selected = false;
            checkBreak++;
            if (checkBreak >= 2) break;
            else continue;
          }

          if (food.FoodID === FoodID) {
            food.Selected = true;
            checkBreak++;
            if (checkBreak >= 2) break;
            else continue;
          }
        }
      }
    },

    /**
     * Event double click on 1 row of the grid
     * Author: VQPhong (17/07/2022)
     */
    displayFood({ FoodID, FoodCode, FoodName, Selected }) {
      this.chooseFood({ FoodID, FoodCode, FoodName, Selected });
      this.getFavorServiceByFoodId(FoodID);
      this.stopReplication();
      this.beingModify();
      this.changeIsBinding();
      this.openFormDetail();
    },

    /**
     * Filter money: 1000000 => 1.000.000
     * Author: VQPhong (19/07/2022)
     */
    filterMoney(value) {
      value = Math.round(value);

      const formatterVN = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return formatterVN.format(value).slice(0, -2);
    },

    ...mapActions([
      "controlLoader",
      "loadDataFoodPaging",
      "changeTotalPages",
      "changeCurrentTotalNumberFood",
      "changeTotalRecordsInPage",
      "changeCurrentFood",
      "changePageIndex",
      "openFormDetail",
      "changeIsBinding",
      "stopReplication",
      "beingModify",
      "changeCodeFilter",
      "changeNameFilter",
      "changeGroupFilter",
      "changeUnitFilter",
      "changePriceFilter",
      "getFavorServiceByFoodId",
    ]),
  },
};
</script>

<style scoped>
@import url("../../../styles/common.css");

.menu-food-list-container {
  overflow: auto;
  width: 100%;
  height: calc(100% - 53px);
  border-bottom: 1px solid #ccc;
}

.menu-food-list-container .grid-view {
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
  border: 1px solid #c5c5c5;
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
  border-right: 1px solid #c5c5c5;
  background-image: none;
  background-color: #ededed;
}

thead th .title-th div {
  padding: 7px 10px 7px 10px;
  font-weight: normal;
  font-size: 13px;
}

thead th .filter-th {
  width: 100%;
  height: auto;
}

.filter-th-container {
  padding: 0 2px 2px 2px;
}

tbody tr.evenRow {
  background-color: #fafafa;
}

tbody tr.selected {
  background-color: rgba(155, 199, 227, 0.4);
}

tbody tr:hover {
  background-color: #e2eff8;
}

tbody td div {
  display: flex;
  align-items: center;
  justify-content: center;
}

tbody td img.checkbox {
  opacity: 0.9;
  width: 15px;
  height: 15px;
  background: url("https://cdn2.cukcuk.vn/QLNH/resources/images/form/checkbox.png")
    0 0 no-repeat;
}

tbody td img.checkbox.active {
  background-position: 0 -15px;
}
</style>