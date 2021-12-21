<script>
export default {
  name: 'Index',
  data () {
    return {
    
    }
  },

  methods: {
    send(){
      console.log('1111111');
      this.$socket.emit('message','1111111111');
    },
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    message: function(val){
      console.log('返回:'+val)
    }
  },
}
</script>