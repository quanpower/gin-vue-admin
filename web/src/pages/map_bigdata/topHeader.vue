<template>
    <div id="top-header">
        <dv-decoration-8 class="header-right-decoration"/>
        <dv-decoration-10 class="header-left-decoration"/>
        <dv-decoration-6 class="header-center-decoration" :color="['#50e3c2', '#67a1e5']" style="height:.1rem;"/>
        <dv-decoration-10 class="header-left-decoration" style="transform: rotateY(180deg);"/>
        <dv-decoration-8 class="header-right-decoration" :reverse="true"/>
        <div class="center-title">全国设备监测平台</div>
    </div>
</template>

<script>
    export default {
        name: "topHeader"
    }
</script>

<style lang="scss" scoped>
    #top-header {
        position: relative;
        width: 100%;
        /*height: 100px;*/
        display: flex;
        justify-content: space-between;
        flex-shrink: 0;

        .header-center-decoration {
            width: 40%;
            height: 1rem;
            margin-top: .8rem;
        }

        .header-left-decoration, .header-right-decoration {
            width: 25%;
            height: 1rem;
        }

        .center-title {
            position: absolute;
            font-size: .4rem;
            font-weight: bold;
            left: 50%;
            top: .4rem;
            transform: translateX(-50%);
        }
    }
</style>
