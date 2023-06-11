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
				<view class="search">
					<view class="search_box">
						<image src="../../static/search.png">
						</image>
						<input type="text" confirm-type="search" v-model="keyword" @confirm="searchClick(keyword)"
							:placeholder="this.$t('index.material-name') " />
					</view>
				</view>
				<view class="tabs" v-if="!hideTab">
					<view class="tab active" @click="toggleTab('all')">全部</view>
					<view class="tab" @click="toggleTab('material')">办公耗材</view>
					<view class="tab" @click="toggleTab('furniture')">办公家具</view>
					<view class="tab" @click="toggleTab('furniture')">办公文具</view>
					<view class="tab" @click="toggleTab('furniture')">电脑周边</view>
					<view class="tab" @click="choose">{{this.$t('index.more')}}
						<image src="../../static/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<tab-category @getMaterial='getData' :hideTab="hideTab" :tabslist="tabslist" :contlist="contlist"
				@showDetail="showDetail" keep-alive></tab-category>

		</view>
		<!-- 分类弹窗 -->
		<category-mask v-if="categoryShow" :skuList="skuList" :categoryList="categoryList" :skuTitle="skuTitle"
			@getSearchProd="getProd" @closeSearch="closeSearch"></category-mask>
		<!-- 提交 -->
		<view class="submit">
			<view class="submit_left">
				<image src="../../static/car.png" mode="" @click="showCar"></image>
				<view class="price">334.00 <text class="suffix">CNY</text></view> 
			</view>
			<view class="submit_right" @click="onSubmit">
				{{this.$t('index.submit')}}
			</view>
		</view>
		<!-- 物料车 -->
		<car-detail v-if="show" @hideDetail="hideDetail" :contlist="contlist"></car-detail>
	</view>
</template>
<script>
	import categoryMask from "../../components/category-mask/index.vue"
	import tabCategory from "../../components/tab-category/index.vue"
	import carDetail from "../../components/car-detail/index.vue"
	export default {
		components: {
			categoryMask,
			tabCategory,
			carDetail
		},
		data() {
			return {
				hideTab: false,
				lang: this.$t('index.selectMaterial'),
				keyword: "",
				store: {},
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
				contlist: [{}, {}],
				categoryList: [{
						categoryName: "办公耗材",
						isChoose: true
					},
					{
						categoryName: "办公家具",
						isChoose: false
					},
					{
						categoryName: "办公家具",
						isChoose: false
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
	let systemInfo = uni.getSystemInfoSync();
	
	console.log(systemInfo)
			// this.gettabslist()
			// setTimeout(()=>{
			// 	this.getcontlist(this.tabslist[0].id)
			// 	this.current =this.tabslist[0].id
			// },500)	
		},
		onShow() {
			let that = this
			uni.$on('returnData', function(data) {
				console.log(data)
				that.store = data
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
	.container{
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
        z-index: 200;
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
		margin: 38rpx 28rpx 32rpx 30rpx;
		position: relative;
		width: max-content;
		align-items: center;
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
				border: 6rpx solid #111;
				min-width: -webkit-fill-available;
			}
		}
	}


	.search {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		padding: 26rpx 22rpx;
		border-bottom: 2rpx solid #ddd;

		.search_box {
			display: flex;
			align-items: center;
			width: 100%;
			height: 52rpx;

			image:nth-child(1) {
				margin: 0 6rpx 0 0rpx;
				width: 52rpx;
				height: 52rpx;
			}

			input {
				width: 100%;
				color: #111;
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