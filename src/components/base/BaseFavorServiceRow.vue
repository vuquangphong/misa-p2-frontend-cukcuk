<template>
  <td class="content" ref="flagCoordinateFS">
    <div
      :class="{ insideContent: true, active: activeRowFavor === index }"
      @click="activeEvent"
      v-click-outside="deactiveEvent"
    >
      <input type="text" v-model="currentFavorService[index].Content" />
      <div
        v-show="activeRowFavor === index"
        class="drop-down icon"
        @click="eventOpenFavorOption"
      ></div>
      <div
        v-show="activeRowFavor === index"
        class="search icon"
        @click="eventSearchFavor"
      ></div>
      <div
        v-show="activeRowFavor === index"
        class="add-trigger icon"
        @click="eventAddNewFavor"
      ></div>
    </div>
  </td>

  <td
    :class="{
      surcharge: true,
      flow: currentFavorService.length >= 8,
    }"
  >
    <input
      type="text"
      v-model="currentFavorService[index].Surcharge"
      @blur="blurEventMoney"
    />
  </td>
</template>

<script>
import { filterFromMoney } from "@/utils/commonFunc";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["index"],

  computed: {
    ...mapGetters(["currentFavorService", "isFSOptionsOpen"]),
  },

  data() {
    return {
      activeRowFavor: -1,
    };
  },

  watch: {
    /**
     * Watch the change of current favorite food
     * Author: VQPhong (25/07/2022)
     */
    currentFavorService: {
      handler: function (value) {
        if (value.length) {
          // filter money
          if (value[this.index]) {
            this.currentFavorService[this.index].Surcharge = filterFromMoney(
              value[this.index].Surcharge
            );
          }
        }

        this.changeIsCurrentFavorChanging(true);
      },
      deep: true,
    },
  },

  methods: {
    /**
     * Author: VQPhong (09/08/2022)
     * Event for ACTIVE the row in content of favorite service
     */
    activeEvent() {
      this.activeRowFavor = this.index;
    },

    /**
     * Author: VQPhong (09/08/2022)
     * Event for DEACTIVE the row in content of favorite service
     */
    deactiveEvent() {
      this.activeRowFavor = -1;
    },

    /**
     * Author: VQPhong (10/08/2022)
     * If no surcharge => assign Surcharge = 0 when blur the input surcharge
     */
    blurEventMoney() {
      if (
        this.currentFavorService[this.index].Surcharge === null ||
        this.currentFavorService[this.index].Surcharge === ""
      ) {
        this.currentFavorService[this.index].Surcharge = 0;
      }
    },

    /**
     * Author: VQPhong (11/08/2022)
     * Event to open favorite service options
     */
    eventOpenFavorOption() {
      // Change coordinate of OptionFS
      let tempRect = this.$refs.flagCoordinateFS.getBoundingClientRect();

      this.changeCoordinateOptionFS({
        clientX: `${tempRect.x - 1}px`,
        clientY: `${tempRect.y > 388 ? tempRect.y - 310 : tempRect.y + 24}px`,
        indexOfRow: this.index,
      });

      // Open/Close OptionFS
      if (this.isFSOptionsOpen) {
        this.closeFSOptions();
      } else {
        this.openFSOptions();
      }
    },

    /**
     * Author: VQPhong (11/08/2022)
     * Event to open favorite service search forms
     */
    eventSearchFavor() {
      alert("Tính năng đang phát triển");
    },

    /**
     * Author: VQPhong (11/08/2022)
     * Event to open favorite service options
     */
    eventAddNewFavor() {
      this.openFavorServiceForm();
    },

    ...mapActions([
      "changeIsCurrentFavorChanging",
      "openFavorServiceForm",
      "changeCoordinateOptionFS",
      "openFSOptions",
      "closeFSOptions"
    ]),
  },
};
</script>

<style scoped>
td {
  border-collapse: collapse;
  padding: 0;
  border-bottom: 1px solid #c1c1c1;
}

.content {
  border-right: 1px solid #c1c1c1;
  width: 482px;
}

.surcharge {
  width: 241px;
}

.surcharge.flow {
  border-right: 1px solid #c1c1c1;
}

input {
  border: none;
  outline: none;
  padding: 5px 10px 4px 10px;
  width: calc(100% - 20px);
  font-size: 13px;
}

.surcharge input {
  text-align: right;
}

tr.even input,
tr.even div {
  background-color: #fafafa;
}

tr:hover input,
tr:hover div {
  background-color: #e2eff8;
}

tr:hover .active input {
  background-color: #fff;
}

.surcharge input:focus {
  border: 1px solid #0071c1;
  width: calc(100% - 22px);
  height: 14px;
  background-color: #fff;
  font-size: 12px;
}

.insideContent {
  display: flex;
}

.insideContent.active {
  border: 1px solid #0071c1;
  height: 22px;
}

.insideContent.active input {
  font-size: 12px;
}

.content .icon {
  background-repeat: no-repeat;
  background-color: #fff;
  width: 22px;
  display: table-cell;
  cursor: pointer;
  background-repeat: no-repeat;
  line-height: 0;
  white-space: nowrap;
}

.content input {
  width: calc(100% - 86px);
}

.content .icon.drop-down {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/trigger.png");
  background-position: 0 center;
}

.content .icon.search {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/images/form/search-trigger.png");
  background-position: -66px center;
}

.content .icon.search:hover,
.content .icon.drop-down:hover {
  background-position: -88px center;
}

.content .icon.add-trigger {
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/add-blue-icon.png");
  background-position: center center;
}
</style>