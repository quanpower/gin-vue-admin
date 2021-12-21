<template>
  <q-card>
    <q-card-section class="absolute absolute-center text-center" >
      <template v-for="color in colors" >
        <q-badge rounded :color="color" :key="color.id" />
      </template>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardCafe"
}
</script>

<style scoped>

</style>
