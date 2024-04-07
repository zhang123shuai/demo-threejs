<template>
  <div class="warp">
    <div class="shu_warp">
      <el-select
        v-model="value"
        clearable
        filterable
        placeholder="请选择"
        @change="bianhua()"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="shu_zt" ref="anchorRef" @scroll="handleScroll">
        <div>
          <p>第一个主题</p>
          <el-tree
            :data="dataOne"
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span :ref="`anchor-${data.id}`">{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
        <div>
          <p>第二个主题</p>
          <el-tree
            :data="dataTwo"
            node-key="id"
            :default-expanded-keys="[21, 31]"
            :default-checked-keys="[51]"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span :ref="`anchor-${data.id}`">{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <div class="youce"></div>
  </div>
</template>
   
  <script>
export default {
  components: {},
  data() {
    return {
      options: [
        {
          value: 1,
          label: "一级 2",
        },
        {
          value: 2,
          label: "二级 2-2",
        },
        {
          value: 3,
          label: "二级 2-1",
        },
        {
          value: 4,
          label: "三级 3-1-1",
        },
        {
          value: 5,
          label: "三级 3-1-2",
        },
        {
          value: 6,
          label: "三级 3-2-1",
        },
        {
          value: 7,
          label: "三级 3-2-2",
        },
        {
          value: 11,
          label: "一级 21",
        },
        {
          value: 21,
          label: "二级 2-21",
        },
        {
          value: 31,
          label: "二级 2-11",
        },
        {
          value: 41,
          label: "三级 3-1-11",
        },
        {
          value: 51,
          label: "三级 3-1-21",
        },
        {
          value: 61,
          label: "三级 3-2-11",
        },
        {
          value: 71,
          label: "三级 3-2-21",
        },
      ],
      value: "",
      dataOne: [
        {
          id: 1,
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1",
                },
                {
                  id: 5,
                  label: "三级 3-1-2",
                },
              ],
            },
            {
              id: 2,
              label: "二级 2-2",
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1",
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                },
              ],
            },
          ],
        },
      ],
      dataTwo: [
        {
          id: 11,
          label: "一级 21",
          children: [
            {
              id: 31,
              label: "二级 2-11",
              children: [
                {
                  id: 41,
                  label: "三级 3-1-11",
                },
                {
                  id: 51,
                  label: "三级 3-1-21",
                },
              ],
            },
            {
              id: 21,
              label: "二级 2-21",
              children: [
                {
                  id: 61,
                  label: "三级 3-2-11",
                },
                {
                  id: 71,
                  label: "三级 3-2-21",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    bianhua() {
      if (this.value) {
        console.log("anchor-" + this.value, this.value, "当前选择");
        this.$nextTick(() => {
          let selector = "anchor-" + this.value;
          this.$refs[selector].scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    handleScroll() {},
  },
};
</script>
<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100%;
  display: flex;
  .shu_warp {
    width: 500px;
    height: 100%;
    .shu_zt {
      overflow-y: auto;
      height: 150px;
      background-color: aqua;
    }
  }
  .youce {
    flex: 1;
    height: 100%;
    background-color: beige;
  }
}
</style>
   