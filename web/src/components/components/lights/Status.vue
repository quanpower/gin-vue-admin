<template>
  <q-card bordered >
    <q-card-section>

      <div class="column items-center" style="height: 150px">
        <div class="col">
          <q-btn v-if="status.left" style="width: 50px" size="xs" :color="status.left" >
            <!-- {{status.left == 'green'?'通过':'失败'}} -->
          </q-btn>
        </div>

        <div class="col-5">
          <div class="text-h6">{{status.operation}}</div>
        </div>

        <div class="col">
          <q-btn v-if="status.right" style="width: 50px" size="xs" :color="status.right" >
            <!-- {{status.right == 'green'?'通过':'失败'}} -->
          </q-btn>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Status",
  props: ['status'],
}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50px
</style>
