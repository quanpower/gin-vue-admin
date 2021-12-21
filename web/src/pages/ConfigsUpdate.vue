<template>
  <q-page class="q-pa-sm">
    <q-card>

      <q-card-section>
        <div class="text-h6 text-indigo-8">
          参数编辑
        </div>
        <div class="text-subtitle2">
          请依次对桥型的各个工位扫描项，测试项进行编辑并提交,最终提交后再切换其他页面！
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
      </div>

      <q-separator></q-separator> 

      <div class="q-gutter-md row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

          <q-list v-for="(node, index) of nodes" :key="node.name" bordered>

            <div class="q-gutter-md row">
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <q-chip square color="blue" text-color="white" icon="settings">
                  {{configs[index].name}} 
                </q-chip>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-input
                  outlined
                  dense
                  v-model="configs[index].description"
                  label="配置描述，可选"
                />
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <q-toggle v-model="configs[index].task_enable" color="green" label="配置使能" />
                <!-- <q-checkbox dense outlined class="full-width" v-model="config.task_enable" label="使能该项配置"/>  @input="toggleChanged(index)"  -->
              </div>
            </div>

            <!-- 增加任务 -->
            <div class="q-gutter-md row">
              <!-- 扫描任务 -->
              <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <q-list v-for="(task, key) of configs[index].scan_task.tasks" :key="key" >

                  <q-card style="width: 400px" class="q-px-sm q-pb-md" >
                      <q-card-section class="q-pa-sm">
                        <div class="q-gutter-md row">
                          <q-chip removable @remove="deleteScanTask(index, key)" color="teal" text-color="white" icon="scan">
                            {{task.task_name}}
                          </q-chip>
                          <q-space />
                          <!-- <q-select dense outlined v-model="task.task_name" :options="tasks_options" label="任务名 *" />
                          <q-select dense outlined v-model="task.task_bar_type" :options="bar_type_options" label="条码类型 *" />
                          <q-select dense outlined clearable v-model="task.task_rule" :options="scan_rule_options" label="规则引擎 *" />
                          <q-input dense class="q-mt-sm" v-model="task.description" label="任务描述，可选" outlined/> -->
                          <q-checkbox v-model="task.task_enable" color="teal" label="任务使能 *" />
                        </div>
                      </q-card-section>
                    </q-card>

                </q-list>
              </div>

              <!-- 测试任务 -->
              <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <q-list v-for="(task, key) of configs[index].test_task.tasks" :key="key" >

                  <q-card style="width: 400px" class="q-px-sm q-pb-md" >
                      <q-card-section class="q-pa-sm">
                        <div class="q-gutter-md row">
                          <q-chip removable @remove="deleteTestTask(index, key)" color="teal" text-color="white" icon="scan">
                            {{task.task_name}}
                          </q-chip>  
                          <q-space />
                        
                          <!-- <q-select dense outlined v-model="task.task_name" :options="tasks_options" label="任务名 *" />
                          <q-input dense v-model="task.task_parameter" label="参数" outlined/>
                          <q-input dense class="q-mt-sm" v-model="task.description" label="任务描述，可选" outlined/> -->
                          <q-checkbox v-model="task.task_enable" color="teal" label="任务使能 *" />
                        </div>
                      </q-card-section>
                    </q-card>

                </q-list>
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-space />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-btn icon="add" rounded flat color="blue" label="Add Task" @click="dialogChange(index)"/>
              </div>

            </div>
          </q-list>


          <q-dialog v-model="task_dialog.show">

              <q-card style="width: 300px" class="q-px-sm q-pb-md" v-if="task_dialog.show">
                <q-card-section>
                  <div class="text-h6">
                    增加任务
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-sm">

                  <!-- map options -->
                  <q-select dense outlined v-model="task_type" :options="task_type_options" emit-value map-options label="任务类型 *" />
                  <q-select dense outlined v-model="task" :options="tasks_options" label="任务名 *" />
                  
                  <q-input v-if="task_type==2" dense v-model="add_data.task.parameter" label="参数" outlined/>
                  <q-select v-if="task_type==1" dense outlined v-model="bar_type" :options="bar_type_options" label="条码类型 *" />
                  <q-select v-if="task_type==1" dense outlined clearable v-model="rule" :options="scan_rule_options" label="规则引擎 *" />
                  <q-input dense class="q-mt-sm" v-model="add_data.task.description" label="任务描述，可选" outlined/>
                  <q-checkbox v-model="add_data.task.task_enable" color="teal" label="任务使能 *" />
                </q-card-section>

                <q-card-actions align="right" class="q-pa-sm text-grey-8">
                  <!-- 添加任务 -->
                  <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="addTask(task_dialog.index)"> </q-btn>
                  <q-btn label="取消" color="primary" class="text-capitalize" @click="task_dialog.show=false"></q-btn>
                </q-card-actions>

              </q-card>

          </q-dialog>


          <q-btn rounded class="float-right q-mr-md q-mb-md" color="orange" @click="updateConfigToDB" label="提交"/> 
        </div>

      </div>

    </q-card>

  </q-page>
</template>


<script>
import { mapMutations } from 'vuex'

    export default {
        name: "ConfigsEdit",
        components: {
          // ConfigTree: () => import('components/Config/ConfigTree'),
        },

        data () {
          // 调用methods使用
          // let self = this

          return {
            categoryID: 1,
            configs:[],
            index: 0,
            task_type: 1,

            task_type_options: [
              {
                label: '扫描任务',
                value: 1
              },
              {
                label: '测试任务',
                value: 2
              }
            ],

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

            task: null,
            rule: null,

            bar_type: {
              label: '条形码',
              value: 1
            },

            task_dialog: {
                show: false,
                index:0,
            },

            add_data: {
                task: {},
            },            
          }
        },

        mounted () {
          this.$store.dispatch('GetCategorys')
          this.$store.dispatch('GetOperations')
          this.$store.dispatch('GetTasks')
          this.$store.dispatch('GetRules')
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
              console.log('=====categoryNameList====')
              console.log(categoryNameList)
              return categoryNameList
            }
          },

          tasks_options: {
            get: function () {
              const taskTemp = this.$store.state.task.tasks
              let taskNameList = []
              console.log('=======taskTemp=========')
              console.log(taskTemp)

              for (const item of taskTemp){
                // 显示同工位任务,且任务类型相同
                // console.log(this.task_dialog.index)
                // console.log(item.operation_id)

                if (this.task_dialog.index + 1 == item.operation_id && this.task_type == item.type)
                  {
                    taskNameList.push({label:item.name, value:item.id})
                  }
              }

              console.log('======taskNameList=====')
              console.log(taskNameList)

              return taskNameList
            }
          }, 

          scan_rule_options: {
            get: function () {
              const ruleTemp = this.$store.state.rule.rules
              let ruleNameList = []
              for (const item of ruleTemp)
                {
                  if(item.bar_type == this.bar_type.value){
                    ruleNameList.push({label:item.name, value:item.re})
                  }
                  
                }
              console.log('=====ruleNameList====')
              console.log(ruleNameList)
              return ruleNameList
            }
          },
          
          nodes: {
            get: function () {
              const configsTemp = this.$store.state.config.configs
              console.log('====configsTemp in state=======')
              console.log(configsTemp)

              let nodeList = []

              try {
                configsTemp.forEach((item, index) => {
                  const scan_children = []
                  const test_children = []
                  console.log(index)
                  console.log(item)

                  console.log(item.name)
                  console.log(item.scan_task)
                  console.log(item.test_task)

                  const scan_tasks = JSON.parse(item.scan_task).tasks
                  const test_tasks = JSON.parse(item.test_task).tasks

                  console.log(scan_tasks)
                  console.log(test_tasks)

                  //扫描任务
                  for (const element of scan_tasks){
                    scan_children.push(
                      {
                        task_name: element.task_name,
                        task_enable: element.task_enable,
                        task_bar_type: element.task_bar_type ? element.task_bar_type: 0,
                        task_rule: element.task_rule ? element.task_rule : "",
                        description: element.description ? element.description : "",
                      }
                    )
                  }

                  //测试任务
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

                  // 工位配置
                  const item_dict = {
                    name: item.name,
                    category_name: item.category_name,
                    operation_name: item.operation_name,
                    task_enable: item.task_enable,
                    scan_task: {tasks: scan_children},
                    test_task: {tasks: test_children},
                    description: item.description,
                  }

                  nodeList.push(item_dict)
                  this.$set(this.configs, index, item_dict)
                })

                    
              } catch (e) {
                  // You can read e for more info
                  // Let's assume the error is that we already have parsed the payload
                  // So just return that
                  console.log(e)
              }


              console.log('=======nodeList in nodes============')
              console.log(nodeList)
              return nodeList              

            }
          },          

        },
        methods: {
          // 创建初始化config初始数组

          getConfigs: function() {
            console.log('======执行getConfigs中======')
            const payload = { category_name: this.categoryID }
            this.$store.dispatch('GetConfigRecord', payload)
          },        

          dialogChange: function(index){
            console.log('=========dialogChange========')
            console.log(index)

            this.$set(this.task_dialog, 'show', true)
            this.$set(this.task_dialog, 'index', index)

            console.log(this.task_dialog)
          },

          addTask: function(index) {
            const configsList = []

            console.log('======执行addTask中======')

            if (this.task_type == 1){
              const scan_task = {
                task_name: this.task.label,
                task_description: this.add_data.task.description ? this.add_data.task.description : '',
                task_bar_type: this.bar_type.value,
                task_rule: this.rule.value,
                task_enable: this.add_data.task.task_enable    
              }

              console.log(this.configs[index].scan_task)
              console.log('=======this.task_type == 1========')
              this.configs[index].scan_task.tasks.push(scan_task)
              console.log(this.configs[index].scan_task.tasks)

            }

            else if(this.task_type == 2){
              const test_task = {
                task_name: this.task.label,
                // 创建测试任务参数
                task_parameter: this.add_data.task.parameter ? this.add_data.task.parameter : '',
                task_description: this.add_data.task.description ? this.add_data.task.description : '',
                task_enable: this.add_data.task.task_enable    
              }              

              console.log('=======this.task_type == 2========')
              this.configs[index].test_task.tasks.push(test_task)
            }

            // 添加任务完成将各项清空
            this.add_data.task = {}

            console.log('=========configsList========')
            console.log(this.configs)

            // 对话框隐藏
            this.$set(this.task_dialog, 'show', false)
          },

          deleteScanTask: function(index,key){
            console.log('=========deleteScanTask========')
            console.log(index)
            console.log(key)
            this.configs[index].scan_task.tasks.splice(key,1)
          },

          deleteTestTask: function(index,key){
            console.log('=========deleteTestTask========')
            this.configs[index].test_task.tasks.splice(key,1)
          },

          updateConfigToDB: function() {
            console.log('======执行updateConfigToDB中======')
            const configs = this.configs
            this.$store.dispatch('updateConfigRecord', configs)
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

          },

          toggleChanged: function(index) {
            console.log('======toggleChanged======')
            console.log(index)
            this.$set(this.configs[index], 'task_enable', false)
            // this.configs.splice(index, 0, false)
            // const configs = this.configs
          },

          ...mapMutations({
            setConfig: 'SET_CONFIG_RECORD' // 将 `this.setConfig()` 映射为 `this.$store.commit('SET_CONFIG_RECORD')`
          })
        },  

        destroyed () {
          // 清空configs数组
          // this.configs.splice(0, this.configs.length)
          // console.log(this.configs)
          // alert(this.configs)

        }     
    }
</script>

<style scoped>

</style>
