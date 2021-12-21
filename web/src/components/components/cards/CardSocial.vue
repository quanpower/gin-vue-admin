<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm ">
        <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none q-ml-xs">
            <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`" class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section>
            <q-item-section class=" q-pa-md q-ml-none  text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>

            <q-item-section v-if="icon_position === 'right'" side class="q-mr-md text-white">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
            
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },
  computed: {
    items: function() {
      return this.icon_position === "left"
        ? [
            {
              title: "计划",
              icon: "person",
              value: "200",
              color1: "#5064b5",
              color2: "#3e51b5"
            },
            {
              title: "生产",
              icon: "fab fa-twitter",
              value: "50",
              color1: "#f37169",
              color2: "#f34636"
            },
            {
              title: "剩余",
              icon: "fab fa-google",
              value: "50",
              color1: "#ea6a7f",
              color2: "#ea4b64"
            },
            {
              title: "异常",
              icon: "bar_chart",
              value: "10",
              color1: "#a270b1",
              color2: "#9f52b1"
            }
          ]
        : [
            {
              title: "周产量",
              icon: "bar_chart",
              value: "67",
              color1: "#546bfa",
              color2: "#3e51b5"
            },
            {
              title: "月产量",
              icon: "fas fa-chart-bar",
              value: "420",
              color1: "#3a9688",
              color2: "#3e51b5"
            },
            {
              title: "年产量",
              icon: "fas fa-chart-line",
              value: "1321",
              color1: "#7cb342",
              color2: "#3e51b5"
            },
            {
              title: "人员数",
              icon: "person",
              value: "19",
              color1: "#f88c2b",
              color2: "#3e51b5"
            }
          ];
    }
  }
};
</script>
