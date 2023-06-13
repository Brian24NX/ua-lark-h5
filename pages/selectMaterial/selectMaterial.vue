<template>
	<view>
		<view class="container">
			<view class="headerFix">
				<view class="store" @click="selectStore">
					<view class="store_l">
						<image src="../../static/store.png" mode=""></image>
						<text>{{store.title?`${this.$t('index.store')}：${store.title}`:`${this.$t('index.store')}`}}</text>
					</view>
					<image class="store_r" src="../../static/right.png" mode=""></image>
				</view>
				<search-bar @searchClick="searchClick"></search-bar>
				<view class="tabs" v-if="!hideTab">
					<!-- <view class="tab active" @click="toggleTab('all')">全部</view> -->
					<view :class="['tab',item.cid==current?'active' :'']" v-for="(item,index) in categoryList" :key="index" @click="toggleTab(item)">
						{{item.categoryName}}
					</view>
					<view class="tab" @click="choose">{{this.$t('index.more')}}
						<image src="../../static/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<tab-category @getMaterial='getContlist' :hideTab="hideTab" :tabslist="tabslist" :contlist="contlist"
				@showDetail="showDetail" keep-alive></tab-category>

		</view>
		<!-- 分类弹窗 -->
		<category-mask v-if="categoryShow" :skuList="skuList" :categoryList="categoryList" :skuTitle="skuTitle"
			@getSearchProd="getProd" @closeSearch="closeSearch"></category-mask>
		<!-- 提交 -->
		<view class="submit" :style="clearShow?'z-index:100':'z-index:101'">
			<view class="submit_left">
				<image src="../../static/car.png" mode="" @click="showCar"></image>
				<view class="price">334.00 <text class="suffix">CNY</text></view>
			</view>
			<view class="submit_right" @click="onSubmit">
				{{this.$t('index.submit')}}
			</view>
		</view>
		<!-- 物料车 -->
		<car-detail v-if="show" @hideDetail="hideDetail" :contlist="contlist" @showDialog='showDialog'></car-detail>
		<!-- 确认弹窗 -->
		<public-dialog v-if="clearShow" @hideDialog="dialogHide" />
	</view>
</template>
<script>
	import categoryMask from "../../components/category-mask/index.vue"
	import tabCategory from "../../components/tab-category/index.vue"
	import carDetail from "../../components/car-detail/index.vue"
	import publicDialog from "../../components/public-dialog/index.vue"
	import searchBar from "../../components/search-bar/index.vue"
	export default {
		components: {
			categoryMask,
			tabCategory,
			carDetail,
			publicDialog,
			searchBar
		},
		data() {
			return {
				clearShow: false,
				hideTab: false,
				keyword: "",
				store: {},
				categoryShow: false,
				current: 1,
				catchMove: true,
				show: false,
				// 物料列表
				contlist: [],
				// 大分类
				categoryList: [],
				// 二级分类
				tabslist: [],

				skuTitle: [{
						name: "日常店铺物料",
						isChoose: true
					},
					{
						name: "标签打印设备",
						isChoose: false
					}
				],
				pageNum: 1,
				pageSize: 10,
				param: {
					costPrice: 0,
					createTime: "",
					image: 0,
					imageUrl: "",
					materialName: "",
					mid: 0,
					oriSkuCode: "",
					priceUnit: "",
					retailPrice: 0,
					shortName: "",
					specifications: "",
					status: true,
					supplierCode: "",
					supplierName: "",
					tenantCode: "",
					uaSkuCode: "",
					unit: "",
					updateTime: ""
				}
			}
		},
		onLoad() {
			// let systemInfo = uni.getSystemInfoSync();

			// console.log(systemInfo)
			this.gettabslist()
			setTimeout(() => {
				this.getSubCategory(this.categoryList[0].cid)
			}, 500)
		},
		onShow() {
			let that = this
			uni.$on('returnData', function(data) {
				console.log(data)
				that.store = data
			})
		},

		methods: {
			showDialog(val) {
				this.clearShow = val
				this.show = false
			},
			dialogHide(val) {
				this.clearShow = false
			},
			searchClick(key) {
				if (key) {
					this.keyword = key
					this.hideTab = true
				} else {
					this.hideTab = false
				}
			},
			showCar() {
				this.show = true
			},
			onSubmit() {
				uni.navigateTo({
					url: "/pages/previewApplication/previewApplication"
				})
			},
			hideDetail(val) {
				this.show = val
			},
			showDetail(val) {
				this.show = val
			},
			choose() {
				this.categoryShow = true
			},
			toggleTab(item) {
				console.log(item)
				this.current = item.cid
				this.getSubCategory(item.cid)
			},
			closeSearch(val) {
				this.categoryShow = val
			},
			// 获取大分类列表
			gettabslist() {
				this.$api.getMaterialCategory({
					id: 0
				}).then(res => {
					if (res.code == '200') {
						res.data.forEach((item, index) => {
							isChoose: false
						})
							this.categoryList= res.data
					}

				})
			},
			selectStore() {
				uni.navigateTo({
					url: "/pages/storeList/storeList"
				})
			},
			// 获取二级分类列表
			getSubCategory(id) {
				this.$api.getMaterialCategory({
					id: id
				}).then(res => {
					if (res.code == '200') {
						res.data.forEach((item, index) => {
							isChoose: false
						})
					this.tabslist = res.data
					this.getContlist(this.tabslist[0].cid)
					}

				})
			},
         getContlist(id){
			 this.param.categoryId = id
			 let param = {
			 	pageNum: this.pageNum,
			 	pageSize: this.pageSize,
			 	param: this.param
			 }
			 this.$api.searchMaterial(param).then(res => {
			 	if (res.code == '200') {
			 		this.contlist = res.data.data
			 	}
			 })
		 }
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 140rpx;
	}

	.store {
		background-color: #F0F0F0;
		font-size: 32rpx;
		color: #000000;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 28rpx 26rpx 22rpx;
		border-bottom: 2rpx solid #ddd;

		.store_l {
			display: flex;
			align-items: center;

			image {
				width: 52rpx;
				height: 52rpx;
				margin-right: 6rpx;
			}
		}

		.store_r {
			width: 12rpx;
			height: 18rpx;
		}
	}

	.submit {
		width: -webkit-fill-available;
		position: fixed;
		bottom: 0;
		height: 138rpx;
		background: #111111;
		border-radius: 40rpx;
		margin: 0 30rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.submit_left {
			display: flex;
			align-items: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.price {
				font-size: 36rpx;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 48rpx;
				margin: 0 12rpx;

				.suffix {
					font-size: 20rpx;
					color: #FFFFFF;
					line-height: 28rpx;
					margin-left: 10rpx;
				}
			}


		}

		.submit_right {
			width: 176rpx;
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #111111;
			line-height: 80rpx;
			text-align: center;
		}
	}

	.headerFix {
		position: sticky;
		top: 0;
		z-index: 3;
		background-color: #F0F0F0;
	}

	page {
		width: 100%;
	}

	.tabs {
		display: flex;
		font-size: 18px;
		padding: 38rpx 0rpx 32rpx 30rpx;
		width: max-content;
		align-items: center;
		margin-right: 28rpx;

		.tab {
			position: relative;
		}

		.tab:not(:last-child) {
			margin-right: 44rpx;
			font-size: 28rpx;
			color: #999999;
			line-height: 40rpx;
		}

		.tab:last-child {
			position: absolute;
			right: 0;
			background-color: #F0F0F0;
			padding-left: 20rpx;
			border-left: 2rpx solid #000;
			font-size: 28rpx;
			color: #000000;
			line-height: 32rpx;
			padding-right: 28rpx;

			image {
				width: 22rpx;
				height: 20rpx;
			}
		}

		.active {
			font-weight: bold;
			color: #111 !important;

			&::after {
				display: inline-block;
				content: "";
				position: absolute;
				left: 0;
				bottom: -16rpx;
				border: 4rpx solid #111;
				min-width: -webkit-fill-available;
			}
		}
	}
</style>