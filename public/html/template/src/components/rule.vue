<template>
    <div class="rule_mask">
    </div>
</template>

<script>
    import Api from "api/index";
    import * as common from 'common/common';

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
    }
</style>