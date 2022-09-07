<template>
  <view>
    <view class="topSearch"><view class="search_btn">搜索</view></view>
    <!-- 轮播图 -->
    <view>
      <swiper :circular="true" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
        <swiper-item v-for="item in swiper" :key="item.goods_id">
          <view @click="goGoodsDatil(item.goods_id)" class="swiper-item"><image :src="item.image_src" mode="widthFix"></image></view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 导航 -->
    <view class="nav-list">
      <view @click="clickNav(item)" class="nav-item" v-for="(item, i) in navList" :key="i"><image :src="item.image_src" class="nav-img"></image></view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box"><image class="left-img" :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image></view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getBanners, getNavList, getFloorList } from '@/api/index.js';
export default {
  data() {
    return {
      swiper: [],
      navList: [],
      floorList: []
    };
  },
  methods: {
    // 获取轮播图
    async loadBanners() {
      const res = await getBanners();
      this.swiper = res;
    },
    // 获取导航列表
    async loadNavList() {
      const res = await getNavList();
      this.navList = res;
    },
    // 获取楼层数据
    async loadFloorList() {
      const res = await getFloorList();
      this.floorList = res;
    },
    // 轮播图跳转到商品列表
    goGoodsDatil(id) {
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?id=${id}`
      });
    },
    // 导航分类跳转
    clickNav(item) {
      if (item.name == '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    }
  },
  onLoad() {
    this.loadBanners();
    this.loadNavList();
    this.loadFloorList();
  }
};
</script>

<style lang="scss">
.topSearch {
  width: 750rpx;
  height: 70px;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .search_btn {
    width: 400rpx;
    height: 30px;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 轮播图
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
// 导航
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
//楼层
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .left-img {
    height: 392rpx !important;
  }
}
</style>
