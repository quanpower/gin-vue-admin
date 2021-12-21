<template>
  <q-page class="q-pa-sm">
    <test-report :data="data" />
  </q-page>
</template>

<script>
    export default {
        name: "TestReportPage",
        components: {
            TestReport: () =>  import('components/tables/TestReport'),
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
          // this.$store.dispatch('get_test_items', payload)
        },
        computed: {
          // production_orders: {
          //   get: function () {
          //     const test_itemsTemp = this.$store.state.production_order.test_items

          //     console.log('===test_itemsTemp====')
          //     console.log(test_itemsTemp)

          //     return test_itemsTemp
          //   }
          // }
        },
    }
</script>

<style scoped>

</style>
