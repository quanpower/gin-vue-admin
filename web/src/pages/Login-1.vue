<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                登录
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                hint="xxx@xxx.com"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="登录" type="button" color="primary" @click="login" @keyup.enter.native="login" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                redirect: '/ProductionInfo',
                loading: false
            }
        },
      // 创建时
      created(){
        // 在页面得created中来监听键盘得按键事件，焦点在本页面任何地方，都可以通过下面得代码来监听，当然，不止于本页面，
            this.keyupEnter()//页面在创建时就调用键盘的回车事件，在结构代码中也可以不写@keyup.enter.native="handleAddBook"
      },

      methods: {

        login(){
          let payload = {
            username: this.username,
            password: this.password
          }      

          this.$store.dispatch('LoginByEmail', payload = payload)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        },

        keyupEnter(){
          document.onkeydown=e=>{
            let _key=window.event.keyCode
            // console.log(e.target)
            // console.log(e.target.baseURI)
            // if(_key===13  && e.target.baseURI.match('Login-1') && e.target === body){
            // if(_key===13  && e.target.baseURI.match('Login-1')){
            if(_key===13){
              // match(此处应填写文件在浏览器中的地址，如 '/home/index')，不写的话，其他页面也会有调用回车按下的方法
              this.login()
            }
          }
        },
       
      },

    }
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
