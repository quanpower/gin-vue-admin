<template>
  <div>
    <q-item style="max-width: 420px" v-for="msg in alarm" :key="msg.id" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{msg.id}}
        </q-avatar>
        
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.alarm_code }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.alarm_message }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{msg.create_time}}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

    export default {
        name: "Messages",
        props: ['alarm'],
        data() {
            return {
            }
        },
               
    }
</script>

<style scoped>

</style>
