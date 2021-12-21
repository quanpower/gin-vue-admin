<template>
  <div id="water-level-chart" class="row">
    <div>
      <div class="chart-container">
        <dv-water-level-pond :config="config" />
        <!-- <dv-decoration-9 style="width:150px;height:150px;">566</dv-decoration-9> -->
      </div>
    </div>
    <div class="col-6">
      <div class="water-level-chart-title">开机时间</div>
      <div class="water-level-chart-details">
        累计<span>{{totalTime}}</span>h
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WaterLevelChart',
  data () {
    return {
      config: {
        data: [95],
        shape: 'round',
        waveHeight: 25,
        waveNum: 2
      }
    }
  },
  computed: {
    totalTime: {
      get: function () {
        console.log('--------totalTime----')
        const totalTime = this.$store.state.bigdata.totalTime
        console.log(totalTime)
        return totalTime
      }
    }
  }
}
</script>

<style lang="less">
#water-level-chart {
  width: 30%;
  box-sizing: border-box;
  margin-left: 10px;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;

  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }

  .water-level-chart-details {
    height: 50%;
    display: flex;
    justify-content: center;
    font-size: 17px;
    align-items: flex-end;

    span {
      font-size: 35px;
      font-weight: bold;
      color: #58a1ff;
      margin: 0 5px;
      margin-bottom: -5px;
    }
  }

  .chart-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: left;
  }

  .dv-water-pond-level {
    max-width: 90%;
    width: 150px;
    height: 150px;
    border: 10px solid #19c3eb;
    border-radius: 50%;

    ellipse {
      stroke: transparent !important;
    }

    text {
      font-size: 40px;
    }
  }
}
</style>
