<template>
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
        <template v-for="color in colors" >
            <div class="column" style="height: 15px" v-bind:key="color.id">
                <div class="col">
                    <q-badge rounded class="q-mr-sm" :color="color"  />
                </div>
            </div>
        </template>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Indicator",
  props: ['colors'],
}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50px
</style>
