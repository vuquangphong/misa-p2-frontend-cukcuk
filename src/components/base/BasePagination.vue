<template>
  <div class="pagination-container">
    <div class="left-pagin">
      <div class="left-container">
        <div
          :class="{
            firstPage: true,
            changePage: true,
            disabled: pageIndex <= 1,
          }"
          @click="eventFirstPage"
        >
          <div class="icon"></div>
        </div>

        <div
          :class="{
            prevPage: true,
            changePage: true,
            disabled: pageIndex <= 1,
          }"
          @click="eventPrevPage"
        >
          <div class="icon"></div>
        </div>

        <div class="separator"></div>

        <div class="page-text">Trang</div>

        <div class="field-page-index">
          <div class="field-inside">
            <input type="text" disabled v-model="pageIndex" />
          </div>
        </div>

        <div class="total-page">
          trên
          <span>{{ totalPages }}</span>
        </div>

        <div class="separator"></div>

        <div
          :class="{
            nextPage: true,
            changePage: true,
            disabled: pageIndex >= totalPages,
          }"
          @click="eventNextPage"
        >
          <div class="icon"></div>
        </div>

        <div
          :class="{
            lastPage: true,
            changePage: true,
            disabled: pageIndex >= totalPages,
          }"
          @click="eventLastPage"
        >
          <div class="icon"></div>
        </div>

        <div class="separator"></div>

        <div class="reload-btn" @click="reloadEvent">
          <div class="icon"></div>
        </div>

        <div class="separator"></div>

        <div class="page-size-options">
          <div :class="{ comboboxContainer: true, active: isOpen }">
            <div class="selected-option">
              <input type="text" disabled v-model="valueOfInput" />
            </div>

            <div class="action" @click="eventOpenOptions">
              <div class="action-dropdown"></div>
            </div>
          </div>

          <div class="options-container" v-if="isOpen" v-click-outside="eventBlur">
            <div class="options-inside">
              <div
                v-for="(option, index) in pageSizeOptions"
                :key="index"
                :class="{ optionsPaging: true, selected: option.selected }"
                @click="clickOption(option)"
              >
                {{ option.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-pagin">
      <div class="content">
        Hiển thị 1 -
        <span>{{ totalRecordsInPage }}</span>
        trên
        <span>{{ currentTotalNumberFood }}</span>
        kết quả
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "totalRecordsInPage",
      "currentTotalNumberFood",
      "pageIndex",
      "totalPages",
    ]),
  },

  data() {
    return {
      isOpen: false,
      isClickDropdown: false,
      valueOfInput: 100,
      pageSizeOptions: [
        { selected: false, value: 10 },
        { selected: false, value: 50 },
        { selected: true, value: 100 },
      ],
    };
  },

  methods: {
    /**
     * Event change PageSize
     * Author: VQPhong (17/07/2022)
     */
    clickOption(option) {
      this.changePageSize(option.value);
      this.valueOfInput = option.value;

      // Reset to page 1
      this.changePageIndex(1);

      this.pageSizeOptions.forEach((data) => {
        data.selected = false;
      });

      option.selected = true;
      this.isOpen = false;
    },

    /**
     * Event reload data
     * Author: VQPhong (17/07/2022)
     */
    reloadEvent() {
      if (this.pageIndex !== 1) {
        this.changePageIndex(1);
      } else {
        this.changeReloadFlag();
      }
    },

    /**
     * Event change pageIndex
     * Author: VQPhong (17/07/2022)
     */
    eventFirstPage() {
      this.changePageIndex(1);
    },

    /**
     * Event change pageIndex
     * Author: VQPhong (17/07/2022)
     */
    eventPrevPage() {
      if (this.pageIndex > 1) {
        this.changePageIndex(this.pageIndex - 1);
      }
    },

    /**
     * Event change pageIndex
     * Author: VQPhong (17/07/2022)
     */
    eventNextPage() {
      if (this.pageIndex < this.totalPages) {
        this.changePageIndex(this.pageIndex + 1);
      }
    },

    /**
     * Event change pageIndex
     * Author: VQPhong (17/07/2022)
     */
    eventLastPage() {
      this.changePageIndex(this.totalPages);
    },

    /**
     * 
     */
    eventOpenOptions() {
      this.isOpen = !this.isOpen;
      this.isClickDropdown = true;
    },

    /**
     * Event blur to hide options container
     * Author: VQPhong (21/07/2022)
     */
    eventBlur() {
      if (this.isClickDropdown) {
        this.isClickDropdown = false;
      } else {
        this.isOpen = false;
      }
    },

    ...mapActions(["changePageIndex", "changePageSize", "changeReloadFlag"]),
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-pagin {
  flex: 2;
}

.left-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.changePage {
  border-radius: 3px;
  padding: 3px 3px 3px 3px;
  border-width: 1px;
  border-style: solid;
  background-image: none;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  margin-right: 8px;
}

.changePage.disabled {
  opacity: 0.5;
}

.changePage .icon {
  width: 16px;
  height: 16px;
  background-position: center center;
  background-repeat: no-repeat;
}

.firstPage .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/grid/page-first.png");
}

.prevPage .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/grid/page-prev.png");
}

.nextPage .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/grid/page-next.png");
}

.lastPage .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/grid/page-last.png");
}

.nextPage {
  margin-left: 8px;
}

.page-text,
.total-page {
  padding: 0 4px;
  color: #333f49;
  font-size: 13px;
  margin: 0 7px;
}

.field-page-index {
  width: 40px;
  height: 24px;
}

.field-page-index .field-inside {
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
}

.field-page-index .field-inside input {
  color: #000;
  padding: 3px 5px 3px;
  background-color: #fff;
  width: calc(100% - 10px);
  border: none;
  font-size: 12px;
  font-weight: normal;
}

.reload-btn {
  border-radius: 3px;
  padding: 3px 3px 3px 3px;
  border-width: 1px;
  border-style: solid;
  background-image: none;
  background-color: transparent;
  border-color: transparent;
  margin: 0 8px;
  cursor: pointer;
}

.reload-btn:hover {
  border-color: #d8d8d8;
  background-color: #ebebeb;
}

.reload-btn .icon {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/grid/refresh.png");
  height: 16px;
  width: 16px;
  background-position: center center;
  background-repeat: no-repeat;
}

.page-size-options {
  height: 24px;
  width: 60px;
  position: relative;
  margin-left: 37px;
}

.options-container {
  box-shadow: rgb(136 136 136) 0px 1px 8px;
  position: absolute;
  bottom: 26px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  font-size: 13px;
}

.option-inside {
  padding: 0 1px;
}

.optionsPaging {
  padding: 5px 5px;
  cursor: pointer;
}

.optionsPaging.selected {
  background-color: rgba(130, 195, 235, 0.4);
}

.optionsPaging:hover {
  background-color: #e2eff8;
}

.comboboxContainer {
  display: flex;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  border-width: 1px;
  border-style: solid;
  border-color: #c1c1c1 #d9d9d9 #d9d9d9;
}

.comboboxContainer.active {
  border-color: #0071c1;
}

.selected-option {
  width: 100%;
  height: 100%;
}

.selected-option input {
  width: calc(100% - 10px);
  border: none;
  background-color: #f2f2f2;
  color: #000;
  font-size: 12px;
  font-weight: normal;
  padding: 3px 5px 3px;
}

.action {
  cursor: pointer;
}

.action-dropdown {
  background: #fff
    url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/trigger.png")
    no-repeat;
  background-position: 0 center;
  width: 22px;
  height: 22px;
}

.left-pagin .separator {
  border-left-color: #ccc;
  height: 14px;
  border-style: solid;
  border-width: 0 0 0 1px;
  border-right-color: #fff;
}

.right-pagin {
  flex: 1;
  font-size: 13px;
  color: #333f49;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
}

.right-pagin .content {
  padding: 0 4px;
}
</style>