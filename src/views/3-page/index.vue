<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30px">
      <!-- 动态增删表单必填验证 
            1、:prop="`ruleDetails.${index}.column`" 注意属性前边不加ruleForm
            2、:rules="rules.column" 单独设置rules
          -->
      <el-row v-for="(item, index) in ruleForm.ruleDetails" :key="index">
        <!-- 连接符 -->
        <el-col style="min-height: 10px;" :span="5">
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
    };
  },

  mounted() {},
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
  },
};
</script>
  
  