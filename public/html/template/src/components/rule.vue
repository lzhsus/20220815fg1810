<template>
    <div class="rule_mask">
        <div class="rule_center">
            <div class="rule_top"></div>
            <div class="rule-img"><img src="~@/static/images/pop/rule-mask2.png" class="img100"/></div>
            <div class="rule_back" @click="closemask()"></div>
        </div>
    </div>
</template>

<script>
    import Api from "api/index";
    import * as common from 'common/common';
    import Swiper from 'vendor/plugins/swiper';

    export default {
        name: "app",
        props: [],
        data() {
            return {

            }
        },
        components: {},
        methods: {
            closemask() {
                this.$emit("closemask")
            }

        },

        async mounted() {
           
        }
    }
</script>

<style lang="scss">
    .rule_mask {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(#000000, 0.7);
        z-index: 99;
        overflow: hidden;
        .rule_center {
            width: 598px;
            height: 1156px;
            background: url('~@/static/images/pop/rule-mask3.png') no-repeat center top;
            background-size: 100% auto;
            z-index: 99;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .rule-img{
                width: 524px;
                height: 910px;
                overflow-y: scroll;overflow-x: hidden;
                -webkit-overflow-scrolling:touch;
                border-radius: 20px;
                margin: 110px auto 0;
            }
            .rule_top{
                width: 100px;
                height: 100px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 0px;
            }
            .rule_back {
                width: 100px;
                height: 100px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -20px;
            }
        }

    }
</style>