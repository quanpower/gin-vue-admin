<template>
    <div id="leftLoops">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-line"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">区县上报情况</span>
                </div>
            </div>

            <div class="d-flex jc-center body-box">
                <dv-scroll-board class="leftLoop" :config="config" @click="onCountyRowClick" style="width: 100%;height:4.1rem"/>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                countyCheckData: [],
                config: {
                    header: ["区县", "提交情况"],
                    rowNum: 6, //表格行数
                    headerHeight: 35,
                    headerBGC: "#0f1325", //表头
                    oddRowBGC: "#0f1325", //奇数行
                    evenRowBGC: "#171c33", //偶数行
                    index: true,
                    columnWidth: [60],
                    align: ["center"],
                    data: [],
                }
            };
        },
        mounted() {
            this.setData();
        },
        methods: {
            setData() {
                this.config.data = [
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                    ['县级名称', "<span class=" + 'color' + Math.round(Math.random()) + ">" + (Math.round(Math.random()) ? '已提交' : '未提交') + "</span>"],
                ];

            },
            onCountyRowClick(row){
                console.log(row);
            }
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep#leftLoops {
        padding: 0.2rem;
        height: 5rem;
        border-radius: 0.0625rem;

        .bg-color-black {
            height: 4.2rem;
            border-radius: 0.125rem;
        }

        .text {
            color: #c3cbde;
        }

        .color0 {
            color: #ff5722;
        }

        .color1 {
            color: #409EFF;
        }
    }

</style>
