<template>
    <div id="rightProvince">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span style="color:#5cd9e8">
                  <icon name="chart-pie"></icon>
                </span>
                <div class="d-flex">
                    <span class="fs-xl text mx-2">省级提交率</span>
                    <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;"/>
                </div>
            </div>
            <div class="d-flex jc-center">
                <dv-charts style="width:3.25rem;height:3.25rem;margin-top: .5rem;" class="ring-charts"
                           :option="options"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rightProvince",
        data() {
            return {
                options: {
                    series: [
                        {
                            type: 'gauge',
                            startAngle: -Math.PI / 2,
                            endAngle: Math.PI * 1.5,
                            arcLineWidth: 5,
                            radius: '90%',
                            data: [
                                {name: '省级提交率', value: 80, gradient: ['#03c2fd', '#1ed3e5', '#2fded6']}
                            ],
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            pointer: {
                                show: false
                            },
                            dataItemStyle: {
                                lineCap: 'round'
                            },
                            details: {
                                show: true,
                                formatter: '{value}%',
                                style: {
                                    fill: '#1ed3e5',

                                }
                            }
                        }
                    ],
                    color: ['#03d3ec']
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    #rightProvince {
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
