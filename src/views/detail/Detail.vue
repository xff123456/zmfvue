<template>
  <div id="detail">
<detail-nav-bar class="detail-nav" @titleclick="titleclick" ref="nav"/>

    <scroll class="content" ref="scroll"
           :probe-type="3" @scroll="contentScroll" @scrollEnd="backTopScroll">

    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
      <detail-image-info :detail-info="detailInfo"/>
      <detail-params-info ref="params" :param-info="paramInfo"/>
      <detail-comments-info ref="comments" :comment-info="commentsInfo"/>
      <goods-list ref="recommends" :goodsList="recommends"/>

    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backclick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {getDetail,Goods,Shop,getRecommend} from "network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentsInfo from "./childComps/DetailCommentsInfo";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "../../components/common/toast/Toast";
import BackTop from "../../components/content/backTop/BackTop";
import {debounce} from "@/common/utils.js";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImageInfo,
        DetailParamsInfo,
        DetailCommentsInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Toast
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentsInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            isShowBackTop:false,
            message:'',
            show:false
          }
      },

      activated() {

      },
      created() {
        //1.保存传入的iid
        this.iid=this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
          //1.获取顶部的图片轮播数据
          console.log(res);
          const data=res.data.result
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)


          //3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)

          //4.取出详情的信息
          this.detailInfo=data.detailInfo;

          //5.取出参数的信息
          this.paramInfo = data.itemParams

          //6.取出评论的信息
          if(data.rate.cRate !== 0){
          this.commentsInfo = data.rate.list[0]
          }



        })

        //3.请求推荐数据
        getRecommend().then(res =>{
          console.log(res);

          this.recommends = res.data.data.list

        })

        //4.给getThemeTopY
        this.getThemeTopY= debounce(() =>{
          this.themeTopYs=[]
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

        })
        },


  methods:{

        titleclick(index){
        this.getThemeTopY()
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)

        },
        contentScroll(position){
         //1.获取y值
          const positionY = -position.y

          //2.positionY的值和主题中值进行对比
          let length=this.themeTopYs.length
          for (var i = 0; i < length; i++) {
            if(this.currentIndex!==i && ((i<length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
              ||(i===length-1 && positionY>=this.themeTopYs[i]))){
              this.currentIndex=i;
              console.log(this.currentIndex)
              this.$refs.nav.currentIndex=this.currentIndex
            }
          }

        },
    //3.是否显示回到顶部
       backTopScroll(position){
         //1.判断backtop是否显示
         this.isShowBackTop = -(position.y) > 1000

       },
       backclick(){

      this.$refs.scroll.scrollTo(0,0,100)
    },
       addToCart(){
          //1.获取购物车需要展示的信息
         const product={}
         product.image=this.topImages[0]
         product.title=this.goods.title
         product.desc=this.goods.desc
         product.price=this.goods.realPrice
         product.iid=this.iid

         //2.将商品添加到购物车
        // this.$store.commit('addCart',product)
       this.$store.dispatch('addCart',product).then(res =>{
        this.show=true;
        this.message=res;
        setTimeout(() =>{
          this.show=false;
          this.message=''
        },1500)
       })
        }
      }
    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
  .content{
    height: calc(100% - 44px);
  }
</style>
