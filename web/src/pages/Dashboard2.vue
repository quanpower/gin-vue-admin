<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right" />

    <q-card class="q-mt-sm">

      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">日产量</div>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section class="row">
        
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="blue" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold">4321</q-item-label>
                  <q-item-label caption>Fashions</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="grey-8" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey-8 text-bold">9876</q-item-label>
                  <q-item-label caption>Electronics</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="green-6" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-6 text-bold">345</q-item-label>
                  <q-item-label caption>Toys</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="orange-8" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold">1021</q-item-label>
                  <q-item-label caption>Vouchers</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          
          <div>
            <IEcharts style="height: 350px" :option="getSalesOptions" :resizable="true" />
          </div>
        </div>

        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="fas fa-gift" class="q-pl-md" size="24px" />
            </q-item-section>

            <q-item-section>
              <div class="text-h6">今日生产</div>
            </q-item-section>
          </q-item>
          <div>
            <IEcharts style="height: 350px" :option="getPieOptions" :resizable="true" />
          </div>
        </div>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js"
import moment from 'moment'

  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  // 例子： 
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "H+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }
 

  // 调用： 
  // var date1 = new Date().Format("yyyy-MM-dd");
  // var date2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
  function getStartTime() {
      var now = new Date()
      now.setHours(0, 0, 0, 0)
      var stime = now.format("yyyy-MM-dd HH:mm:ss");//一个小时前的时间    
      return stime
  }


  function getCurrentTime() {

      // const nowTimeDate = new Date(time)
      // return nowTimeDate.setHours(23, 59, 59, 999)
      const CURRENT_TIME = new Date().Format("yyyy_MM_dd_HH_mm_ss")
      return CURRENT_TIME
  }

export default {
  name: "Dashboard2",
  components: {
    IEcharts,
    CardSocial: () => import("components/cards/CardSocial")
  },
  data() {
    return {
      slide: 1,
    };
  },
  mounted() {
    if (this.timer){
      clearInterval(this.timer)
    }else{
      this.timer = setInterval(() => {this.searchProductionOrderCount()}, 60000)
    }
  },
  computed: {
    getSalesOptions() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ['0', '1', '2','3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "产量",
            type: "bar",
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29],
            color: "#546bfa"
          },
         
        ]
      };
    },
    getPieOptions() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["Fashions", "Electronics", "Toys", "Vouchers"]
        },
        series: [
          {
            name: "桥型",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 335,
                name: "Fashions",
                itemStyle: {
                  color: "#546bfa"
                }
              },
              {
                value: 310,
                name: "Electronics",
                itemStyle: {
                  color: "#3a9688"
                }
              },
              {
                value: 234,
                name: "Toys",
                itemStyle: {
                  color: "#02a9f4"
                }
              },
              {
                value: 135,
                name: "Vouchers",
                itemStyle: {
                  color: "#f88c2b"
                }
              }
            ]
          }
        ]
      };
    }
  },
  methods: {
    getColor(val) {
      if (val > 70 && val <= 100) {
        return "green";
      } else if (val > 50 && val <= 70) {
        return "blue";
      }
      return "red";
    },
    getChipColor(status) {
      if (status == "Canceled") {
        return "negative";
      } else if (status == "Sent") {
        return "positive";
      } else if (status == "Pending") {
        return "warning";
      } else if (status == "Paid") {
        return "info";
      } else {
        return "dark";
      }
    },
    searchProductionOrderCount() {
      const payload = {
        // startTime: getStartTime(),
        // endTime: getCurrentTime(),
        // startTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime())).valueOf(),
        startTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime())).format(),//当日零点
        endTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)).format(),//当日23:59        
      }
      console.log(payload)
      this.$store.dispatch('searchProductionOrderCount', payload)
    },      
  },
  destroyed () {
      // 销毁监听
    clearInterval(this.timer)
  },  
};
</script>

<style scoped></style>
