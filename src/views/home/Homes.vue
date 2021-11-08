<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精品']"
                   @tabclick="tabclick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

      <scroll class="content" ref="scroll" :probe-type="3"
              @scroll="contentscroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" ref="hSwiper" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精品']"
      @tabclick="tabclick" ref="tabControl2" />
      <goods-list :goodsList="showGoodsList"/>
      </scroll>

      <back-top @click.native="backclick" v-show="isShowBackTop"/>
    </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";

  import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeData} from "network/home";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";


  export default {
        name: "Homes",
      components:{
          NavBar,
       HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop

      },
    data(){
         return{
           banners:[],
           recommends:[],
           goodsList:{
             'pop':{page:0,list:[]},
             'new':{page:0,list:[]},
             'sell':{page:0,list:[]},
           },
           currentType:'pop',
           isShowBackTop:false,
           tabOffsetTop:0,
           isTabFixed:false,
           saveY:0
         }
    },

      computed:{
        showGoodsList(){
          return this.goodsList[this.currentType].list
        }
      },
    destroyed() {
      console.log('hhh');

    },
    activated() {
      this.$refs.scroll.refresh()
     this.$refs.scroll.scrollTo(0,this.saveY,0)

    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
    },
    created() {
      //1.请求多个数据
      this.getMultiData()
       //2.请求商品数据
        this.getHomeProducts('pop')
      this.getHomeProducts('new')
      this.getHomeProducts('sell')


    },

    mounted() {
      //1.监听item中图片加载完成事件监听
      const refresh=this.debounce(this.$refs.scroll.refresh,200)

      this.$bus.$on('itemimageLoad',() =>{
       refresh()
      })


    },

    methods:{
      /*
      *事件监听相关的方法
      * */

      debounce(func,delay){
        let timer=null
        return function (...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
         func.apply(this,args)
          },delay)
        }
      },

      tabclick(index){
         //console.log(index)
        switch (index) {
         case 0:
           this.currentType='pop'
                break
          case 1:
            this.currentType='new'
                break
          case 2:
            this.currentType='sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },


      backclick(){

     this.$refs.scroll.scrollTo(0,0,100)
      },

      contentscroll(position){
        //1.判断backtop是否显示
       this.isShowBackTop = -(position.y) > 1000

        //2.决定tabcontrol是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) >this.tabOffsetTop
      },

      loadMore(){
       this.getHomeProducts(this.currentType)
      },

      swiperImageLoad(){

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /*
      * 网络请求相关的方法
      * */
      getMultiData(){
        getHomeMultidata().then(res => {
          console.log(res);

          //this.result=res;
          this.banners=res.data.data.banner.list;
          this.recommends=res.data.data.recommend.list;
        })

      },
      getHomeProducts(type){
        const page =this.goodsList[type].page+1
        getHomeData(type,page).then(res => {
         this.goodsList[type].list.push(...res.data.data.list)
          this.goodsList[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

      activated: function (){
        this.$refs.hSwiper.startTimer()

      },
      deactivated: function () {
        this.$refs.hSwiper.stopTimer()
      },
    }

  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/

  }
   .home-nav{
     background-color: var(--color-tint);
     color: #ffffff;

     /*position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 9;*/
   }

   .tab-control{
     position: relative;
     z-index: 8;
   }

  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }


</style>
