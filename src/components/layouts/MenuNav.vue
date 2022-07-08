<template>
  <div class="menu-item-list">
    <div
      v-for="(item, index) in listItems"
      :key="index"
      :class="{ tooltipItem: true, selected: item.selected }"
    >
      <div class="menu-item-content">
        <router-link
          :to="item.path"
          :class="{ menuItem: true, selected: item.selected }"
        >
          <div class="menu-item-icon">
            <div class="icon" :id="item.id"></div>
          </div>
          <div class="menu-item-title">{{ item.nameItem }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceCukcuk } from "@/utils/resourceCukcuk";
export default {
  data() {
    return {
      listItems: [
        {
          nameItem: resourceCukcuk.VI.menuList.menuFood,
          id: "menu-food",
          selected:
            this.$route.path === "/" || this.$route.path === "/menu-food",
          path: "/menu-food",
        },
      ],
    };
  },
};
</script>

<style scoped>
.menu-item-list {
  height: 100%;
  background-color: #0973b9;
}

.tooltipItem {
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.tooltipItem:hover {
  background-color: #eb7728;
}

.tooltipItem.selected {
  background-color: #0199fc;
}

.tooltipItem.selected:hover {
  background-color: #eb7728;
}

.menu-item-content {
  height: 100%;
}

.menuItem {
  text-decoration: none;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-item-title {
  font-size: 13px;
  color: #fff;
}

.menu-item-icon {
  width: 42px;
}

.menu-item-icon .icon {
  width: 24px;
  height: 24px;
  background-position: 0 1px;
  background-repeat: no-repeat;
  margin-left: 13px;
  margin-right: 5px;
}

.menu-item-icon .icon#menu-food {
  background-image: url('https://cdn2-new.cukcuk.vn/QLNH/resources/Image/vector-smart-object.png  ');
}
</style>