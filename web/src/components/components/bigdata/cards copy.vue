<template>
  <div id="cards">
    <div
      class="card-item"
      v-for="(card, i) in cards"
      :key="card.title"
      >
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <div class="card-header-right">{{ '0' + (i + 1) }}</div>
      </div>
      <!-- <dv-charts class="ring-charts" :option="card.config" /> -->
      <div align="center">
        <!-- <q-chip>
        <q-avatar icon="bookmark" color="green" text-color="white" />
        工作正常
      </q-chip> -->
         <!-- <q-img
          :src="card.imgSrc"
          :ratio="16/9"
        /> -->
      <q-avatar square>
      <img :src="card.imgSrc">
    </q-avatar>
      </div>

      <dv-capsule-chart :config="card.config" class="ring-charts" />

      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">主板报警</div>
          <div class="footer-detail">
            <!-- <q-btn :color="card.boardAlarm" /> -->
            <q-btn :color="card.boardAlarm" />
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">气压报警</div>
          <div class="footer-detail">
            <q-btn :color="card.pressureAlarm" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <scroll-board />
    </div>
  </div>
</template>

<script>
import scrollBoard from './scrollBoard'
export default {
  name: 'Cards',
  components: {
    scrollBoard
  },
  data () {
    return {
      // cards: []
    }
  },

  mounted () {
    const timer = setInterval(() => {
      this.$store.dispatch('GetBigDataRealtimeData')
    }, 1000)

    // clear interval
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
  computed: {
    cards: {
      get: function () {
        console.log('--------cards----')
        const cards = this.$store.state.bigdata.cardList.map(function (item, index, arr) {
          const imgSrc = this.getAvatarString(item.imgSrc)
          const boardAlarm = this.getColor(item.boardAlarm)
          const pressureAlarm = this.getColor(item.pressureAlarm)
          return { title: item.title, imgSrc: imgSrc, config: item.config, boardAlarm: boardAlarm, pressureAlarm: pressureAlarm }
        }, this)
        console.log(cards)
        return cards
      }
    }
  },
  methods: {
    getAvatarString (str) {
      const http = 'http'
      const HTTP = 'HTTP'
      const isIncludeHttp = str.search(http) !== -1 || str.search(HTTP) !== -1
      // console.log('======isIncludeHttp======')
      // console.log(isIncludeHttp)
      if (isIncludeHttp) {
        return str
      } else {
        return require('@/statics' + str)
      }
    },
    getColor (val) {
      if (val === true) {
        return 'red'
      } else {
        return 'green'
      }
    }
  }
}
</script>

<style lang="less">
#cards {
  display: flex;
  justify-content: space-between;
  height: 65%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 19%;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    height: 15%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 18px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 20px;
      font-size: 40px;
      color: #03d3ec;
    }
  }

  .ring-charts {
    height: 35%;
  }

  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
      justify-content: center;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;
      justify-content: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>
