<template>
  <div class="yitong_wrap">
    <div class="yitong_head">
      <div>
        <el-button size="mini" type="primary" @click="handleImport"
          >导入图纸</el-button
        >
      </div>
      <div>
        <el-button size="mini" type="primary" @click="handleAction('zoomIn')"
          >放大</el-button
        >
        <el-button size="mini" type="primary" @click="handleAction('zoomOut')"
          >缩小</el-button
        >
        <el-button size="mini" type="primary" @click="handleAction('fitView')"
          >适应</el-button
        >
        <el-button size="mini" type="primary" @click="handleAction('reset')"
          >重置</el-button
        >
      </div>
      <div>
        <el-button size="mini" type="primary" @click="initResData"
          >模拟获取数据</el-button
        >
        <el-button size="mini" type="warning" @click="openMock"
          >模拟数据改变</el-button
        >
      </div>
    </div>
    <div class="yitong_content">
      <ul class="yitong_content_left">
        <li class="yitong_content_item" v-for="(item, index) in pageList" :key="index">
          <span>{{item.name}}</span>
          <el-button type="primary" size="mini" @click="handleOpenPage(item)"
          >打开图纸</el-button
        >
        </li>
      </ul>
      <div class="yitong_content_right">
        <econ-draw
          v-if="graphFlag"
          ref="econDraw"
          :graph="graphData"
          :originData="originData"
          :pushData="pushData"
          @event="handleClick"
        ></econ-draw>
      </div>

    </div>
    <item-mock v-show="mockFlag" @close="closeMock"  @change="changeMock"></item-mock>
  </div>
</template>

<script>
import axios from "axios";
import itemMock from './mock'
export default {
  name: "HelloWorld",
  components: {
    itemMock
  },
  data() {
    return {
      graphFlag: false,
      graphData: "",
      originData: [],
      pushData: [],

      urlData: [],

      mockFlag: false,

      pageList: [
        {
          name: '弹窗调用图纸',
          url: '/static/econJson/弹窗主页面.json'
        },
        {
          name: '电力柜图纸',
          url: '/static/econJson/电力柜.json'
        }
      ]
    };
  },
  mounted() {

  },
  methods: {
    handleClick(data, object) {
      // data 当前图元的全部数据
      // object 当前动作的数据
      console.log(data, object);
    },
    handleAction(type) {
      switch (type) {
        case "zoomIn":
          this.$refs["econDraw"].handleZoomIn();
          break;
        case "zoomOut":
          this.$refs["econDraw"].handleZoomOut();
          break;
        case "fitView":
          this.$refs["econDraw"].handleFitView();
          break;
        case "reset":
          this.$refs["econDraw"].handleReset();
          break;
      }
    },
    handleImport() {
      let self = this;
      self.graphData = "";
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = (event) => {
        const elem = event.target;
        if (elem.files && elem.files[0]) {
          if (elem.files[0].name.indexOf(".json") > 0) {
            self.openJson(elem.files[0]);
          }
        }
      };
      input.click();
    },
    // 读取json
    openJson(file) {
      let self = this;
      self.graphFlag = false;
      const reader = new FileReader();
      reader.onload = () => {
        setTimeout(() => {
          self.graphData = reader.result;
          self.graphFlag = true;
          self.initResData()
        }, 10);
      };
      reader.readAsText(file);
    },
    handleOpenPage(row) {
      let self = this;
      self.graphFlag = false;
      axios({
        methods: 'GET',
        url: row.url,
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      }).then(res => {
        const resData = res.data
        self.graphData = JSON.stringify(resData);
        self.graphFlag = true;
        self.initResData()
      })
    },
    // 获取数据
    initResData() {
      let self = this;
      var devArray = ['IPB01', 'I_IIPB', 'IPB03_01', 'IPB03_02', 'IPB03_03', 'IPB03_04']
      var pointArray = ['On', 'Fault',
      'Ia',
      'Ib',
      'Ic',
      'Uab',
      'Ubc',
      'Uca',
      'PF',
      'P',
      'Ep',
      ]
      const resData = []
      function random (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
      devArray.forEach(dev => {
        pointArray.forEach(point => {
          let TagValue = random(10, 85)
          switch (point) {
            case 'On':
              TagValue = 1
              break
            case 'Fault':
              TagValue = 0
              break
          }
          resData.push({
            TagName: `${dev}.${point}`,
            TagValue: TagValue,
            Des: `${dev}|设备|${point}`,
            DevName: `${dev}|设备`
          })
        })
      })
      setTimeout(() => {
        self.originData = resData
      }, 1000);
    },
    // 修改数据弹窗
    openMock() {
      const self = this
      self.mockFlag = true
    },
    closeMock() {
      const self = this
      self.mockFlag = false
    },
    changeMock(data) {
      const self = this
      self.pushData = JSON.parse(JSON.stringify(data))
    },
  },
};
</script>

<style >
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.yitong_wrap {
  height: 100%;
  width: 100%;
}
.yitong_head {
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.yitong_content {
  height: calc(100vh - 65px);
  width: 100%;
  overflow: hidden;
  display: flex;
}
.yitong_content_left{
  list-style: none;
  margin: 0;
  padding: 10px 20px;
  width: 220px;
  border-right: 1px solid #ccc;
}
.yitong_content_item{
  padding: 5px;
  display: flex;
  justify-content: space-between;
}
.yitong_content_right{
  flex: 1;
  height: 100%;
}

</style>
