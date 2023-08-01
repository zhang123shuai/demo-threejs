<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30px">
      <!-- 动态增删表单必填验证 
            1、:prop="`ruleDetails.${index}.column`" 注意属性前边不加ruleForm
            2、:rules="rules.column" 单独设置rules
          -->
      <el-row v-for="(item, index) in ruleForm.ruleDetails" :key="index">
        <!-- 连接符 -->
        <el-col style="min-height: 10px" :span="5">
          <el-form-item
            label=" "
            :prop="`ruleDetails.${index}.relation`"
            :rules="rules.relation"
            v-if="index >= 1"
          >
            <el-select v-model="item.relation" placeholder="请选择连接符">
              <el-option
                v-for="(itemYS, idx) in optionsLJF"
                :label="itemYS.label"
                :value="itemYS.value"
                :key="idx"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 字段 -->
        <el-col :span="5">
          <el-form-item
            label=" "
            :prop="`ruleDetails.${index}.column`"
            :rules="rules.column"
          >
            <el-select v-model="item.column" clearable placeholder="请选择字段">
              <el-option
                v-for="(itemYS, idx) in ziduanInforList"
                :label="itemYS.columnCode"
                :value="itemYS.columnCode"
                :key="idx"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 运算符 -->
        <el-col :span="5">
          <el-form-item
            label=" "
            :prop="`ruleDetails.${index}.logic`"
            :rules="rules.logic"
          >
            <el-select
              v-model="item.logic"
              clearable
              placeholder="请选择运算符"
            >
              <el-option
                v-for="(itemYS, idx) in optionsLJ"
                :label="itemYS.label"
                :value="itemYS.value"
                :key="idx"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 值 -->
        <el-col :span="5">
          <el-form-item
            label=" "
            :prop="`ruleDetails.${index}.condition`"
            :rules="rules.condition"
          >
            <el-input
              v-model="item.condition"
              placeholder="请输入区间值"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- +/- -->
        <el-col :span="4">
          <i
            v-if="index == 0"
            class="blue size-32 flex_r el-icon-circle-plus"
            @click="add"
          ></i>
          <i
            v-else
            class="red size-32 flex_r el-icon-remove"
            @click="del(index)"
          ></i>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
    <p>
      =========================================分界线=========================================
    </p>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" :sortable="true" :sort-method="sortByDate" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <p>
      =========================================分界线=========================================
    </p>
    <div class="divAfter"></div>
    =========================================分界线=========================================<br />
    拼接：<div v-html="htmlContent"></div>
    1111111<span style="color:red;">222222</span>333333
    =========================================分界线=========================================<br />

  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      //搜索值
      ruleForm: {
        ruleDetails: [
          {
            // 初始值一条
            column: "", //请选择字段
            logic: "", //请选择运算符
            condition: "", //请选择区间值
            relation: "", //请选择连接符
          },
        ],
      },
      //校验规则
      rules: {
        column: [
          {
            required: true,
            message: "请选择字段",
            trigger: ["blur", "change"],
          },
        ],
        logic: [
          {
            required: true,
            message: "请选择运算符",
            trigger: ["blur", "change"],
          },
        ],
        condition: [
          {
            required: true,
            message: "请选择区间值",
            trigger: ["blur", "change"],
          },
        ],
        relation: [
          {
            required: true,
            message: "请选择链接符",
            trigger: ["blur", "change"],
          },
        ],
      },
      //选择字段
      ziduanInforList: [
        {
          columnCode: "a",
        },
        {
          columnCode: "b",
        },
        {
          columnCode: "c",
        },
      ],
      //选择运算符
      optionsLJ: [
        {
          value: ">",
          label: "大于",
        },
        {
          value: "<",
          label: "小于",
        },
      ],
      //选择连接符
      optionsLJF: [
        {
          value: "and",
          label: "与",
        },
        {
          value: "or",
          label: "或",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎王",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎王小",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      //html拼接字段
      htmlContent:'',
      //字段List
      // contentLis:[
      //   {name:}
      // ],
    };
  },

  mounted() {
    this.htmlContentFun();
  },
  methods: {
    add() {
      this.ruleForm.ruleDetails.push({
        column: "",
        logic: "",
        condition: "",
        relation: "",
      });
    },
    del(index) {
      this.ruleForm.ruleDetails.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //排序
    sortByDate(obj1, obj2){
      let val1 = obj1.name.length;
      let val2 = obj2.name.length;
      return val2 - val1;
    },
    htmlContentFun(){
      this.htmlContent = '1111111<span style="color:red;">222222</span>333333';
    }
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  /deep/.el-table__row {
    .el-table__cell:not(:first-child)::after {
      content: "|";
      position: absolute;
      display: block;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.divAfter {
  width: 200px;
  height: 100px;
  background-color: antiquewhite;
  margin-left: 100px;
}
.divAfter::after {
  content: "";
  display: inline-block;
  border: 1px solid #000;
  height: 50px;
  margin: 25px 0 0 199px;
}
// .divAfter::before{
//   content:'|'
// }
</style>
  
  