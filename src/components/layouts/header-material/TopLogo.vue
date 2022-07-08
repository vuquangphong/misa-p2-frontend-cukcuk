<template>
  <div class="container-logo">
    <div class="logo-pull-left">
      <table>
        <tbody>
          <tr>
            <td style="width: 36px">
              <router-link to="/">
                <div class="icon-left-header"></div>
              </router-link>
            </td>
            <td>
              <router-link to="/">
                <div class="text-left-header"></div>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-logo {
  width: 232px;
  margin: 0px;
  height: 55px;
  right: auto;
  left: 0px;
  top: 0px;
}

.logo-pull-left {
  width: 230px;
  height: 100%;
  background-color: #0973b9 !important;
  margin: 0;
}

table {
  width: 100%;
  height: 100%;
}

td .icon-left-header {
  cursor: pointer;
  margin-left: 12px;
  width: 24px;
  margin-top: 4px;
  height: 24px;
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/icon-left-header.png");
}

td .text-left-header {
  cursor: pointer;
  width: 100%;
  height: 30px;
  background-image: url("https://cdn2-new.cukcuk.vn/QLNH/resources/Image/logo-text.png");
  background-repeat: no-repeat;
  background-position: 2px center;
}
</style>
