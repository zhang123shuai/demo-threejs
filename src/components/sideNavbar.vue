<template>
  <div class="sidebar_warp">
    <el-menu
      class="el-menu-vertical-demo"
      router
      unique-opened
      :default-openeds="defaultOpeneds"
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <template v-for="item in routerListAll" v-cloak>
        <!-- 判断第一层是否有孩子 -->
        <template v-if="item.children && item.children.length !== 0">
          <el-submenu :index="item.path" :key="item.meta.title">
            <!-- 第一层路由名字 -->
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-for="itemTwo in item.children" v-cloak>
              <!-- 判断第二层是否有孩子 -->
              <template
                v-if="itemTwo.children && itemTwo.children.length !== 0"
              >
                <el-submenu :index="itemTwo.path" :key="itemTwo.meta.title">
                  <!-- 第二层路由名字 -->
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span slot="title">{{ itemTwo.meta.title }}</span>
                  </template>
                  <!-- 第三层路由出 -->
                  <el-menu-item
                    v-for="(subItem, i) in itemTwo.children"
                    :key="i"
                    :index="subItem.path"
                  >
                    <!-- 第三层路由名字 -->
                    <!-- <i class="el-icon-location"></i> -->
                    <span slot="title">{{ subItem.meta.title }}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
              <!-- 第二层无孩子 -->
              <template v-else>
                <el-menu-item :index="itemTwo.path" :key="itemTwo.meta.title">
                  <span slot="title">{{ itemTwo.meta.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <!-- 第一层无孩子 -->
        <template v-else>
          <el-menu-item :index="item.path" :key="item.meta.title">
            <!-- <i class="el-icon-location"></i> -->
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerListAll: [],
      defaultOpeneds: [],
    };
  },
  mounted() {
    this.routerListAll = this.$router.options.routes[0].children;
  },
  methods: {
    // 选择首页的时候把打开的都关上
    handleSelect(key, keyPath) {
      if (key == "/home") {
        this.defaultOpeneds = [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar_warp {
  width: 100%;
  height: 100%;
  /deep/.el-menu {
    height: 100%;
    .el-menu--inline {
      overflow: hidden;
    }
    .el-menu-item{
      line-height: 30px;
      height: 30px;
    }
  }
}
</style>