<template>
  <div style="padding: 20px">
    <el-table
      class="draggable-table"
      :data="tableData"
      row-key="id"
      border
      style="width: 100%"
      :key="numKey"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <!-- 其他列 -->
    </el-table>
    <draggable v-model="tableData" tag="ul" @end="onDragEnd">
      <li v-for="item in tableData" :key="item.id">
        {{ item.name }}
      </li>
    </draggable>
    <el-button @click="nowTableData">查看数据</el-button>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Sortable from "sortablejs";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      numKey:0,
      tableData: [
        { id: 1, date: "2016-05-01", name: "John" },
        { id: 2, date: "2016-05-02", name: "Doe" },
        { id: 3, date: "2016-05-03", name: "Jk" },
        { id: 4, date: "2016-05-04", name: "Dpl" },
        { id: 5, date: "2016-05-05", name: "Mas" },
        { id: 6, date: "2016-05-06", name: "Rf" },
        // 更多数据...
      ],
    };
  },
  mounted() {
    this.rowDrag();
  },
  methods: {
    onDragEnd(event) {
      // 拖拽结束后的逻辑处理，比如更新后端数据
      console.log("拖拽结束后的新数据:", this.tableData);
      // 这里可以调用API来更新后端数据
      // this.updateBackendData(this.tableData);
    },
    // 更新后端数据的示例方法（需根据实际情况实现）
    // updateBackendData(data) {
    //   axios.post('/api/update-table-data', { data }).then(response => {
    //     console.log('数据更新成功:', response);
    //   }).catch(error => {
    //     console.error('数据更新失败:', error);
    //   });
    // },
    rowDrag() {
      const el = document.querySelectorAll(
        ".draggable-table .el-table__body-wrapper > table > tbody"
      )[0];
      const vm = this;

      Sortable.create(el, {
        disabled: false, // 拖拽是否可用
        ghostClass: "sortable-ghost", //拖拽样式
        animation: 150, // 拖拽延时
        onEnd: function (e) {
          // 拖拽结束时触发
          let arr = vm.tableData;
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]); // 数据处理，获取最新的表格数据
          vm.$nextTick(function () {
            vm.tableData = arr;
            vm.numKey++;
          });
        },
      });
    },
    nowTableData() {
      console.log("新数据:", this.tableData);
    },
  },
};
</script>

