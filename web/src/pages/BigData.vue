<template>
  <div id="data-view">
    <dv-full-screen-container>

      <top-header />

      <div class="main-content">
        <!-- <digital-flop /> -->

          <div class="block-top-bottom-content">
            <div class="block-top-content">

              <water-level-chart />
              <!-- <rose-chart /> -->
              <Top-right-Cmp />
              <!-- <dv-border-box-11 title="dv-border-box-11">dv-border-box-11</dv-border-box-11> -->
              <sysInfo />
            </div>

            <cards />
          </div>

      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from '@/components/bigdata/topHeader'
import digitalFlop from '@/components/bigdata/digitalFlop'
import rankingBoard from '@/components/bigdata/rankingBoard'
import roseChart from '@/components/bigdata/roseChart'
import waterLevelChart from '@/components/bigdata/waterLevelChart'
import scrollBoard from '@/components/bigdata/scrollBoard'
import sysInfo from '@/components/bigdata/sysInfo2'
import cards from '@/components/bigdata/cards2'
import CenterCmp from '@/components/bigdata/CenterCmp'
import TopRightCmp from '@/components/bigdata/TopRightCmp'
import RightChart1 from '@/components/bigdata/RightChart1'

export default {
  name: 'DataView',
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards,
    CenterCmp,
    TopRightCmp,
    RightChart1,
    sysInfo
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    // background-image: url('@/components/bigdata/img/bg.png');
    background-image: url('./bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 30%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
