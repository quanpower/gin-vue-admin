<template>
  <div class="q-pa-md" style="max-width: 300px">
    <!-- input 失去焦点触发事件把数据往父组件传送 -->
    <q-input 
      filled 
      v-model="date" 
      @blur="datetimeChanged" 
      clearable
      clear-icon="close"
      :label="label"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>

export default {
  name: 'DateTimeInput',
  props: ['label'],
  data () {
    return {
      // date: '2019-02-01 12:44'
      date: ''
    }
  },
  methods:{
    datetimeChanged(){
      this.$emit('inputChanged', this.date)
    }
  }
}

</script>