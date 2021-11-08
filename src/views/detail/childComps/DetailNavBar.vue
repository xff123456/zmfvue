<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
        :class="{active: index === currentIndex}" @click="titleclick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      components:{
        NavBar
      },
      data(){
          return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
          }
      },
      methods:{
        titleclick(index){
          this.currentIndex = index
          this.$emit('titleclick',index);
        },
        backclick(){
          this.$router.back()
        }
      }

    }
</script>

<style scoped>
.title{
display: flex;
  font-size: 12px;
}
  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

  .back img{
width: 20px;
    height: 20px;
    margin-top: 12px;
  }
</style>
