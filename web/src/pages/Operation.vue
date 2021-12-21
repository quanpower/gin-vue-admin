
<template>
  <div class="q-pa-md">
    <q-table
      title="工位管理"
      separator="cell"
      :data="Data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"

    >
    </q-table>

    <!-- 添加任务 -->
    <div class="q-gutter-md row">
        <q-btn icon="add" rounded flat label="新增" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Operations',
  data () {
    return {
        columns: [
          {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: '工位名', field: 'name', sortable: true},
        ],
        pagination: {
            rowsPerPage: 30
        },        
    }
  },
  mounted() {
    this.$store.dispatch('GetOperations')
  },

  methods: {
    
  },
  computed: {
    // 计算属性的 getter
    Data: {
      get: function () {
        const data = this.$store.state.operation.operations

        return data
      }
    },

  },
  methods: {
            
  },
  destroyed () {
      // 销毁监听
  },
}
</script>

<style lang="sass" scoped>

</style>