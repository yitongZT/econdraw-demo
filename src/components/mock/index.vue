<template>
  <div class="s_mock">
    <div class="s_mock_header">
      <div>模拟数据改变</div>
      <div class="action">
        <span title="关闭" @click="handleClose">
          <i class="el-icon-close"></i>
        </span>
      </div>
    </div>
    <div class="s_mock_body">
      <div class="s_mock_add_row">
        <el-button class="s_mock_add" size="mini" type="primary" icon="el-icon-plus" @click="handleAdd"></el-button>
      </div>
      <el-form ref="formName" label-position="left">
        <el-form-item class="s_mock_form_item">
          <el-row :gutter="10" v-for="(item, index) in mockData" :key="index">
            <el-col :span="15">
              <el-input type="textarea" :rows="2" size="mini" v-model="item.TagName" placeholder="标签"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input size="mini" v-model="item.TagValue" placeholder="值"></el-input>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" type="danger"  icon="el-icon-minus" @click="handleSub(index)"></el-button>
            </el-col>
          </el-row>
        </el-form-item>
      <el-form-item class="s_mock_form_item">
        <el-button size="small" @click="handleClose">关 闭</el-button>
        <el-button size="small" type="primary" @click="handleMock">本地模拟</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemMock',
  data() {
    return {
      pushData: [],
      minimize: false,
      form: {},
      mockData: [
        {
          TagName: 'IPA03_04.Ia',
          TagValue: 12
        }
      ]
    }
  },
  mounted() {
    this.mockData = JSON.parse(localStorage.getItem('mock_data')) || [{ TagName: '',TagValue: null }]
  },
  methods: {
    handleMax() {
      const self = this
      self.minimize = false
    },
    handleMin() {
      const self = this
      self.minimize = true
    },
    handleClose() {
      const self = this
      self.resetForm();
      self.$emit('close')
    },
    handleAdd() {
      const self = this
      self.mockData.push({
        TagName: '',
        TagValue: null
      })
    },
    handleSub(index) {
      const self = this
      self.mockData.splice(index, 1)
    },
    handleMock() {
      //模拟数据
      const self = this
      self.$emit('change',self.mockData)
      localStorage.setItem('mock_data', JSON.stringify(self.mockData))
    },
    resetForm() {
      const self = this
      self.$refs['formName'].resetFields();
    }
  }
}
</script>

<style>
.s_mock {
  position: fixed;
  right: 0%;
  top: 50px;
  width: 400px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  user-select: none;
  z-index: 100;
}

.s_mock .s_mock_header {
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  justify-content: space-between;
}

.s_mock .s_mock_header > .title {
  user-select: none;
  text-align: center;
  color: #303133;
  font-size: 18px;
}

.s_mock .s_mock_header > .action {
  cursor: pointer;
}

.s_mock .s_mock_header > .action > span {
  padding: 3px 5px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.s_mock .s_mock_header > .action > span + span {
  margin-left: 10px;
}

.s_mock .s_mock_body {
  padding: 0 10px;
  max-height: 700px;
  overflow-y: auto;
}

.s_mock .s_mock_body .s_mock_add_row {
  text-align: right;
  padding-bottom: 10px;
}

.s_mock .s_mock_body .s_mock_form_item {
  text-align: right;
  margin-bottom: 10px;
}

.s_mock .s_mock_body .el-row {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.s_mock .s_mock_body .el-button--mini {
  padding: 5px 10px;
}

</style>
