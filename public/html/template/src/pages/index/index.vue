<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <div id="captcha1"></div>
    </div>
</template>

<script>
import Api from "api/index";
export default {
    name: "app",
    data() {
        return {

        }
    },
    components: {
        
    },
    computed: {
        
    },
    watch: {},
    methods: {
        
    },
    mounted() {

    }
}

</script>

<style lang="scss">
#index{

}
</style>
