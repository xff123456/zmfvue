<template>
<div class="cart-list">
  <scroll class="sc" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
  </scroll>

</div>

</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    import CartListItem from "./CartListItem";
    export default {
        name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed:{
        cartList(){
          return this.$store.state.cartList
        }
      },
      activated() {
          this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>

  .cart-list{

    height: calc(100vh - 44px - 49px);
  }
.sc{
  height: 100%;
  overflow: hidden;
}
</style>
