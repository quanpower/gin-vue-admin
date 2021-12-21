<template>
    <div id="rightCounty">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-bar"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">县级提交率</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div class="d-flex jc-center">
                <dv-water-level-pond style="width: 3.25rem;height:3.25rem;margin-top: .5rem;" :config="config" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rightCounty",
        data() {
            return {
                config: {
                    data: [60],
                    shape: 'round',
                    waveHeight: 15,
                    waveNum: 2,
                },

            }
        },
    }
</script>

<style lang="scss" scoped>
    #rightCounty {
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
    }
</style>
