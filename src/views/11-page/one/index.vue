<template>
  <div class="warp">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="[5]"
      :props="defaultProps"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {},
  methods: {},
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.warp {
  //鼠标悬停的备降色
  /deep/ .el-tree-node__content:hover {
    background: #1e374f;
  }

  //选中的背景色
  /deep/.el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #1e374f;
  }

  //整体背景色
  /deep/.el-tree {
    background: #00162a;
    color: #ffffff;
  }
  //点击时背景色
  /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: red;
  }
}
</style>

