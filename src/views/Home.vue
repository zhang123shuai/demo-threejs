<template>
  <div class="home">
  <div class="left"><v-sideNavbar></v-sideNavbar></div>
  <div class="right">
    <router-view/>
  </div>
  </div>
</template>

<script>
import vSideNavbar from "@/components/sideNavbar.vue";
export default {
  name: 'Home',
  components: {vSideNavbar }
}
</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  .left{
    width: 200px;
  }
  .right{
    width: calc(100% - 200px);
  }
}
</style>
