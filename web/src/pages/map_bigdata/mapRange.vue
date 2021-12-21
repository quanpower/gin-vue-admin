<template>
    <div class="body">
        <div id="container"></div>
        <div class="input-card">
            <h4>下属行政区查询</h4>
            <div class="input-item">
                <div class="input-item-prepend"><span class="input-item-text">省</span></div>
                <select id='province' style="width:100px" @change='search("province")'></select>
            </div>
            <div class="input-item">
                <div class="input-item-prepend"><span class="input-item-text">市</span></div>
                <select id='city' style="width:100px" @change='search("city")'></select>
            </div>
            <div class="input-item">
                <div class="input-item-prepend"><span class="input-item-text">县</span></div>
                <select id='district' style="width:100px" @change='search("district")'></select>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "mapRange",
        data() {
            return {}
        },
        mounted() {

        },
        computed: {},
        methods: {
            search(area) {
                this.$emit('change', area);
            },
        }
    }
</script>

<style lang="scss" scoped>

    .input-card {
        position: absolute;
        top: 1.5rem;
        right: .5rem;
        z-index: 9999;

        h4 {
            margin-bottom: .1rem;
        }

        .input-item {
            display: flex;
            align-items: center;
            margin-bottom: .1rem;

            .input-item-prepend {
                margin-right: .1rem;
            }
        }
    }
</style>
