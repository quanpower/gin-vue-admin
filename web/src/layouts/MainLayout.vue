<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          上海砺映工业物联网管理平台
        </q-toolbar-title>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
          <!-- <q-btn round dense flat color="white" icon="fab fa-github" type="a" href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a" href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn> -->

          <!-- <q-btn dense flat color="white">
            <q-avatar
              text-color="white"
              size='sm'
              icon="language"
            />
            <q-select
              v-model="lang"
              :options="langOptions"
              borderless
              emit-value
              map-options
              options-dense
              style="min-width: 100px"
            />
          </q-btn> -->

          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              {{ alarm.length }}
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages :alarm=alarm></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat>
            <q-avatar size="26px">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
              <img :src="User.avatar">
            </q-avatar>
            <q-menu
            >
              <q-list style="min-width: 100px">

                <q-item to="/Profile" active-class="q-item-no-link-highlighting">
                  <q-item-section class='justify-content:center' >
                    <q-btn :label="User.nickname" flat dense
                         class="text-indigo-8">
                    </q-btn>
                  </q-item-section>
                </q-item>

                <q-item active-class="q-item-no-link-highlighting">
                  <q-item-section class='justify-content:center' >
                    <q-btn label="注销" flat dense
                          class="text-indigo-8" @click="logout">
                    </q-btn>  
                  </q-item-section>
                </q-item>

              </q-list>
            </q-menu>            
          </q-btn>
        </div>
      </q-toolbar>

    <!-- 急停及线尾有物告警！ -->
    <q-item  v-for="msg in critical_alarm" :key="msg.id" clickable v-ripple>
      <q-item-section>
        <q-banner dense inline-actions class="text-white bg-red">
          {{msg.alarm_message}}
        </q-banner>
      </q-item-section>
    </q-item>


    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="220"
      content-class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section class='justify-content:center' >
            <q-img
              src="@/statics/images/handsome.jpg"
              spinner-color="white"
            />
          </q-item-section>
        </q-item>

              <!-- style="height: 90px; max-width: 180px" -->
        
        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>


        <q-item to="/BigMap" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="map"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>地图大屏</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Map" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="map"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>设备地图</q-item-label>
          </q-item-section>
        </q-item>


        <q-item to="/BigData" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>设备大屏</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Model3D" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>3D模型</q-item-label>
          </q-item-section>
        </q-item>
        <!-- 
        
        <q-item to="/BigData" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>设备大屏</q-item-label>
          </q-item-section>
        </q-item>
        

        <q-expansion-item
          icon="pages"
          label="生产监控"
        >
          <q-list class="q-pl-lg">

            <q-item to="/ProductionStatus" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="airplay"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>实时状态</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/ProductionInfo" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="airplay"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>生产信息</q-item-label>
              </q-item-section>
            </q-item>            

          </q-list>
        </q-expansion-item> -->

        <q-item to="/History" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart"/>
          </q-item-section>
          <q-item-section>
            <!-- <q-item-label>{{$t('Tables')}}</q-item-label> -->
            <q-item-label>历史追溯</q-item-label>
          </q-item-section>
        </q-item>   

        <q-item to="/Alarm" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="warning"/>
          </q-item-section>
          <q-item-section>
            <!-- <q-item-label>{{$t('Charts')}}</q-item-label> -->
            <q-item-label>报警日志</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          icon="pages"
          label="统计报表"
        >
          <q-list class="q-pl-lg">
          
            <q-item to="/Report" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="insert_chart"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>汇总报表</q-item-label>
              </q-item-section>
            </q-item>   

            <q-item to="/TaktTime" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="insert_chart"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>停线统计</q-item-label>
              </q-item-section>
            </q-item>   

            <q-item to="/Output" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="insert_chart"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>产量统计</q-item-label>
              </q-item-section>
            </q-item>   

            <q-item to="/Bypass" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="insert_chart"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>放行记录</q-item-label>
              </q-item-section>
            </q-item>                           

          </q-list>
        </q-expansion-item>


        <!-- <q-item to="/WSTest" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>WS测试</q-item-label>
          </q-item-section>
        </q-item> -->
        <!-- <q-item to="/Cards" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('Cards')}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Contact" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('Contact')}}</q-item-label>
          </q-item-section>
        </q-item> -->

        <!-- <q-item to="/Checkout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="check_circle_outline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>流程确认</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-expansion-item
          icon="pages"
          label="参数设置"
          v-show="User.authority_id == 999"
        >
          <q-list class="q-pl-lg">

            <q-item to="/Configs" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>参数展示</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/ConfigsCreate" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>新建参数</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/ConfigsUpdate" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>更新参数</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>


        <q-expansion-item
          icon="devices"
          label="设备管理"
          v-show="User.authority_id == 999"
        >
          <q-list class="q-pl-lg">

            <q-item to="/DeviceStatus" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>设备状态</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/CommTest" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>通信测试</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>



        <q-expansion-item
          icon="settings"
          label="系统管理"
          v-show="User.authority_id == 999"
        >
          <q-list class="q-pl-lg">

            <q-item to="/AxleCategory" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>类别管理</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/AxleModel" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>型号管理</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/Operation" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>工位管理</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/Device" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>设备管理</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/WorkOrder" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>工单管理</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/Task" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>任务管理</q-item-label>
              </q-item-section>
            </q-item>      

            <q-item to="/Rule" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <!-- <q-item-label>{{$t('TreeTable')}}</q-item-label> -->
                <q-item-label>规则管理</q-item-label>
              </q-item-section>
            </q-item>  

          </q-list>
        </q-expansion-item>


        <q-expansion-item
          icon="settings"
          label="API接口"
          v-show="User.authority_id == 999"
        >
          <q-list class="q-pl-lg">

            <q-item active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <a :href=docs_url target="_blank" class="api">docs</a>
              </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting">
              
              <q-item-section avatar>
                <q-icon name="edit"/>
              </q-item-section>
              <q-item-section>
                <a :href=redoc_url target="_blank" class="api">redoc</a>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="person"
          label="用户管理"
        >
          <q-list class="q-pl-lg">
            <!-- <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="email"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item> -->

            
            <!-- <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item> -->
            <!-- <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item> -->
            <!-- <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item> -->
            <!-- <q-item-label header class="text-weight-bolder text-white">Generic</q-item-label> -->
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="person"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>用户信息</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- <q-item to="/Pagination" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Pagination</q-item-label>
          </q-item-section>
        </q-item> -->

        <!-- <q-item to="/Ecommerce" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="shopping_cart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Product Catalogues</q-item-label>
          </q-item-section>
        </q-item> -->

        <!-- <q-expansion-item
          icon="menu_open"
          label="Menu Levels"
        >
          <q-item class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Level 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            :header-inset-level="0.85"
            label="Level 2"
          >
            <q-item class="q-ml-xl" style="margin-left: 55px  !important;" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Level 2.1</q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              :header-inset-level="1"
              label="Level 2.2"
            >
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.2</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item> -->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";


  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  // 例子： 
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "H+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }
 
  // 调用： 
  // var date1 = new Date().Format("yyyy-MM-dd");
  // var date2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
  function getStartTime() {

      var now = new Date;
      now.setMinutes(now.getMinutes() - 60);
      var stime = now.Format("yyyy-MM-dd HH:mm:ss");//一个小时前的时间    

      // const CURRENT_TIME = new Date().Format("yyyy-MM-dd HH:mm:ss")
      return stime
  }



  function getCurrentTime() {
      const CURRENT_TIME = new Date().Format("yyyy-MM-dd HH:mm:ss")
      return CURRENT_TIME
  }


    export default {
        name: 'MainLayout',

        components: {
            Messages,
            EssentialLink
        },

        data() {
            return {
                leftDrawerOpen: false,
                lang: this.$i18n.locale,
                leftDrawerOpen: this.$store.state.app.leftDrawerOpen,
                langOptions: [
                  { value: 'en-us', label: 'English' },
                  { value: 'zh-hans', label: '中文' }
                ],
                msg_length: 1,
                wsl_host: this.$store.state.app.wsl_host,
                docs_url: "http://" + this.$store.state.app.wsl_host + ":8010/api/docs",
                redoc_url: "http://" + this.$store.state.app.wsl_host + ":8010/api/redoc",
                bigdata_url: "http://1.15.47.30:8080",
            }
        },

      mounted() {
        const token = localStorage.getItem('ly-token')

        if(token){
          this.$store.dispatch('GetUser')
        }

        else{
          this.$router.push({ path: '/Login-1' })
        }

        // if (this.timer){
        //   clearInterval(this.timer)
        // }else{
        //     this.timer = setInterval(() => {
        //         let payload = {
        //             startTime: getStartTime(),
        //             endTime: getCurrentTime(),
        //             production_order_name: '',
        //             operation_name: '',
        //             export_report: false,
        //         }

        //         // console.log('====searchHistoryAlarm payload===')
        //         // console.log(payload)

        //         this.$store.dispatch('searchCurrentAlarm', payload)
        //         }, 5000)
        // }        
        
      },
      computed: {
        // 计算属性的 getter
        User: {
          get: function () {
            const data = this.$store.state.user.user
            console.log('this.$store.state.user.user===')
            console.log(data)
            return data
          }
        },

        alarm: {
          get: function () {
            const alarmsTemp = this.$store.state.alarm.alarms

            // console.log('===alarmsTemp====')
            // console.log(alarmsTemp)

            // console.log(alarmsTemp)
            return alarmsTemp
          }
        },
        
        critical_alarm: {
          get: function () {
            const alarmsTemp = this.alarm
            const critical = []
            alarmsTemp.forEach((item,index) => {
              if(item.alarm_level == -1){
                critical.push(item)
              }
            })

            // console.log(critical)
            return critical
          }
        },

      },
      methods: {

        logout: function() {

          this.$store.dispatch('LogOut')
            .then(() => {
              this.$router.push({ path: '/Login-1' })
            })
            .catch(() => {
              this.loading = false
            })
        }      
          
      },        
      watch: {
        lang (lang) {
          this.$i18n.locale = lang
        }
      },

      destroyed () {
          // 销毁监听
          clearInterval(this.timer)
      },  

    }
</script>

<style>
  /* unvisited link */
  a.api:link {
    color: white;
  }

  /* visited link */
  a.api:visited {
    color: white;
  }

  /* mouse over link */
  a.api:hover {
    color: hotpink;
  }

  /* selected link */
  a.api:active {
    color: blue;
  }
</style>
