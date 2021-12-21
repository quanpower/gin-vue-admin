<template>
    <div style="width:100%;height: 100%;">
        <template v-if="numberConfig.name === 'loginUserCount'">
            <p class="colorBlue" style="font-size: .2rem;">{{numberConfig.title}}
<!--                (共{{totalUserCount}}人)-->
            </p>
        </template>
        <template v-else>
            <p class="colorBlue" style="font-size: .2rem;">{{numberConfig.title}}</p>
        </template>
        <div>
            <dv-digital-flop :config="numberConfig" style="width:1.25rem;height: .6rem;" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "topNumber",
        props:{
            numberConfig: {
                type:Object,
                default:()=>{
                    return{
                        title:'在线用户数',
                        name:'在线用户数',
                        number:[100],
                        content: '{nt}个',
                        style:{fontSize: 20}
                    }
                }
            },
            totalUserCount: {
                type:Number,
                default: 0,
            }
        },
    }
</script>

<style scoped>

</style>

