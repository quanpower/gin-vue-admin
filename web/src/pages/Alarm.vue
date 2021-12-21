<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          报警记录
        </div>
        <div class="text-subtitle2">
          选择下列条件，查询报警记录。
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <div class="q-gutter-md row">
        <!-- <DateTimeInput :date='startTime'></DateTimeInput> -->
        <DateTimeInput label="起始时间" @inputChanged="setStartTime"></DateTimeInput>
        <DateTimeInput label="结束时间" @inputChanged="setEndTime"></DateTimeInput>
        <q-space />
        <!-- <q-checkbox left-label v-model="export_report" color="teal" label="报表导出" /> -->
      </div>

      <q-separator></q-separator>  

      <div class="q-gutter-md row">
        <q-input dense filled v-model="PO" clearable clear-icon="close" label="生产订单号" />
        <q-input dense filled v-model="OP_Name" clearable clear-icon="close" label="工位" />

        <q-space />  
        <q-btn dense color="secondary" label="报警查询" @click="searchHistoryAlarm" />
      </div>

    </q-card>
    
    <AlarmReport :data=alarms />

  </q-page>
</template>



<script>


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


  function getCurrentTime() {
      const CURRENT_TIME = new Date().Format("yyyy-MM-dd HH:mm:ss")
      return CURRENT_TIME
  }

    export default {
        name: "Alarm",
        components: {
            AlarmReport: () =>  import('components/tables/AlarmReport'),
            DateTimeInput: () =>  import('components/time/DateTimeInput'),

        },

       
        data() {
            return {
                // startTime: getCurrentTime(),
                startTime: '',
                endTime: '',

                PO: '',
                OP_Name: '',
                export_report: false,

            }
        },
        mounted () {
          const payload = { production_order_id: 1 }
          // this.$store.dispatch('get_production_order', payload)
        },
        computed: {
          alarms: {
            get: function () {
              const alarmsTemp = this.$store.state.alarm.historyAlarms

              console.log('===alarmsTemp====')
              console.log(alarmsTemp)

              console.log(alarmsTemp)
              return alarmsTemp
            }
          }
        },

      methods:{
        searchHistoryAlarm() {
          const payload = {
            startTime: this.startTime,
            endTime: this.endTime,
            production_order_name: this.PO,
            operation_name: this.OP_Name,
            export_report: this.export_report,
          }
          this.$store.dispatch('searchHistoryAlarm', payload)
        },

        setStartTime(data){
          this.startTime = data
        },
        setEndTime(data){
          this.endTime = data
        }
      }


    }
</script>

<style scoped>

</style>
