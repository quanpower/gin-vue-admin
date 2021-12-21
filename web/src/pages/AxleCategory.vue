
<template>
  <div class="q-pa-md">

    <q-table
      title="桥类管理"
      separator="cell"
      :data="Data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"

    >
    </q-table>



    <q-dialog v-model="new_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md">
          <q-card-section>
            <div class="text-h6">
              新增
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-input dense type="number" v-model="add_data.name" label="桥类" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense class="q-mt-sm" v-model="add_data.description" label="桥类描述，可选" outlined/>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="createNew()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="new_dialog.show=false"></q-btn>
          </q-card-actions>

        </q-card>

    </q-dialog>


    <!-- 添加任务 -->
    <div class="q-gutter-md row">
        <q-btn icon="add" rounded flat label="新增" @click="dialogChange()" />
    </div>


    
  </div>
</template>

<script>
export default {
  name: 'Categorys',
  data () {
    return {
        new_dialog: {
            show: false,
        },
        add_data: {
            name: 0,
            description: ''
        }, 
        columns: [
          {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: '桥类', field: 'name', sortable: true},
          {name: 'description', align: 'center', label: '描述', field: 'description'},
        ],

        pagination: {
          rowsPerPage: 100
        }        
    }
  },
  mounted() {
    this.$store.dispatch('GetCategorys')
  },

  methods: {
    dialogChange: function(){
      console.log('=========dialogChange========')

      this.$set(this.new_dialog, 'show', true)
    },    

    createNew: function(){
      console.log('=========createNew========')

      const payload = {
        name: this.add_data.name,
        description: this.add_data.description,
      }
      this.$store.dispatch('CreateCategory', payload)
        .then(() => {
          this.$q.notify({
            message: '提交成功！',
            color: 'green'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: '提交失败！',
            color: 'red'
          })
        })     

      this.$set(this.new_dialog, 'show', false)
      // 获取最新全部桥类
      this.$store.dispatch('GetCategorys')

    },      
  },

  computed: {
    // 计算属性的 getter
    Data: {
      get: function () {
        const data = this.$store.state.category.categorys

        return data
      }
    },

  },
  destroyed () {
      // 销毁监听
  },
}
</script>

<style lang="sass" scoped>

</style>