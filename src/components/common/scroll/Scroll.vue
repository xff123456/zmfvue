<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>

  import  BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
          probeType: {
            type:Number,
            default:0
          },
          pullUpLoad: {
            type: Boolean,
            default: false
          }
      },
      data(){
          return{
            scroll:null
          }
      },

      mounted() {
          //1.创建betterscroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          refresh:true,
          click:true,
          mouseWheel:true,
          observeDOM:true,
          pullUpLoad:this.pullUpLoad,
          observeImage:true
        })

        //2.监听滚动的位置
        if(this.probeType===2 || this.probeType===3){
          this.scroll.on('scroll',(position) =>{
            this.$emit('scroll',position)

          })
        }

        if(this.probeType===2 || this.probeType===3){
          this.scroll.on('scrollEnd',(position) =>{
            this.$emit('scrollEnd',position)

          })
        }

        if(this.probeType===2 || this.probeType===3){
          this.scroll.on('scrollStart',(position) =>{
            this.$emit('scrollStart',position)

          })
        }



        //3. 监听上拉加载更多
        if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')

          })
        }

      },
      methods:{
        refresh(){
          this.scroll.refresh()


        },
      scrollTo(x,y,time=300){
         this.scroll.scrollTo(x,y,time)
      },
        finishPullUp(){
       this.scroll && this.scroll.finishPullUp()
        },

        getScrollY(){
        return this.scroll ? this.scroll.y : 0
        }
      }
    }
</script>

<style scoped>

</style>
