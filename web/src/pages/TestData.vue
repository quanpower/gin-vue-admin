<template>
  <q-page class="q-pa-sm">
    <test-data :data="test_data_list" />
  </q-page>
</template>

<script>
    export default {
        name: "TestDataPage",
        components: {
            TestData: () =>  import('components/tables/TestData'),
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
          test_data_list: {
            get: function () {

              console.log('===test_data_Temp====')
              console.log(this.data)
              // map 当前值，索引值
              const test_data_Temp = this.data.map((row,index) =>{
                return {id:index, data:row}
              } )

              return test_data_Temp
            }
          }
        },
    }
</script>

<style scoped>

</style>
