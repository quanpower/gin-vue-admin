<template>
  <q-page class="q-pa-sm bg-white">
    <q-calendar
      v-model="selectedDate"
      view="month"
      locale="en-us"
      :day-height="150"
      @click:day2="showDialog"
    >
    
    <!-- showDialog 点击日期放大 -->

      <template #week="{ week, weekdays }">
        <template>
          <template v-for="(computedEvent, index) in getWeekEvents(week, weekdays)">
            <q-badge
              :key="index"
              class="q-row-event"
              :class="badgeClasses(computedEvent, 'day')"
              :style="badgeStyles(computedEvent, 'day', week.length)"
            >
              <template v-if="computedEvent.event">
                <!-- <q-icon :name="computedEvent.event.icon" class="q-mr-xs"></q-icon> -->
                <span class="ellipsis">{{ computedEvent.event.title }}</span>
              </template>
            </q-badge>
          </template>
        </template>
      </template>
    </q-calendar>

    <q-separator></q-separator>  
    
    <div class="q-gutter-md row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-uploader
                label="工单上传"
                :url="getUrl"
                field-name='file'
                auto-upload
                extensions=".txt,.gif,.jpg,.jpeg,.png"
                @added="file_selected"
                @uploaded="uploaded"
                @failed="failed"
                multiple
            />

        </div>

    </div>
  </q-page>
</template>

<script>// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'
import axios from 'axios'

const CURRENT_DAY = new Date()


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


function getCurrentDay(day) {
    const newDay = new Date(CURRENT_DAY)
    newDay.setDate(day)
    const tm = QCalendar.parseDate(newDay)
    return tm.date
}



// var d = now.getDate() //当天
// var firstDay = new Date(nowYear,nowMonth,1)  // 本月开始时间
// var LastDay = new Date(nowYear, nowMonth+1,0); // 本月结束时间
// var toDay = new Date(nowYear,nowMonth,d) // 本月今天
//如果想获取本月第一天00：00和最后一天23：59
// var toDay = new Date(nowYear, nowMonth, d, 23,59,59); // 获取今天23时:59分:59秒

const now = new Date() // 当前日期
const nowYear = now.getFullYear() //当前年
const nowMonth = now.getMonth() //当前月 （值为0~11）
const FirstDay = new Date(nowYear,nowMonth,1,0,0).Format("yyyy-MM-dd HH:mm:ss")
const LastDay = new Date(nowYear,nowMonth+1,0,23,59).Format("yyyy-MM-dd HH:mm:ss")


export default {
    name: 'Calendar',

    data() {
        return {
            selectedDate: '',
            selected_file:'',
            wsl_host: this.$store.state.app.wsl_host,
          
        }
    },
    mounted(){
        this.getWorkOrder()
        
    },

    methods: {

        getWorkOrder() {
            const payload = {
                startTime: FirstDay,
                endTime: LastDay,
            }

            console.log(payload)
            this.$store.dispatch('get_work_order', payload)
        },

        isCssColor(color) {
            return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
        },

        badgeClasses(infoEvent, type) {
            const color = infoEvent.event !== void 0 ? infoEvent.event.color : 'transparent'
            const cssColor = this.isCssColor(color)
            const isHeader = type === 'header'

            return {
                [`text-white bg-${color}`]: !cssColor,
                'full-width': !isHeader && (!infoEvent.side || infoEvent.side === 'full'),
                'left-side': !isHeader && infoEvent.side === 'left',
                'right-side': !isHeader && infoEvent.side === 'right',
                'cursor-pointer': infoEvent.event !== void 0,
                'event-void': infoEvent.event === void 0 // height: 0, padding: 0
            }
        },

        badgeStyles(infoEvent, type, weekLength, timeStartPos, timeDurationHeight) {
            const s = {}
            if (timeStartPos) {
                s.top = timeStartPos(infoEvent.event.time) + 'px'
            }
            if (timeDurationHeight) {
                s.height = timeDurationHeight(infoEvent.event.duration) + 'px'
            }
            if (infoEvent.size !== void 0) {
                s.width = ((100 / weekLength) * infoEvent.size) + '% !important'
            }
            // s['align-items'] = 'flex-start'
            return s
        },

        getWeekEvents(week, weekdays) {
            const tsFirstDay = QCalendar.parsed(week[0].date + ' 00:00')
            const tsLastDay = QCalendar.parsed(week[week.length - 1].date + ' 23:59')
            const firstDay = QCalendar.getDayIdentifier(tsFirstDay)
            const lastDay = QCalendar.getDayIdentifier(tsLastDay)

            const eventsWeek = []
            this.events.forEach((event, id) => {
                const tsStartDate = QCalendar.parsed(event.start + ' 00:00')
                const tsEndDate = QCalendar.parsed(event.end + ' 23:59')
                const startDate = QCalendar.getDayIdentifier(tsStartDate)
                const endDate = QCalendar.getDayIdentifier(tsEndDate)

                if (this.isBetweenDatesWeek(startDate, endDate, firstDay, lastDay)) {
                    const left = QCalendar.daysBetween(tsFirstDay, tsStartDate, true)
                    const right = QCalendar.daysBetween(tsEndDate, tsLastDay, true)

                    eventsWeek.push({
                        id, // index event
                        left, // Position initial day [0-6]
                        right, // Number days available
                        size: week.length - (left + right), // Size current event (in days)
                        event // Info
                    })
                }
            })

            const events = []
            if (eventsWeek.length > 0) {
                const infoWeek = eventsWeek.sort((a, b) => a.left - b.left)
                infoWeek.forEach((event, i) => {
                    this.insertEvent(events, week.length, infoWeek, i, 0, 0)
                })
            }

            return events
        },

        insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
            const iEvent = infoWeek[index]
            if (iEvent !== void 0 && iEvent.left >= availableDays) {
                // If you have space available, more events are placed
                if (iEvent.left - availableDays) {
                    // It is filled with empty events
                    events.push({size: iEvent.left - availableDays})
                }
                // The event is built
                events.push({size: iEvent.size, event: iEvent.event})

                if (level !== 0) {
                    // If it goes into recursion, then the item is deleted
                    infoWeek.splice(index, 1)
                }

                const currentAvailableDays = iEvent.left + iEvent.size

                if (currentAvailableDays < weekLength) {
                    const indexNextEvent = QCalendar.indexOf(infoWeek, e => e.id !== iEvent.id && e.left >= currentAvailableDays)

                    this.insertEvent(
                        events,
                        weekLength,
                        infoWeek,
                        indexNextEvent !== -1 ? indexNextEvent : index,
                        currentAvailableDays,
                        level + 1
                    )
                } // else: There are no more days available, end of iteration
            } else {
                events.push({size: weekLength - availableDays})
                // end of iteration
            }
        },

        isBetweenDates(date, start, end) {
            return date >= start && date <= end
        },

        isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
            return (
                (dateEnd < weekEnd && dateEnd >= weekStart) ||
                dateEnd === weekEnd ||
                (dateEnd > weekEnd && dateStart <= weekEnd)
            )
        },

        getUrl () {
            return 'http://' + this.wsl_host + ':8010/api/v1/upload/file'
        },

        file_selected(files) {
            this.selected_file = files[0];
            console.log('====this.selected_file===')
            console.log(this.selected_file)
            this.check_if_document_upload=true
        },

        uploaded(info) {
            console.log(info)

            this.$q.notify({
                message: '提交成功！',
                color: 'green'
            })
            // 提交成功，重新获取刷新一次
            this.getWorkOrder()

        },

        failed(info) {
            console.log(info)

            this.$q.notify({
                message: '提交失败！' + info,
                color: 'red'
            })            
        },

        uploadFile(){
            let fd = new FormData();
            fd.append("file", this.selected_file);
            axios.post(`http://xxx:8010/api/v1/upload/file`, fd, {
            headers: { 'Content-Type': undefined},
            }).then(function (response) {
                if (response.data.ok) {
                }
            }.bind(this));

        },

        showDialog(data){
            console.log(data)
        }

    },
  computed: {
    form_fields: {
      get: function () {
        console.log('---form_fields----')
        const form_wrapper = [{name: 'file', value: this.selected_file}]
        console.log(form_wrapper)
        return form_wrapper
      }
    },

    events: {
      get: function () {
        const month_work_order = this.$store.state.work_order.month_work_orders

        console.log('---month_work_order----')
        console.log(month_work_order)

        const eventList = month_work_order.map(item => {
            // 获取当前日
            const dayStr = item.create_time
            console.log(dayStr)
            // const myDate =new Date(Date.parse(dayStr.replace(/-/g, "/")))
            const myDate =new Date(Date.parse(dayStr))
            const currentDay = myDate.getDate()
            // console.log(myDate)
            // console.log("获取当前日(1-31)：" + currentDay)      //获取当前日(1-31)
            // console.log(typeof(currentDay))

            const status = item.status

            let color = ''

            if (status == 0){
                color = 'green'
            }
            else if(status == 1){
                color = 'teal'
            }
            else if(status == 2){
                color = 'blue'
            }
            else if(status == 3){
                color = 'grey'
            }
            else if(status == 4){
                color = 'warning'
            }            
            else if(status == -1){
                color = 'red'
            }

            return {
                title: item.work_order_name,
                color: color,
                start: getCurrentDay(currentDay),
                end: getCurrentDay(currentDay),
                // icon: 'alarm'
            }
        })

        return eventList
      }
    },
    
  },

}
</script>

<style scoped>

</style>
