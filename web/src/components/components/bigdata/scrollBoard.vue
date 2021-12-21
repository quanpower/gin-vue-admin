<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',
  data () {
    return {
      config: {
        header: ['时间', '报警信息'],
        data: [
          ['2021-10-11 19:25:00', '前门打开'],
          ['2021-10-12 17:25:00', '气压不足'],
          ['2021-10-13 16:25:00', '前门打开'],
          ['2021-10-14 15:25:00', '急停'],
          ['2021-10-15 14:25:00', '气压不足'],
          ['2021-10-11 19:25:00', '前门打开'],
          ['2021-10-12 17:25:00', '气压不足'],
          ['2021-10-13 16:25:00', '前门打开'],
          ['2021-10-13 15:25:00', '急停'],
          ['2021-10-13 14:25:00', '气压不足']
        ],
        index: true,
        columnWidth: [50, 150, 70],
        align: ['center'],
        rowNum: 8,
        headerBGC: '#1981f6',
        headerHeight: 45,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 95%;
  box-sizing: border-box;
  margin-left: 10px;
  height: 100%;
  overflow: hidden;
}
</style>
