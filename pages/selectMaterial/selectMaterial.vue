<template>
	<div class="container">
		<view class="selectStore" @click="selectStore">
			<text>Store：广州太古里</text>
			<view class="arrowhead" />
		</view>
		<view class="search">
			<view class="search_box">
				<image
					src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg">
				</image>
				<input type="text" confirm-type="search" v-model="keyword" @confirm="searchClick(key)"
					@input="changeInput" :placeholder="defaultKeyword" />
				<!-- <image src="@/static/icon/del_text.png" v-show="keyword" @click="delKeyword()"></image> -->
			</view>
			<!-- <view class="search_btn" @click="searchClick(key)">搜索</view> -->
		</view>

		<view class="classbox">
			<!-- 左侧tabs -->
			<view class="tabs">
				<view class="tab alldisplay" :class="item.id==current?'active' :''" @click="select(item)"
					v-for="item in tabslist" :key="item.id">{{item.name}}</view>
			</view>
			<!-- 右侧cont -->
			<scroll-view scroll-y="true" style="height: 100vh;">
				<view class="conts">
					<view class="cont" v-for="item in contlist" :key="item.id" @click="tz(item.id,item.name,item)">
						<image :src="item.imgUrl" mode=""></image>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 分类弹窗 -->
		<category-mask v-if="categoryShow" :skuList="skuList" :categoryList="categoryList" :skuTitle="skuTitle"
			@getSearchProd="getProd" @closeSearch="closeSearch"></category-mask>
	</div>

</template>
<script>
	import categoryMask from "../../components/category-mask/index.vue"
	export default {
		components: { categoryMask },
		data() {
			// components: {
			// 	categoryMask
			// },
			return {
				categoryShow:false,
				current: 1,
				catchMove: true,
				show: false,
				tabslist: [{
					id: 1,
					name: '家具'
				}, {
					id: 2,
					name: '文具'
				}],
				contlist: [{
					imgUrl: "https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg",
					name: "家具"
				}, {
					imgUrl: "https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg",
					name: "家具"
				}],
				categoryList: [{
						categoryName: "办公耗材",
						isChoose: true
					},
					{
						categoryName: "办公家具",
						isChoose: false
					}
				],
				skuTitle: [{
						name: "日常店铺物料",
						isChoose: true
					},
					{
						name: "标签打印设备",
						isChoose: false
					}
				]
			}
		},
		onLoad() {
			// this.gettabslist()
			// setTimeout(()=>{
			// 	this.getcontlist(this.tabslist[0].id)
			// 	this.current =this.tabslist[0].id
			// },500)	
		},
		methods: {
			closeSearch(val){
				this.categoryShow = val
			},
			gettabslist() {
				this.$http.get('/app/goodsTypeCopy/parentList ', {}).then(res => {
					if (res.code == 200) {
						console.log(res.data);
						this.tabslist = res.data
					}
				})
			},
			selectStore() {

				this.categoryShow = true
				console.log(this.categoryShow)
			},
			select(item) {
				this.current = item.id
				this.getcontlist(this.current)

			},
			getcontlist(id) {
				this.$http.get('/app/goodsTypeCopy/moreListById', {
					id
				}).then(res => {
					if (res.code == 200) {
						this.contlist = res.data
					}
				})
			},
			tz(id, name, item) {
				if (this.current !== 2) {
					uni.navigateTo({
						url: '/pages/index/chuanglian?id=' + id + '&title=' + name
					})
				} else {
					console.log(item.isHaveSeries);
					if (item.isHaveSeries == 0) {
						uni.navigateTo({
							url: '/pages/index/chuanglian?id=' + id + '&title=' + name
						})
					} else {
						uni.navigateTo({
							url: '/pages/class/class2?id=' + id + '&title=' + name
						})
					}

				}

			}
		}
	}
</script>

<style lang="scss">
	.container {
		// padding: 0 20px;
	}

	.selectStore {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		text {
			font-size: 14px;
		}

		.arrowhead {
			width: 15rpx;
			height: 15rpx;
			border-top: 3rpx solid #000;
			border-right: 3rpx solid #000;
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
			margin-left: 10rpx;
		}
	}

	page {
		width: 100%;
	}

	.tabs {
		width: 30%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
	}

	.tab {
		width: 100%;
		height: 80rpx;
	}

	.conts {
		width: 100%;
		min-height: 10vh;
		padding: 26rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.active {
		background: #fff;
	}

	.cont {
		width: 150rpx;
		height: 200rpx;
		margin: 0 20rpx 60rpx 0;
	}

	.cont image {
		width: 150rpx;
		height: 160rpx;
	}

	.classbox {
		display: flex;
	}

	.name {
		font-size: 26rpx;
		text-align: center;
	}

	.search {
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
		font-size: 26rpx;

		// & > image {
		// 	width: 18rpx;
		// 	height: 31rpx;
		// 	margin-left: 53rpx;
		// }
		.search_box {
			display: flex;
			align-items: center;
			width: 100%;
			height: 60rpx;
			background-color: #ffffff;
			// box-shadow: 2rpx 2rpx 2rpx red;
			border-radius: 30rpx;

			// margin: 0 12rpx 0 25rpx;
			// padding-left: 18rpx;
			image:nth-child(1) {
				margin: 0 18rpx 0 7rpx;
				width: 28rpx;
				height: 28rpx;
			}

			image:nth-child(3) {
				margin: 0 14rpx 0 auto;
				width: 31rpx;
				height: 31rpx;
			}

			input {
				height: 60rpx;
				// letter-spacing: 4rpx;
				line-height: 60rpx;
				color: #969696;
			}
		}

		.search_btn {
			width: 96rpx;
			height: 52rpx;
			background-color: #fff;
			color: pink;
			border-radius: 26rpx;
			line-height: 52rpx;
			text-align: center;
		}
	}
</style>