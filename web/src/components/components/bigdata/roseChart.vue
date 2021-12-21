<template>
  <div id="rose-chart">
    <div class="rose-chart-title">累计计量</div>
    <dv-active-ring-chart :config="config" style="width:300px;height:300px" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        data: [
          {
            name: '收费站',
            value: 1315
          },
          {
            name: '监控中心',
            value: 415
          },
          {
            name: '道路外场',
            value: 90
          },
          {
            name: '其他',
            value: 317
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        lineWidth: 30,
        radius: '55%',
        activeRadius: '60%'
      }
    }
  }
}
</script>

<style lang="less">
#rose-chart {
  width: 20%;
  height: 100%;
  margin-left: 10px;

  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;

  .rose-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .dv-charts-container {
    height: calc(~"100% - 150px");
  }
}
</style>
