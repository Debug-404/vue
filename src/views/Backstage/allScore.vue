<template>
  <span>{{ cName }}</span>
  <el-table :data="tableData" height="250" style="width: 100%">
    <el-table-column label="学号" prop="id" width="180" />
    <el-table-column label="姓名" prop="name" width="180" />
    <el-table-column label="课程编号" prop="cid" width="180" />
    <el-table-column label="课程成绩" prop="gradeNumber" />
  </el-table>
  <div id="allScore" style="width: 400px;height: 500px"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAllStudentScore } from "@/utils";
import * as echarts from 'echarts';

const route = useRoute()
let cName = ref("")
let tableData = ref()

onMounted(async () => {
  const data = await getAllStudentScore(route.params.id)
  tableData.value = data["data"][1].map(val => {
    return {
      id: val[0],
      name: val[1],
      cid: val[2],
      gradeNumber: val[3]
    }
  })
  cName.value = data["data"][0]
  await allScoreImg(data["data"][1])
})

//绘图
const allScoreImg = async (val) => {
  const allScore = echarts.init(document.getElementById('allScore'));
  const colorList = ['#17C075', '#EB973F'];
  const success = val.filter(num => {
    return num[3] >= 60
  }).length
  const fail = val.filter(num => {
    return num[3] < 60
  }).length
  let data = [
    {
      value: success, name: '及格人数'
    },
    {
      value: fail, name: '不及格人数'
    },
  ];
  allScore.setOption({
    title: {
      text: '及格率\n占比',
      top: '30%',
      textAlign: 'center',
      left: '50%',
      textStyle: {
        color: ' #6A7474',
        fontSize: 32,
        fontWeight: '600',
        lineHeight: 60,
      },
      subtext: `${(success / (success + fail)) * 100}%`,
      subtextStyle: {
        color: '#021C25',
        fontSize: 32,
        fontWeight: '600',
        lineHeight: 60,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      bottom: '0%',
      left: '35%',
      textStyle: {
        fontSize: 14,
        color: 'black',
      },
      formatter: function (name) {
        const item = data.filter((item) => item.name === name)[0];
        return `${name}：${item.value}个`;
      },
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        itemStyle: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
        emphasis: {
          label: {
            show: true,
            position: 'outside',
            fontSize: '20',
            formatter: function (params) {
              let total = 0;
              for (let i = 0; i < data.length; i++) {
                total += data[i].value;
              }
              let percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== '') {
                return params.name + '\n' + params.value + '个' + '\n' + '占百分比：' + percent + '%';
              } else {
                return '';
              }
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  })
}

</script>

<style scoped></style>
