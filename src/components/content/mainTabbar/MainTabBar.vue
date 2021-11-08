<template>
    <Tabbar>
        <TabBarItem path="/homes" activeColor="green">

            <i  slot="item-icon" class="iconfont">&#xe618;</i>
            <i  slot="item-icon-active" class="iconfont">&#xeb39;</i>

            <span slot="item-text">首页</span>

        </TabBarItem>
        <TabBarItem path="/category" activeColor="green">

            <i slot="item-icon" class="iconfont">&#xe628;</i>
            <i  slot="item-icon-active" class="iconfont">&#xeaaa;</i>
            <span slot="item-text">分类</span>

        </TabBarItem>
        <TabBarItem path="/cart" activeColor="green">

            <i slot="item-icon" class="iconfont">&#xe61a;</i>
            <i  slot="item-icon-active" class="iconfont">&#xe640;</i>
            <span slot="item-text">购物车</span>

        </TabBarItem>
        <TabBarItem path="/profile" activeColor="green">

            <i slot="item-icon" class="iconfont">&#xe657;</i>
            <i  slot="item-icon-active" class="iconfont">&#xe632;</i>
            <span slot="item-text">我的</span>

        </TabBarItem>
    </Tabbar>
</template>

<script>

    import Tabbar from "../../common/tabbar/Tabbar";
    import TabBarItem from "../../common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components:{
            Tabbar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>
