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
                  <BaseComboboxHeader :valueInput="filterFoodType" />
                </div>
              </div>
            </th>

            <th style="min-width: 180px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodCode }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodName }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 150px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodGroup }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 90px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodUnit }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader />
                </div>
              </div>
            </th>

            <th style="min-width: 120px" class="text-align-center">
              <div class="title-th">
                <div>{{ headersList.foodPrice }}</div>
              </div>
              <div class="filter-th">
                <div class="filter-th-container">
                  <BaseFilterHeader :isFilterPrice="true" />
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
          >
            <td class="text-align-left">{{ foodTypeDefault }}</td>
            <td class="text-align-left">{{ data.FoodCode }}</td>
            <td class="text-align-left">{{ data.FoodName }}</td>
            <td class="text-align-left">{{ data.FoodGroup }}</td>
            <td class="text-align-left">{{ data.FoodUnit }}</td>
            <td class="text-align-right">{{ data.FoodPrice }}</td>
            <td class="text-align-left">{{ data.ChangePrice }}</td>
            <td class="text-align-left">{{ data.AdjustPrice }}</td>
            <td class="text-align-left">{{ data.FeasureIngredient }}</td>
            <td class="text-align-left">{{ data.IsShow }}</td>
            <td class="text-align-left">{{ data.StopSell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="some-dialogs">
      <FoodFormDetail />
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
import { fakeData } from "@/utils/constants";

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
    ]),
  },

  data() {
    return {
      headersList: resourceCukcuk.VI.tableHeader,
      filterFoodType: "Tất cả",
      filterStopSell: "Không",
      foodTypeDefault: "Món ăn",
      tempData: fakeData,
      errorUserMsg: resourceCukcuk.VI.message.generalErrMsg,
    };
  },

  watch: {
    /**
     * Call paging API again when pageIndex changed
     * Author: VQPhong (17/07/2022)
     */
    pageIndex: function () {
      this.getFoodPaging();
    },

    /**
     * Call paging API again when pageSize changed
     * Author: VQPhong (17/07/2022)
     */
    pageSize: function () {
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
            index === 0
              ? (food["Selected"] = true)
              : (food["Selected"] = false);
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

    ...mapActions([
      "controlLoader",
      "loadDataFoodPaging",
      "changeTotalPages",
      "changeCurrentTotalNumberFood",
      "changeTotalRecordsInPage",
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

.menu-food-list-container * {
  overflow: auto;
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
  border-collapse: collapse;
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
</style>