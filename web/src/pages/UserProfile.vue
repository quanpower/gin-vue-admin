<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6 ">
            <div class="text-h6">用户信息</div>
            <div class="text-subtitle2">编辑您的信息</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-btn label="Add Photo" class="text-capitalize" rounded color="info" style="max-width: 120px"></q-btn>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="User.nickname" label="用户名"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="User.email" label="邮箱地址"/>
                </q-item-section>
              </q-item>
              
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="User.phone" label="手机"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark color="white" dense v-model="User.authority_id" label="角色ID"/>
                </q-item-section>
              </q-item>
              
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <!-- <q-input dark color="white" type="textarea" dense v-model="User.avatar" label="About"/> -->
                  <q-input dark color="white" type="textarea" dense  label="About"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white">更新用户信息</q-btn>
          </q-card-actions>
        </q-card>
      </div>


      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">修改密码</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                当前密码
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dark dense outlined color="white" round v-model="password_dict.current_password"
                         label="当前密码" :rules="[ val => val && val.length >= 4 || '请输入大于4位密码']" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                新的密码
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dark dense outlined color="white" round v-model="password_dict.new_password"
                         label="新的密码" :rules="[ val => val && val.length >= 4 || '请输入大于4位密码']" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                确认新密码
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dark dense outlined round color="white" v-model="password_dict.confirm_new_password"
                         label="确认新密码" :rules="[ val => val && val == password_dict.new_password || '请确认两次密码输入相同？']" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white" @click="changePassword">修改密码</q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: "UserProfile",
        data() {
            return {
                user_details: {},
                password_dict: {}
            }
        },
        computed: {
        // 计算属性的 getter
          User: {
            get: function () {
              const data = this.$store.state.user.user
              return data
            }
          },

      },

      methods: {
        changePassword: function(){
          console.log('=========changePassword========')

          const payload = {
            username: this.User.email,
            current_password: this.password_dict.current_password,
            new_password: this.password_dict.new_password,
          }

          console.log(payload)

          this.$store.dispatch('ChangePassword', payload)
            .then(() => {
              // 登出
              // this.$store.dispatch('LogOut')
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
      },

    }
</script>

<style scoped>

  .card-bg {
    background-color: #162b4d;
  }
</style>
