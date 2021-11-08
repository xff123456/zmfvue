<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
    export default {
        name: "CartBottomBar",
      components:{
        CheckButton
      },
      computed:{
        totalPrice(){
         return '￥' + this.$store.state.cartList.filter(item =>{
           return item.checked
         }).reduce((preValue,item) =>{
         return preValue + item.price * item.count
         },0).toFixed(2)
          },
        checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
         // return !(this.$store.state.cartList.filter(item => !item.checked).length)
          if(this.$store.state.cartList.length ===0)return false
          return !this.$store.state.cartList.find(item => !item.checked)
        }
      },
      methods:{
        checkClick(){
         if(this.isSelectAll){ //全部选中
           this.$store.state.cartList.forEach(item => item.checked=false)
         }else {
           this.$store.state.cartList.forEach(item => item.checked=true)
         }

        }
      }
    }
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  /*width: 100%;*/
  background-color: #eee;
  position: relative;
  bottom: 40px;
  line-height: 30px;
  display: flex;

}

.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;

}
  .check-button{
    width: 26px;
    height: 26px;
    line-height: 20px;
    margin-bottom: 24px;

  }


  .price{
    margin-left: 30px;
    margin-top: 5px;
    flex: 1;
  }

  .calculate{
    width: 110px;
    height: 100%;
    background: red;
    margin-left: 140px;
    margin-top: 5px;
    text-align: center;
    color: #ffffff;
  }

</style>
