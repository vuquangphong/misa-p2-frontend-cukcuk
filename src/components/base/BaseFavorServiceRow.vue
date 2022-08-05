<template>
  <td class="content">
    <input type="text" v-model="currentFavorService[index].Content" />
  </td>
  <td
    :class="{
      surcharge: true,
      flow: currentFavorService.length >= 8,
    }"
  >
    <input type="text" v-model="currentFavorService[index].Surcharge" />
  </td>
</template>

<script>
import { filterFromMoney } from "@/utils/commonFunc";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["index"],

  computed: {
    ...mapGetters(["currentFavorService"]),
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
          if (value[this.index].Surcharge) {
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
    ...mapActions(["changeIsCurrentFavorChanging"]),
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

tr.even input {
  background-color: #fafafa;
}

input:focus {
  border: 1px solid #0071c1;
  width: calc(100% - 22px);
  height: 14px;
  background-color: #fff;
  font-size: 12px;
}
</style>