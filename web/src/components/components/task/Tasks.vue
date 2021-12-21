<template>
  <div class="col-3 q-px-xs">
    <q-card class="q-pa-xs custom_bg2 ">
      <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
        <q-item-section class="text-h8 text-color">{{workOrder}}
        </q-item-section>
        <!-- <q-item-section avatar>
          <q-icon name="more_vert" class="cursor-pointer">
            <q-menu transition-show="fade" transition-hide="fade">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Remove</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Option 1</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Option 2</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </q-item-section> -->
      </q-item>

      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        :style="{'height': '600px'}"
        class="col"
        ref="first"
      >
        <!-- <draggable
          class="list-group"
          :list="completed_task"
          group="tasks"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        > -->
          <q-card
            v-for="(item, index) in data"
            v-bind:key="index"
            class="rounded-borders q-my-sm"
            @mouseover="task_selected_index.completed = index"
            @mouseleave="task_selected_index.completed = null"
          >
            <q-card-section class="row q-pa-sm">
              <div class="col-12">
                <span class="q-ml-sm text-h8">{{item.title}}</span>
                <!-- <span class="float-right text-grey-8 q-mt-sm">{{item.label}} -->
                <!-- <q-icon
                  filled
                  size="xs"
                  name="close"
                  class="absolute-top-right q-mr-md q-mt-xs text-red"
                  v-if="index==task_selected_index.completed"
                  @click="deleteTask('completed', task_selected_index.completed)"
                /> -->
                <!-- </span> -->
              </div>
            </q-card-section>
            <q-card-section class="q-pa-sm">
              <q-chip dense v-for="(tag, index) in item.tags" :key="index" :color="tag.color" text-color="white">
                {{tag.name}}
              </q-chip>
            </q-card-section>
            <!-- <q-card-section class="q-pa-sm text-grey-8">
              {{item.description}}
            </q-card-section> -->
          </q-card>
        <!-- </draggable> -->

      </q-scroll-area>

    </q-card>
    <!-- <q-resize-observer @resize="onResize"/> -->
  </div>
</template>

<script>
    // import Vue from "vue";
    // import draggable from "vuedraggable";
    // Vue.component("draggable", draggable);

  export default {
    name: "Tasks",
    props: ['data','workOrder'],
    data() {
      return {
            task_selected_index:{
                blocked: null,
                completed: null,
                planned: null,
                wip: null
            },
            thumbStyle: {
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#4facfe',
                width: '5px',
                opacity: 0.75
            },
            add_model: {
                blocked: false,
                completed: false,
                planned: false,
                wip: false
            },
            add_data: {
                blocked: {},
                completed: {},
                planned: {},
                wip: {}
            },
            barStyle: {
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#027be3',
                width: '9px',
                opacity: 0.2
            },
            size: {},
      }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        getHeight() {
            return this.size.height - 90 + 'px'
        }
    },
    methods: {
      getColor(val) {
        if (val > 70 && val <= 100) {
          return 'green'
        } else if (val > 50 && val <= 70) {
          return 'blue'
        }
        return 'red'
      },
      onResize(size) {
          this.size = size
          console.log(this.size)
      }, 
    },

  }
</script>

<style scoped>
  .custom_bg {
    background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
  }

  .custom_bg2 {
    background-image: linear-gradient(to bottom , #4b86b9 0%, #00f2fe 100%);
  }

  .custom_bg3 {
    background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  }

  .custom_bg4 {
    background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
  }

  .text-color {
    color: white
  }
</style>
