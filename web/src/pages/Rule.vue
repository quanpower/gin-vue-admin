
<template>
  <div class="q-pa-md">

    <q-table
      title="规则管理"
      separator="cell"
      :data="ruleData"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn icon="edit" color="blue" label="编辑" flat dense @click="edit_rule(props.row)" />
        </q-td>
      </template>      

    </q-table>


    <q-dialog v-model="new_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md">
          <q-card-section>
            <div class="text-h6">
              新增
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-input dense v-model="add_data.name" label="规则名" outlined :rules="[val => !!val || 'Field is required']" />
            <q-select dense outlined v-model="add_data.bar_type" :options="bar_type_options" label="条码类型 *" />
            <q-input dense class="q-mt-sm" v-model="add_data.re" hint="SN扫码使能;正则表达式,如1;^[a-z]{3}\d{10}$" label="规则引擎，正则表达式" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense class="q-mt-sm" v-model="add_data.description" label="桥类描述，可选" outlined/>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="createNew()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="new_dialog.show=false"></q-btn>
          </q-card-actions>

        </q-card>

    </q-dialog>

    <q-dialog v-model="edit_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md">
          <q-card-section>
            <div class="text-h6">
              编辑
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-input dense disable readonly v-model="edit_data.name" label="规则名" outlined :rules="[val => !!val || 'Field is required']" />
            <q-select dense disable readonly outlined v-model="edit_data.bar_type" :options="bar_type_options" label="条码类型 *" />
            <q-input dense class="q-mt-sm" v-model="edit_data.re" hint="SN扫码使能;正则表达式,如1;^[a-z]{3}\d{10}$" label="规则引擎，正则表达式" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense class="q-mt-sm" v-model="edit_data.description" label="桥类描述，可选" outlined/>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="updateRule()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="edit_dialog.show=false"></q-btn>
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
  name: 'Rule',
  data () {
    return {

        columns: [
          {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: '规则名称', field: 'name', sortable: true},
          {name: 'bar_type', align: 'left', label: '条码类型', field: 'bar_type', sortable: true},
          {name: 're', align: 'center', label: '规则引擎', field: 're', sortable: true},
          {name: 'description', align: 'center', label: '规则描述', field: 'description'},
          {name: 'Action', label: '操作', field: 'action', sortable: false, align: 'center'},          
        ],

        new_dialog: {
            show: false,
        },
        edit_dialog: {
            show: false,
        },
   
        add_data: {
            name: '',
            bar_type: 1,
            re: '',
            description: ''
        }, 
        edit_data: {
            name: '',
            bar_type: 1,
            re: '',
            description: ''
        }, 

        bar_type_options: [
          {
            label: '条形码',
            value: 1
          },
          {
            label: '二维码',
            value: 2
          }
        ],      

        pagination: {
          rowsPerPage: 50
        }                 

    }
  },
  mounted() {
    this.$store.dispatch('GetRules')
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
        bar_type: this.add_data.bar_type,
        re: this.add_data.re,
        description: this.add_data.description,
      }
      this.$store.dispatch('CreateRule', payload)
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
      this.$store.dispatch('GetRules')

    },  
    edit_rule: function(row){
      console.log('=========edit_rule========')
      this.$set(this.edit_dialog, 'show', true)

      this.$set(this.edit_data, 'name', row.name)
      this.$set(this.edit_data, 'bar_type', row.bar_type)
      this.$set(this.edit_data, 're', row.re)
      this.$set(this.edit_data, 'description', row.description)
    },  
    updateRule: function(){
      console.log('=========updateRule========')

      const payload = {
        name: this.edit_data.name,
        bar_type: this.edit_data.bar_type,
        re: this.edit_data.re,
        description: this.edit_data.description,
      }

      this.$store.dispatch('updateRule', payload)
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

      this.$set(this.edit_dialog, 'show', false)
      // 获取最新全部设备
      this.$store.dispatch('GetRules')

    },  
            
  },
  computed: {
    // 计算属性的 getter
    ruleData: {
      get: function () {
        const rules = this.$store.state.rule.rules

        console.log('---rules in vue----')
        console.log(rules)

        return rules
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