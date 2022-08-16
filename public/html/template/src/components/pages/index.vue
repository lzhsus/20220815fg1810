<template>
    <div id="index">
        路由首页
    </div>
</template>
<script>
    import Api from "api/index";
    import moment from "moment";
    import * as common from "common/common";
    import AppData from "common/AppData";

    export default {
        name: "app",
        data() {
            return {
                pageShow:false,
            }
        },
        components: {  },
        computed: { },
        watch: {
            $route: {
                handler(newVal, oldVal) {
                },
                deep: true
            }
        },
        methods: {
        },
        async mounted() {
            Api.count().then(res=>{
                
            })
        }
    }
</script>

<style lang="scss">

</style>
