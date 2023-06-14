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
					<view :class="['tab',item.cid==current?'active' :'']" v-for="(item,index) in categoryList"
						:key="index" @click="toggleTab(item)">
						{{item.categoryName}}
					</view>
					<view class="tab" @click="choose">{{this.$t('index.more')}}
						<image src="../../static/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<tab-category @getMaterial='getMaterial' @minusNum="minusNum" @plusNum="plusNum" :subcurrent="subcurrent"
				:hideTab="hideTab" :tabslist="tabslist" :contlist="contlist" @showDetail="showDetail"
				keep-alive></tab-category>

		</view>
		<!-- 分类弹窗 -->
		<category-mask v-if="categoryShow" @searchSubMaterial="toggleTab" :current="current" :subcurrent="subcurrent"
			:categoryList="categoryList" :tabslist="tabslist" @getSearchProd="getProd"
			@closeSearch="closeSearch"></category-mask>
		<!-- 提交 -->
		<view class="submit" :style="clearShow?'z-index:100':'z-index:101'">
			<view class="submit_left">
				<van-icon name="https://hr-dev.underarmour.cn/upload/img/notification/cover/1686735414489-car.png"
					:info='getCarShop.num' v-if="getCarShop.num" custom-style="width:60rpx;height:60rpx"
					@click="showCar" />
				<image src="../../static/car.png" mode="" v-else></image>
				<view class="price">{{getCarShop.sumPrice}} <text class="suffix">CNY</text></view>
			</view>
			<view class="submit_right" @click="onSubmit">
				{{this.$t('index.submit')}}
			</view>
		</view>
		<!-- 物料车 -->
		<car-detail v-if="show" @hideDetail="hideDetail" @minusNum="minusNum" @plusNum="plusNum"
			@deleteItem="deleteItem" @showDialog='showDialog'></car-detail>
		<!-- 确认弹窗 -->
		<public-dialog v-if="clearShow" @deleteAll="deleteAll" :pageFrom="pageFrom" @hideDialog="dialogHide" />
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
				pageFrom: "clear",
				clearShow: false,
				hideTab: false,
				store: {},
				categoryShow: false,
				// 一级类型选中
				current: 0,
				subcurrent: 0,
				catchMove: true,
				show: false,
				// 物料列表
				contlist: [],
				// 大分类
				categoryList: [],
				// 二级分类
				tabslist: [],
				// 二级菜单默认全部
				subdefault: [{
					cid: 0,
					categoryName: "全部"
				}],
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
			this.getAllMaterial()
		},
		onShow() {
			let that = this
			uni.$on('returnData', function(data) {
				console.log(data)
				that.store = data
			})
		},
		computed: {
			getCarShop() {
				var sumPrice = 0;
				var num = 0
				this.$store.state.carShop.forEach(item => {
					sumPrice += item.scalar * item.retailPrice
					num += item.scalar
				})
				return {
					sumPrice: sumPrice.toFixed(2),
					num
				}
				console.log(sumPrice, num)
			}
		},
		methods: {
			deleteItem(val) {
				console.log(val)
				this.contlist.forEach(item => {
					if (item.mid == val.mid) {
						item.scalar = 0
					}
				})
			},
			deleteAll() {
				this.contlist.forEach(item => {
					item.scalar = 0
				})
			},
			getAllMaterial() {
				this.$api.getAllMaterialCategory().then(res => {
					let arr = [{
						cid: 0,
						categoryName: "全部"
					}]
					this.categoryList = arr.concat(res.data.category1)
					this.tabslist = arr.concat(res.data.category2)
					this.getContlist(this.tabslist[0].cid)
				})
			},
			minusNum(val) {
				this.contlist.forEach((item, index) => {
					if (item.mid == val.mid) {
						item.scalar--
						this.$store.commit('minusCar', item)
					}
				})
			},
			plusNum(val) {
				this.contlist.forEach((item, index) => {
					if (item.mid == val.mid) {
						item.scalar++
						this.$store.commit('addCar', item)
					}
				})

			},
			showDialog(val) {
				this.clearShow = val
				this.show = false
			},
			dialogHide(val) {
				this.clearShow = false
			},
			searchClick(key) {
				if (key) {
					this.hideTab = true
				} else {
					this.hideTab = false
				}
				this.param.materialName = key
				this.getContlist()
			},
			showCar() {
				if (this.getCarShop.num == 0) return
				this.show = true
			},
			onSubmit() {
				uni.navigateTo({
					url: "/pages/previewApplication/previewApplication?getCarShop=" + JSON.stringify(this
						.getCarShop)
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
				this.current = item.cid
				this.subcurrent = 0
				// this.subdefault[0].cid = item.cid
				this.getSubCategory(item.cid)
			},
			closeSearch(val) {
				this.categoryShow = val
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
							item.isChoose = false
						})
						this.tabslist = this.subdefault.concat(res.data)
						// 获取二级菜单全部
						this.getContlist(id)
					}

				})
			},
			getMaterial(val) {
				this.subcurrent = val
				if (val == 0) {
					this.getContlist(this.current)
				} else {
					this.getContlist(val)
				}


			},
			getContlist(id) {
				this.param.categoryId = id
				let param = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					param: this.param
				}
				this.$api.searchMaterial(param).then(res => {
					if (res.code == '200') {
						res.data.data.forEach((item, index) => {
							item.scalar = 0
						})
						this.contlist = res.data.data
						console.log('------', this.contlist, this.$store.state.carShop)
						this.contlist.forEach(item => {
							this.$store.state.carShop.forEach(val => {
								if (item.mid == val.mid) {
									item.scalar = val.scalar
								}
							})
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				margin-top: -14rpx;
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