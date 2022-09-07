<template>
  <view>
    <van-card
      :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`"
      :thumb="item.goods_small_logo || defaultPic"
      v-for="item in goods"
      :key="item.goods_id"
      :price="item.goods_price | toFixed"
      :title="item.goods_name"
    />
    <view v-if="this.goods.length == this.total">正在加载</view>
  </view>
</template>

<script>
import { getGoodsListApi } from '@/api/index.js';
import toast from '@/utils/toast.js';
export default {
  data() {
    return {
      // 请求参数对象
      queryData: {
        // 查询关键词
        query: '',
        // 商品分类Id
        cid: '',
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10
      },
      goods: [],
      total: '',
      // 默认的空图片
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      isLoading: false
    };
  },
  methods: {
    // 获取商品列表信息
    async getGoodsList(stpd) {
      this.isLoading = true;
      const { goods, total } = await getGoodsListApi(this.queryData);
      this.goods = [...this.goods, ...goods];
      this.total = total;
      // 有的话 停止下拉刷新
      stpd && stpd();
      this.isLoading = false;
    }
  },
  onLoad({ query }) {
    this.queryData.query = query;
    this.getGoodsList();
  },
  // 下拉刷新的事件
  onPullDownRefresh() {
    // 1. 重置关键数据
    (this.queryData = {
      // 查询关键词
      query: '',
      // 商品分类Id
      cid: '',
      // 页码值
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 10
    }),
      (this.goods = []);
    this.total = 0;
    toast.success('刷新成功', 1500);
    // 2. 重新发起请求
    this.getGoodsList(() => uni.stopPullDownRefresh());
  },
  // 触底的事件
  onReachBottom() {
    if (this.goods.length == this.total || this.goods.length > this.total) return toast('已经在最底部啦~');
    if (this.isLoading) return;
    // 让页码值自增 +1
    this.queryData.pagenum += 1;
    // 重新获取列表数据
    this.getGoodsList();
  }
};
</script>

<style></style>
