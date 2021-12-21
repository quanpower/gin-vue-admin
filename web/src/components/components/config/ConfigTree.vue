<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <q-tree class="col-12 col-sm-6"
      :nodes="data"
      node-key="label"
      :tick-strategy="tickStrategy"
      :selected.sync="selected"
      :ticked.sync="ticked"
      :expanded.sync="expanded"
      color = 'green'
    />
    <!-- <div class="col-12 col-sm-6 q-gutter-sm">
      <div class="text-h6">Selected</div>
      <div>{{ selected }}</div>

      <q-separator spaced />

      <div class="text-h6">Ticked</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>

      <q-separator spaced />

      <div class="text-h6">Expanded</div>
      <div>
        <div v-for="expand in expanded" :key="`expanded-${expand}`">
          {{ expand }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'ConfigTree',
  props: ['data'],
  data () {
    return {
      tickStrategy: 'none',
      selected: '',
      ticked: [],
      expanded: []
    }
  },

}
</script>