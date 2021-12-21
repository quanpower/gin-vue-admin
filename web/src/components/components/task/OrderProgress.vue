<template>
  <q-card>
    <q-card-section>
      <div class="q-gutter-md row">
        <div class="text-h6 text-grey-8">
          工单列表
        </div>
        <!-- <q-space />
        <q-toggle
          :label="auto"
          color="blue"
          false-value="手动"
          true-value="自动"
          v-model="auto"
        /> -->
      </div>
    </q-card-section>

    <q-separator color="white"/>

    <q-card-section class="q-pa-none">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>生产中</q-toolbar-title>
        </q-toolbar>
          <div v-for="row in producingList" :key="row.name" class="q-pa-md">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img src="@/statics/images/axle.jpg">
                </q-avatar>
              </q-item-section>

              <q-item-section style="max-width: 150px">
                <q-item-label class="text-h6 text-color">{{ row.name }}</q-item-label>
                <q-item-label caption class="">{{ row.des }}</q-item-label>
              </q-item-section>
              <q-item-section style="max-width: 200px">
                <q-item-label class="text-h8 text-color">{{ row.PN_1 }}</q-item-label>
              </q-item-section>
              <q-item-section style="max-width: 200px">
                <q-item-label class="text-h8 text-color">{{ row.PN_2 }}</q-item-label>
              </q-item-section>
              <q-item-section style="max-width: 50px">
                <q-item-label class="text-h8 text-color">{{ row.category }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-linear-progress dark :color="getColor(row.Progress)" :value="row.Progress/100" />
              </q-item-section>                  

              <q-item-section style="max-width: 80px">
                <q-chip class="float-right text-white text-capitalize" label="完成" color="green"
                        v-if="row.status==0"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="等待" color="teal"
                        v-if="row.status==1"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="生产" color="blue"
                        v-if="row.status==2"></q-chip>                          
                <q-chip class="float-right text-white text-capitalize" label="暂停" color="grey"
                        v-if="row.status==3"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="封存" color="warning"
                        v-if="row.status==4"></q-chip>                                
                <q-chip class="float-right text-white text-capitalize" label="异常" color="negative"
                        v-if="row.status==-1"></q-chip>
              </q-item-section>     

              <q-item-section>
                <div class="row">
                  <div class="col">
                    <q-btn icon="play_arrow" color="blue" label="开始" flat dense @click="start_work_order(row.name)" />
                  </div>
                  <div class="col">
                    <q-btn icon="pause" color="secondary" label="暂停" flat dense @click="pause_work_order(row.name)" />
                  </div>
                  <div class="col">
                    <q-btn icon="delete" color="red" label="封存" flat dense @click="stop_work_order(row.name)" />
                  </div>
                </div>
              </q-item-section>  

              <!-- <q-item-section side>
                <q-icon name="chat_bubble" color="green" />
              </q-item-section> -->

            </q-item>
        </div>

        <!-- <draggable @change="updateListSortOrder" @start="start" @end="end"> -->
        <!-- <draggable v-model="waitingList" @change="updateListSortOrder" @start="start" @end="end"> -->
        <!-- <draggable v-model="waitingList"  @start="start" @end="end"> -->
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>准备中</q-toolbar-title>
        </q-toolbar>
        <draggable v-model="waitingList" @change="updateListSortOrder" @start="start" @end="end">
        <!-- <draggable v-model="waitingList" @change="updateListSortOrder" @start="start" @end="end"> -->
          <div v-for="row in waitingList" :key="row.name" class="q-pa-md">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <p>{{ row.seq }}</p>
                  </q-avatar>
                </q-item-section>

                <!-- <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <img src="@/statics/images/axle.jpg">
                  </q-avatar>
                </q-item-section> -->

                <q-item-section style="max-width: 150px">
                  <q-item-label class="text-h6 text-color">{{ row.name }}</q-item-label>
                  <q-item-label caption class="">{{ row.des }}</q-item-label>
                </q-item-section>

                <q-item-section style="max-width: 200px">
                  <q-item-label class="text-h8 text-color">{{ row.PN_1 }}</q-item-label>
                </q-item-section>
                <q-item-section style="max-width: 200px">
                  <q-item-label class="text-h8 text-color">{{ row.PN_2 }}</q-item-label>
                </q-item-section>
                <q-item-section style="max-width: 50px">
                  <q-item-label class="text-h8 text-color">{{ row.category }}</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-linear-progress dark :color="getColor(row.Progress)" :value="row.Progress/100" />
                </q-item-section>                  

                <q-item-section style="max-width: 80px">
                  <q-chip class="float-right text-white text-capitalize" label="完成" color="green"
                          v-if="row.status==0"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" label="等待" color="teal"
                          v-if="row.status==1"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" label="生产" color="blue"
                          v-if="row.status==2"></q-chip>                          
                  <q-chip class="float-right text-white text-capitalize" label="暂停" color="grey"
                          v-if="row.status==3"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" label="封存" color="warning"
                          v-if="row.status==4"></q-chip>                                
                  <q-chip class="float-right text-white text-capitalize" label="异常" color="negative"
                          v-if="row.status==-1"></q-chip>
                </q-item-section>     

                <q-item-section>
                  <div class="row">
                    <div class="col">
                      <q-btn icon="play_arrow" color="blue" label="开始" flat dense @click="start_work_order(row.name)" />
                    </div>
                    <div class="col">
                      <q-btn icon="pause" color="secondary" label="暂停" flat dense @click="pause_work_order(row.name)" />
                    </div>
                    <div class="col">
                      <q-btn icon="delete" color="red" label="封存" flat dense @click="stop_work_order(row.name)" />
                    </div>
                  </div>
                </q-item-section>  

                <!-- <q-item-section side>
                  <q-icon name="chat_bubble" color="green" />
                </q-item-section> -->

              </q-item>
          </div>
        </draggable>

    </q-card-section>
  </q-card>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "OrderProgress",
  props: ['producing','waiting'],
  components: {
    draggable,
  },
  data() {
    return {
      auto: '手动',
      newWaitingList: [],
    }
  },
  computed: {
    producingList: function () {
        const progressList = this.producing.map(item => {
            return {
                  'name': item.name,
                  'des': item.des,
                  'Progress': item.Progress,
                  'PN_1': item.PN_1,
                  'PN_2': item.PN_2,
                  'category': item.category,
                  'status': item.status,
                  'seq': item.seq,
            }
        }
        );
        return progressList
    },

    waitingList:  {
      get: function () {
        const progressList = this.waiting.map(item => {
            return {
                  'name': item.name,
                  'des': item.des,
                  'Progress': item.Progress,
                  'PN_1': item.PN_1,
                  'PN_2': item.PN_2,
                  'category': item.category,                  
                  'status': item.status,
                  'seq': item.seq,
            }
        }
        )
        return progressList
      },
      set: function (value) {
        console.log('====setter====')
        console.log(value)
        this.newWaitingList = value
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
      return 'teal'
    },

    start_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: 2,
        seq: 0
      }
      // 自动开始，手动开始暂停使用
      // this.$store.dispatch('put_work_order', payload)
      this.getNewList()
    },
    // 暂停
    pause_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: 3,
        seq: 0
      }
      this.$store.dispatch('put_work_order', payload)
      this.getNewList()
    },
    // 封存
    stop_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: 4,
        seq: 0
      }
      this.$store.dispatch('put_work_order', payload)
      this.getNewList()
    },  
    // 排序
    update_work_order_seq(work_order_name, seq){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: -5,
        seq: seq
      }

      this.$store.dispatch('put_work_order', payload)
    },      
    getdata (data) {
      console.log('getdata方法');
    },
    start (e) {
        console.log(e)
    },
    change (e) {
        console.log('changed!')
        console.log(e)
    },
    updateListSortOrder (e) {
      console.log(e)
      const newList = [...this.newWaitingList].map((item, index) => {
      // const newList = this.newWaitingList.map((item, index) => {
        console.log('===updateListSortOrder====')
        console.log(item)
        console.log(index)
        const newSort = index + 1
        item.hasChanged = item.seq !== newSort;
        console.log(item.hasChanged)
        if (item.hasChanged) {
          item.seq = newSort;
        }
        return item;
      });

      // this.waitingList = newList

      newList.forEach((item,index) => {
        const work_order_name = item.name
        const seq = item.seq
        if(item.hasChanged){
          console.log(item)
          this.update_work_order_seq(work_order_name, seq)
        }
      })
      this.getNewList()
    },    

    end (e) {
        console.log(e)
    },    
    getNewList(){
      // 提交排序更新后，从后端重新拉取最新排序
      const today_payload = {
        status: 1,
      }
      this.$store.dispatch('get_today_work_order', today_payload)  
      this.$store.dispatch('get_producing_work_order', today_payload)  
    }
  },

}
</script>

<style scoped>

</style>
