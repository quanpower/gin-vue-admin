<template>
  <q-page class="q-pa-sm">
    <scan-report :data="data" />
  </q-page>
</template>

<script>
    export default {
        name: "ScanReportPage",
        components: {
            ScanReport: () =>  import('components/tables/ScanReport'),
        },
        created() {
          //这边接收上个组件传递过来的arry数组，赋值给data中定义的workTask
            this.data = this.$route.query.data;
        },         
        data() {
            return {

            }
        },
        mounted () {
          // const payload = { production_order_id: 1 }
          // this.$store.dispatch('get_scan_items', payload)
        },
        computed: {
        //   scans: {
        //     get: function () {
        //       const scansTemp = this.$store.state.production_order.scan_items

        //       console.log('===scansTemp====')
        //       console.log(scansTemp)

        //       return scansTemp
        //     }
        //   }
        // },
      },  
    }
</script>

<style scoped>

</style>
