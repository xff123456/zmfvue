<template>
    <div class="cart">
      <nav-bar class="nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>

      <!--商品的列表-->
        <cart-list/>

      <!--底部汇总-->
      <cart-bottom-bar/>
    </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
    export default {
        name: "Cart",
      components:{
        NavBar,
        CartList,
        CartBottomBar
      },
      computed:{
          cartLength(){
            return this.$store.state.cartList.length
          }
      }
    }
</script>

<style scoped>
 .nav-bar{
   background-color: var(--color-tint);
   color: #ffffff;
   font-weight: 700;
 }
  .cart{
    height: 100vh;
  }
</style>
