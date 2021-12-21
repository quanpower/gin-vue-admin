<template>
  <q-page class="bg-white">
    <OrderProgress :waiting="today_work_orders" :producing="producing_work_order" class="q-mt-lg"></OrderProgress>
    <HistoryWorkOrder :data="history_work_orders" class="q-mt-lg"></HistoryWorkOrder>
  </q-page>
</template>

<script>


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
        name: "TaskBoard",

        components: {
          OrderProgress: () => import('components/task/OrderProgress'),
          HistoryWorkOrder: () => import('components/task/HistoryWorkOrder'),
        },

        data() {
          return {
            
            };
        },
        mounted(){
          const now = new Date() // 当前日期
          const d = now.getDate() //当天
          const nowYear = now.getFullYear() //当前年
          const nowMonth = now.getMonth() //当前月 （值为0~11）
          // const firstDay = new Date(nowYear,nowMonth,1)  // 本月开始时间
          // const LastDay = new Date(nowYear, nowMonth+1,0); // 本月结束时间
          // const toDay = new Date(nowYear,nowMonth,d) // 本月今天
          //如果想获取本月第一天00：00和最后一天23：59
          const toDay1 = new Date(nowYear, nowMonth, d, 0,0,0).Format("yyyy-MM-dd HH:mm:ss"); // 获取今天23时:59分:59秒
          const toDay2 = new Date(nowYear, nowMonth, d, 23,59,59).Format("yyyy-MM-dd HH:mm:ss"); // 获取今天23时:59分:59秒

          console.log('===toDay==')
          console.log(toDay1)
          console.log(toDay2)

          const today_payload = {
              status: 1,
          }

          const history_payload = {
              status: 3,
          }          
          // console.log(today_payload)
          // 获取当天生产中，准备中工单
          // 是否应该按照有效工单，或者待产工单
          //:TODO
          this.$store.dispatch('get_producing_work_order', today_payload)          
          this.$store.dispatch('get_today_work_order', today_payload)

          if (this.timer){
            clearInterval(this.timer)
          }else{
            this.timer = setInterval(() => {
              this.$store.dispatch('get_producing_work_order', today_payload)
              this.$store.dispatch('get_today_work_order', today_payload)
              this.$store.dispatch('get_history_work_order', history_payload)
              // this.$store.dispatch('get_today_production_order', today_payload)
            }, 5000)
          }
        },

        computed: {
          
          producing_work_order: {
            get: function () {
              const store_producing_work_orders = this.$store.state.work_order.producing_work_orders
              if (store_producing_work_orders){
              // if (store_producing_work_orders.length != 0){
                const producing_work_order_list = store_producing_work_orders.map(item => {
                    // const dayStr = item.create_time
                    // console.log(dayStr)
                    const status = item.status
                    const seq = item.seq

                    const producing_work_order_dict =  {
                      id: item.id,
                      name: item.work_order_name,
                      PN_1: item.PN_1,
                      PN_2: item.PN_2,
                      category: item.category,
                      des: item.done_quantity + '/' + item.ordered_quantity,
                      Progress: (item.done_quantity/item.ordered_quantity) * 100,
                      status: status,
                      seq: seq,
                    }

                    return producing_work_order_dict
                })

                return producing_work_order_list
              }
              else{
                  return []                
              }
            }
          },          
          today_work_orders: {
            get: function () {
              const store_today_work_orders = this.$store.state.work_order.today_work_orders
              if (store_today_work_orders){
                const today_work_order_list = store_today_work_orders.map(item => {
                    // const dayStr = item.create_time
                    // console.log(dayStr)
                    const status = item.status
                    const seq = item.seq

                    const today_work_order_dict =  {
                      id: item.id,
                      name: item.work_order_name,
                      PN_1: item.PN_1,
                      PN_2: item.PN_2,
                      category: item.category,                      
                      des: item.done_quantity + '/' + item.ordered_quantity,
                      Progress: (item.done_quantity/item.ordered_quantity) * 100,
                      status: status,
                      seq: seq
                    }

                    return today_work_order_dict
                })

                return today_work_order_list
              }
              else{
                return []
              }
            }
          },
          history_work_orders: {
            get: function () {
              const store_history_work_orders = this.$store.state.work_order.history_work_orders

              const history_work_order_list = store_history_work_orders.map(item => {
                  // const dayStr = item.create_time
                  // console.log(dayStr)
                  const status = item.status

                  const history_work_order_dict =  {
                    id: item.id,
                    name: item.work_order_name,
                    PN_1: item.PN_1,
                    PN_2: item.PN_2,
                    category: item.category,                  
                    date: item.create_time,
                    progress: (item.done_quantity/item.ordered_quantity) * 100,
                    status: status,
                  }

                  return history_work_order_dict
              })

              return history_work_order_list
            }
          },
        },

        methods: {
          getColor(val) {
              if (val > 70 && val <= 100) {
                  return 'green'
              } else if (val > 50 && val <= 70) {
                  return 'blue'
              }
              return 'red'
          },
        },
        destroyed () {
            // 销毁监听
          // clearInterval(this.timer)
        }        
    }
</script>


