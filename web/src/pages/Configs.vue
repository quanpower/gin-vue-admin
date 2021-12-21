<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          桥型配置表
        </div>
        <div class="text-subtitle2">
          选择桥型，展示对应各工位配置信息。
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <div class="q-gutter-md row">
        <q-select
          label="选择桥型"
          transition-show="flip-up"
          transition-hide="flip-down"
          filled
          v-model="categoryID"
          :options="categoryOptions"
          @input="getConfigs"
          style="width: 250px"
        />

        <q-space />

        <q-file
          v-model="files"
          label="导入配置"
          outlined
          use-chips
          multiple
          style="max-width: 300px"
        />
        <q-btn color="blue" label="导入配置文件" @click="importConf" />

        <q-space />

        <q-btn color="secondary" label="导出配置文件" @click="exportToConf" />
      </div>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-table class="no-shadow"
                  :data="nodes"
                  title="桥型配置表"
                  :hide-header="mode === 'grid'"
                  :columns="columns"
                  row-key="name"
                  :filter="filter"
                  :pagination.sync="pagination"
        >
          <template v-slot:top-right="props">
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>

            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'" class="q-px-sm"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
              </q-tooltip>
            </q-btn>

          </template>

          <!-- 嵌入扫描表格 -->
          <template v-slot:body-cell-scan_task="props">
            <q-td :props="props">
              <q-table
                header: false
                hide-header
                hide-bottom
                dense
                separator="cell"
                :data="props.row.scan_task"
                :columns="scan_columns"
                row-key="id"
              >
                <template v-slot:body-cell-task_enable="props">
                  <q-td :props="props">
                      <q-badge  class="q-mr-sm" :color="getColor(props.row.task_enable)"  />
                  </q-td>
                </template>

              </q-table>
            </q-td>
          </template>

          <!-- 嵌入测试表格 -->
          <template v-slot:body-cell-test_task="props">
            <q-td :props="props">
                
              <q-table
                header: false
                hide-header
                hide-bottom
                dense
                separator="cell"
                :data="props.row.test_task"
                :columns="test_columns"
                row-key="id"
              >
                <template v-slot:body-cell-task_enable="props">
                  <q-td :props="props">
                      <q-badge  class="q-mr-sm" :color="getColor(props.row.task_enable)"  />
                  </q-td>
                </template>              
              </q-table>
            </q-td>
          </template>

          <!-- 配置使能 -->
          <template v-slot:body-cell-task_enable="props">
            <q-td :props="props">
              <q-badge rounded class="q-mr-sm" :color="getColor(props.row.task_enable)"  />
            </q-td>
          </template>

        </q-table>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>

  export default {
      name: "ConfigsTree",

      components: {
      },
      data(){
        return {
          filter: '',
          mode: 'list',
          files: null,
          pagination: {
              rowsPerPage: 30
          },
          categoryID: 1,
          columns: [
            {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
            {name: 'name', align: 'left', label: '配置项名', field: 'name', sortable: true},
            {name: 'category_name', align: 'left', label: '桥类', field: 'category_name', sortable: true},
            {name: 'operation_name', align: 'left', label: '工位', field: 'operation_name', sortable: true},
            {name: 'task_enable', align: 'left', label: '配置使能', field: 'task_enable', sortable: true},
            {name: 'scan_task', align: 'center', label: '扫码任务: 任务名 | 任务使能 | 条码类型 | 扫描规则 | 描述', field: 'scan_task'},
            {name: 'test_task', align: 'center', label: '测试任务: 任务名 | 任务使能 | 螺栓数量 | 描述', field: 'test_task'},
            {name: 'description', align: 'left', label: '描述', field: 'description'},
          ],
          scan_columns:[
            {name: 'task_name', align: 'left', label: '任务名', field: 'task_name', sortable: true},
            {name: 'task_enable', align: 'center', label: '任务使能', field: 'task_enable', sortable: true},
            {name: 'task_bar_type', align: 'center', label: '条码类型', field: 'task_bar_type', sortable: true},
            {name: 'task_rule', align: 'left', label: '扫描规则', field: 'task_rule', sortable: true},
            {name: 'task_description', align: 'left', label: '描述', field: 'task_description'},
          ],
          test_columns:[
            {name: 'task_name', align: 'left', label: '任务名', field: 'task_name', sortable: true},
            {name: 'task_enable', align: 'center', label: '任务使能', field: 'task_enable', sortable: true},
            {name: 'task_parameter', align: 'center', label: '螺栓数量', field: 'task_parameter'},
            {name: 'task_description', align: 'left', label: '描述', field: 'task_description'},
          ],
        }
        
      },
      mounted () {
        this.$store.dispatch('GetCategorys')
        // 第一次请求配置，因为select改变才触发请求
        this.getConfigs()
      },

      computed: {
        categoryOptions: {
            get: function () {
              const categoryTemp = this.$store.state.category.categorys
              let categoryNameList = []
              for (const item of categoryTemp)
                {
                  categoryNameList.push(item.name)
                }
              // console.log(categoryNameList)
              return categoryNameList
            }
        },

        nodes: {
          get: function () {

            const configs = this.$store.state.config.configs

            console.log('====configs in state=======')
            console.log(configs)

            let nodeList = []
            for (const item of configs){
              const scan_children = []
              const test_children = []

              const scan_tasks = JSON.parse(item.scan_task).tasks
              const test_tasks = JSON.parse(item.test_task).tasks

              for (const element of scan_tasks){
                scan_children.push(
                  {
                    task_name: element.task_name,
                    task_enable: element.task_enable,
                    task_bar_type: element.task_bar_type ? element.task_bar_type : "",
                    task_rule: element.task_rule ? element.task_rule : "",
                    task_description: element.task_description ? element.task_description : "",
                  }
                )
              }


              for (const element of test_tasks){
                test_children.push(
                  {
                    task_name: element.task_name,
                    task_enable: element.task_enable,
                    task_parameter: element.task_parameter ? element.task_parameter : "",
                    task_description: element.task_description ? element.task_description : "",
                  }
                )
              }

              const item_dict = {
                id: item.id,
                name: item.name,
                category_name: item.category_name,
                operation_name: item.operation_name,
                task_enable: item.task_enable,
                scan_task: scan_children,
                test_task: test_children,
                description: item.description,
              }

              nodeList.push(item_dict)
            }

            console.log('=======nodeList in nodes============')
            console.log(nodeList)
            return nodeList
          }
        },

      },

      methods: {
        getConfigs: function() {
          console.log('======执行getConfigs中======')
          const payload = { category_name: this.categoryID }
          this.$store.dispatch('GetConfigRecord', payload)
        },
        exportToConf: function() {
          console.log('======导出到配置文件======')

          this.$store.dispatch('getAllConfigs')
        },  
        importConf: function() {
          console.log('======导入配置文件======')
          const that = this
          var reader = new FileReader(); //这是核心,读取操作就是由它完成.
            reader.readAsText(this.files[0], 'utf-8'); //读取文件的内容,也可以读取文件的URL
            reader.onload = function(e) {
                //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                console.log(this.result);
                // console.log(e.target.result);
                const configs = JSON.parse(this.result).configs
                console.log('=====configs=====')
                console.log(configs)

                that.$store.dispatch('createConfigRecord', configs)  
            }
  
        },
        getColor(value){
          if (value){
            return 'green'
          }
          else{
            return 'red'
          }
        },              
      }
  }
</script>

<style scoped>

</style>
