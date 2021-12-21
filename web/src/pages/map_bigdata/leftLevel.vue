<template>
    <div id="leftLevel">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-bar"></icon>
                </span>
                <div class="d-flex">
                    <template v-if="areaDataObj.areaLevel === 'province'">
                        <span class="fs-xl text mx-2">{{areaDataObj.areaName}}</span>
                    </template>
                    <template v-else>
                        <span class="fs-xl text mx-2">河南省</span>
                    </template>
                    <dv-decoration-1 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div id="parent" style="height:4.28rem;overflow: scroll;">
                <div class="scroll-box">
                    <template v-for="(item,index) in 10">
                        <div style="padding:.1rem;" :key="index">
                            <div style="margin-bottom: .05rem;">{{config.name}}</div>
                            <div class="d-flex">
                                <dv-percent-pond :config="config" style="flex-grow:1;height:.15rem;font-size:.1rem;"/>
                                <div style="margin-left: .1rem;">{{config.done + '/' + config.all}}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "leftLevel",
        props: {
            areaData: {
                type: Object,
                default: () => {}
            },
        },
        watch:{
            areaData(val){
                this.areaDataObj = val;
            }
        },
        data() {
            return {
                areaDataObj: {
                    areaCode: "410000",
                    areaLevel: "province",
                    name: "河南省",
                    areaName: "河南省",
                },
                config: {
                    name: '市级名称',
                    value: 40,
                    lineDash: [1, 0],
                    borderWidth: 2,
                    borderGap: -1,
                    borderRadius: 2,
                    colors:['#01c4f9', '#c135ff'],
                    done: 10,
                    all: 20,
                    formatter: '',//{value}%
                },
            }
        },
        mounted() {
            this.sliderScroll();
        },
        methods: {
            sliderScroll() {
                let scroll = document.getElementsByClassName("scroll-box");
                let parent = document.getElementById('parent');
                let time = setInterval(function () {
                    // console.log(parent.scrollTop)
                    parent.scrollTop++;
                }, 100);
                scroll[0].addEventListener("mouseover", function () {
                    clearInterval(time);
                });
                scroll[0].addEventListener("mouseout", function () {
                    time = setInterval(function () {
                        parent.scrollTop++;
                    }, 100);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    #leftLevel {
        padding: 0.2rem;
        height: 5.125rem;
        min-width: 3.75rem;
        border-radius: 0.0625rem;

        .bg-color-black {
            height: 4.8125rem;
            border-radius: 0.125rem;
        }

        .text {
            color: #c3cbde;
        }
        #parent::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }

        #parent {
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
