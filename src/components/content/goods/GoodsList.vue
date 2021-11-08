<template>
  <div class="goods">
<goods-list-item v-for="item in goodsList" :goods-item="item" :key="item.index"/>

  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
      components:{
          GoodsListItem
      },
      props:{
          goodsList:{
            type:Array,
            default(){
              return[]
            }
          }
      }
    }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }


</style>
