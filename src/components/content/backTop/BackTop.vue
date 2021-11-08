<template>
  <div class="back-top" @click="backclick">
    <img src="~assets/img/common/backTop.png" alt="">
  </div>
</template>

<script>
    export default {
        name: "BackTop",
      methods:{
        backclick(){
          this.$emit('backclick')

        }
      }
    }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 65px;
  }

  .back-top img{
    width: 36px;
    height: 36px;
  }
</style>
