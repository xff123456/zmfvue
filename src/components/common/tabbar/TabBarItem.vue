<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot  name="item-icon"></slot></div>
        <div v-else :class="{active:isActive}"> <slot name="item-icon-active"></slot></div>

        <div :style="activeStyle" ><slot  name="item-text"></slot></div>

    </div>





</template>

<script>
    export default {
        name: "TabBarItem",
        data(){
            return{
               // isActive:true
            }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !==-1
            },
            activeStyle(){
               return this.isActive ? {color: this.activeColor} : {}
            }
        },
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        methods:{
            itemClick(){
               this.$router.replace(this.path)
            }


        }
    }

</script>

<style scoped>
    .tab-bar-item{
        height: 49px;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0px -2px 1px rgba(100,100,100,0.1);
    }

    .active{
        color: deepskyblue;

    }
</style>