<template>
  <div id="sys-info" >
      <div class="info-title">
      设备信息
    </div>
      <div class="info-body row">
        <div class="col-4">
            <q-list bordered dense>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar color="teal" size="24px" text-color="white" icon="place" />
                </q-item-section>

                <q-item-section>设备位置:</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar color="primary" size="24px" text-color="white" icon="timer" />
                </q-item-section>

                <q-item-section>开机时间:</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar rounded color="purple" size="24px" text-color="white" icon="av_timer" />
                </q-item-section>

                <q-item-section>累计时间:</q-item-section>
            </q-item>
            </q-list>

        </div>
        <div class="col-5">
            <q-list dense bordered >
        <q-item clickable v-ripple>
            <q-item-section>
            上海嘉定
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section>
            2021-10-11 09:05:00
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section>
            {{totalTime}}
            </q-item-section>
        </q-item>
        </q-list>
        </div>
    <div class="col-3">
      <div class="water-level-chart-details">
        <span>{{current_time}}</span>
        <!-- <div><span>07-01</span></div> -->
      </div>
    </div>
</div>
  </div>
</template>

<script>

function getNowFormatDate () {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var hours = date.getHours()
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours
  }
  var minutes = date.getMinutes()
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  var seconds = date.getSeconds()
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  var currentdate = hours + seperator2 + minutes + seperator2 + seconds
  return currentdate
}

function GetDate (format) {
  /**
     * format=1表示获取年月日
     * format=0表示获取年月日时分秒
     * **/
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var day = now.getDay()// 得到周几
  var hour = now.getHours()// 得到小时
  var minu = now.getMinutes()// 得到分钟
  var sec = now.getSeconds()// 得到秒
  console.log(format)
  // if (format == 1) {
  //   const _time = year + '-' + month + '-' + date
  // } else if (format == 2) {
  //   const _time = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec
  // } else if (format == 3) {
  //   const _time = hour + ':' + minu + ':' + sec
  // }
  const _time = hour + ':' + minu + ':' + sec
  return _time
}

export default {
  name: 'SysInfo',
  data () {
    return {
      config: {
        data: [45],
        shape: 'round',
        waveHeight: 25,
        waveNum: 2
      },
      current_time: '12:00:00'
    }
  },
  mounted () {
    const timer = setInterval(() => {
      this.getTime()
      this.$store.dispatch('GetTotalTime')
    }, 1000)

    // clear interval
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
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
  },
  methods: {
    getTime () {
      this.current_time = getNowFormatDate()
      // this.current_time = '12:00:00'
    }

  }
}
</script>

<style lang="less">
#sys-info {
  width: 35%;
  box-sizing: border-box;
  margin-left: 20px;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;
  .info-title{
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
    }
    .info-body{
        height: 70%;

  .water-level-chart-details {
    height: 50%;
    display: flex;
    justify-content: center;
    font-size: 17px;
    align-items: flex-end;

    span {
      font-size: 25px;
      font-weight: bold;
      color: #58a1ff;
      margin: 0 5px;
      margin-bottom: -5px;
    }
  }

    }

}
</style>
