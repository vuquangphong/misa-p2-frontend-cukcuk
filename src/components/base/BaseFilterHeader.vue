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
            <input
              :class="{ priceFilter: isFilterPrice }"
              type="text"
              v-model="valueInput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterFromMoney, filterToMoney } from "@/utils/commonFunc";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["isFilterPrice", "field"],

  data() {
    return {
      valueInput: "",
      timeout: null,
    };
  },

  computed: {
    ...mapGetters([
      "codeFilter",
      "nameFilter",
      "groupFilter",
      "unitFilter",
      "priceFilter",
    ]),
  },

  watch: {
    /**
     * Watch value of input to filter the Food
     * Author: VQPhong (22/07/2022)
     */
    valueInput: function (value) {
      const cur = this;

      if (this.isFilterPrice) {
        cur.valueInput = filterFromMoney(value);
      }

      let tempValue = cur.valueInput;

      if (this.isFilterPrice) {
        tempValue = filterToMoney(tempValue);

        if (!tempValue) tempValue = 0;
      }

      clearTimeout(cur.timeout);

      cur.timeout = setTimeout(() => {
        cur[`change${cur.field}Filter`](tempValue);
      }, 1000);
    },

    /**
     * Clear value of input after reloading for Add new
     * Author: VQPhong (22/07/2022)
     */
    codeFilter: function (value) {
      if (this.field === "Code") {
        if (value === "" || value === null) {
          this.valueInput = "";
        }
      }
    },

    /**
     * Clear value of input after reloading for Add new
     * Author: VQPhong (22/07/2022)
     */
    nameFilter: function (value) {
      if (this.field === "Name") {
        if (value === "" || value === null) {
          this.valueInput = "";
        }
      }
    },

    /**
     * Clear value of input after reloading for Add new
     * Author: VQPhong (22/07/2022)
     */
    groupFilter: function (value) {
      if (this.field === "Group") {
        if (value === "" || value === null) {
          this.valueInput = "";
        }
      }
    },

    /**
     * Clear value of input after reloading for Add new
     * Author: VQPhong (22/07/2022)
     */
    unitFilter: function (value) {
      if (this.field === "Unit") {
        if (value === "" || value === null) {
          this.valueInput = "";
        }
      }
    },

    /**
     * Clear value of input after reloading for Add new
     * Author: VQPhong (22/07/2022)
     */
    priceFilter: function (value) {
      if (this.field === "Price") {
        if (value === "" || value === null) {
          this.valueInput = "";
        }
      }
    },
  },

  methods: {
    ...mapActions([
      "changeCodeFilter",
      "changeNameFilter",
      "changeGroupFilter",
      "changeUnitFilter",
      "changePriceFilter",
    ]),
  },
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

.input-inside input.priceFilter {
  text-align: right;
}

.input-inside input:focus {
  border: 1px solid #0071c1;
}
</style>