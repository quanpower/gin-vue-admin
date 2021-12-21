<template>
  <model-obj :src=model_src></model-obj>
</template>
<script>
import { ModelObj } from 'vue-3d-model';
export default {
  components: { ModelObj },
  data(){
    return {
      model_src: '@statics/models/obj/LeePerrySmith.obj',
    }
  }

}
</script>