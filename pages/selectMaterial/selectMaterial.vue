<template>
	<div>
		<div class="container">
			<div class="headerFix">
				<nav-header :lang="lang"></nav-header>
				<van-cell :title="store" is-link  @click="selectStore" />
				<view class="search">
					<view class="search_box">
						<image
							src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg">
						</image>
						<input type="text" confirm-type="search" v-model="keyword" @confirm="searchClick(keyword)"
							placeholder=" Please enter material name/code" />
						<!-- <image src="@/static/icon/del_text.png" v-show="keyword" @click="delKeyword()"></image> -->
					</view>
				</view>
				<div class="tabs" v-if="!hideTab">
					<div class="tab" @click="toggleTab('all')">全部</div>
					<div class="tab" @click="toggleTab('material')">办公耗材</div>
					<div class="tab" @click="toggleTab('furniture')">办公家具</div>
					<div class="tab" @click="choose">{{this.$t('index.more')}}</div>
				</div>
			</div>

			<tab-category @getMaterial='getData' :hideTab="hideTab" :tabslist="tabslist" :contlist="contlist"
				@showDetail="showDetail" keep-alive></tab-category>

		</div>
		<!-- 分类弹窗 -->
		<category-mask v-if="categoryShow" :skuList="skuList" :categoryList="categoryList" :skuTitle="skuTitle"
			@getSearchProd="getProd" @closeSearch="closeSearch"></category-mask>
		<!-- 提交 -->
		<van-submit-bar :price="3050" custom-class="submit" :button-text="this.$t('index.submit')" suffix-label="CNY"
			@submit="onSubmit">
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" info="9" size="40px" @click="showCar" />
		</van-submit-bar>
		<!-- 物料车 -->
		<car-detail v-if="show" @hideDetail="hideDetail" :contlist="contlist"></car-detail>
	</div>
</template>
<script>
	import categoryMask from "../../components/category-mask/index.vue"
	import navHeader from "../../components/header/index.vue"
	import tabCategory from "../../components/tab-category/index.vue"
	import carDetail from "../../components/car-detail/index.vue"
	export default {
		components: {
			categoryMask,
			navHeader,
			tabCategory,
			carDetail
		},
		data() {
			return {
				hideTab: false,
				lang: this.$t('index.selectMaterial'),
				keyword: "",
				store: "Store",
				categoryShow: false,
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
		onShow() {
			let that = this
			uni.$on('returnData', function(data) {
				that.store = `Store ${data.name}`
			})
		},

		methods: {
			searchClick(key) {
				if (key) {
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
			getData(id) {
				console.log(id)

			},
			toggleTab(tab) {
				console.log(tab)
			},
			closeSearch(val) {
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
				uni.navigateTo({
					url: "/pages/storeList/storeList"
				})
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

		}
	}
</script>

<style lang="scss">
	.submit {
		z-index: 105 !important;
	}

	.container {
		padding: 0 20px;
	}

	.headerFix {
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 3;
		width: calc(100vw - 40px);

	}

	// .selectStore {
	// 	height: 30px;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: space-between;

	// 	text {
	// 		font-size: 14px;
	// 	}

	// 	.arrowhead {
	// 		width: 15rpx;
	// 		height: 15rpx;
	// 		border-top: 4rpx solid #000;
	// 		border-right: 4rpx solid #000;
	// 		-webkit-transform: rotate(45deg);
	// 		transform: rotate(45deg);
	// 		margin-left: 10rpx;
	// 	}
	// }

	page {
		width: 100%;
	}

	.tabs {
		display: flex;
		font-size: 18px;

		.tab:not(:last-child) {
			margin-right: 20px;
		}
	}


	.search {
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
		font-size: 26rpx;
		border: 1px solid #ccc;
		border-radius: 5px;

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
				width: 100%;
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