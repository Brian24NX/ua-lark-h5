<template>
	<view>
		<view class="container">
			<view class="headerFix">
				<view class="store" @click="selectStore">
					<view class="store_l">
						<image src="../../static/store.png" mode=""></image>
						<text>{{store.name?`${$t('index.store')}：${store.name}`:`${$t('index.pleaseSelect')}`}}</text>
					</view>
					<image class="store_r" src="../../static/right.png" mode="" v-if="page"></image>
				</view>
				<search-bar @searchClick="searchClick"></search-bar>
				<view class="tabs" v-if="!hideTab">
					<scroll-view class="scroll-view_H sub-container" scroll-x>
						<view :class="['tab',item.cid==currntObject.current?'active' :'']"
							v-for="(item,index) in categoryList" :key="index" @click="toggleTab(item)">
							{{item.categoryName}}
						</view>
					</scroll-view>

					<view class="tab" @click="choose">{{$t('index.more')}}
						<image src="../../static/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<tab-category @getMaterial='getMaterial' @minusNum="minusNum" @plusNum="plusNum" @editNum="editNum"
				:subcurrent="currntObject.subcurrent" :hideTab="hideTab" :tabslist="tabslist" :contlist="contlist"
				@showDetail="showDetail" keep-alive></tab-category>

		</view>
		<!-- 分类弹窗 -->

		<category-mask v-if="categoryShow" :currntObject="currntObject" @updateCurrent="updateCurrent"
			:supplierList="supplierList" :categoryList="categoryList" :tabslist="tabslist" @getSearchProd="getContlist"
			@closeSearch="closeSearch"></category-mask>
		<!-- 提交 -->
		<view class="submit" :style="clearShow?'z-index:100':'z-index:101'">
			<view class="submit_left">
				<view class="carinfo" v-if="getCarShop.num" @click.native="showCar">
					<image src="../../static/car.png" mode=""></image>
					<view class="num">
						{{getCarShop.num}}
					</view>
				</view>
				<image src="../../static/car.png" mode="" v-else></image>
				<view class="price">{{getCarShop.sumPrice}} <text class="suffix">CNY</text></view>
			</view>
			<view :class="['submit_right',getCarShop.num?'':'forbidden']" @click="onSubmit(getCarShop.num)">
				{{$t('index.preview')}}
			</view>
		</view>
		<!-- 物料车 -->
		<car-detail v-if="show" @hideDetail="hideDetail" @minusNum="minusNum" @plusNum="plusNum" @editNum="editNum"
			@deleteItem="deleteItem" @showDialog='showDialog' />
		<!-- 确认弹窗 -->
		<public-dialog v-if="clearShow" @deleteAll="deleteAll" :title="$t('index.Confirm')" :tip="tip"
			:pageFrom="'clear'" @hideDialog="dialogHide" />
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
				tip: this.$t('index.clean_up'),
				clearShow: false,
				hideTab: false,
				store: {},
				categoryShow: false,
				// 一级类型选中
				currntObject: {
					current: 0,
					subcurrent: 0,
					suppliercurrent: 0
				},
				catchMove: true,
				show: false,
				// 物料列表
				contlist: [],
				// 大分类
				categoryList: [],
				// 二级分类
				tabslist: [],
				// 供应商列表
				supplierList: [],
				// 二级菜单默认全部
				subdefault: [{
					cid: 0,
					categoryName: this.$t('index.all')
				}],
				supplierdefault: [{
					employeeNo: 0,
					nickName: this.$t('index.all')
				}],
				pageNum: 1,
				pageSize: 10,
				param: {
					categoryId: 0,
					categoryPath: "",
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
					supplierCode: "",
					supplierName: "",
					tenantCode: "",
					uaSkuCode: "",
					unit: "",
					updateTime: ""
				},
				page: ""
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t("index.selectMaterial")
			});
			if (option.store != 'undefined') {
				this.store = JSON.parse(option.store)
			}
			if (option.page) {
				this.page = option.page
			}

		},
		onShow() {
			this.pageNum = 1
			this.getAllMaterial()
		},
		computed: {
			getCarShop() {
				var sumPrice = 0;
				var num = 0;
				var unit = ''
				if(this.$store.state.carShop.length>0){
					this.$store.state.carShop.forEach(item => {
						sumPrice += item.scalar * item.retailPrice
						num += parseInt(item.scalar),
							unit = item.priceUnit
					})
				}
				return {
					sumPrice: sumPrice.toFixed(2),
					num,
					unit
				}
			}
		},
		onReachBottom() {
			// 触底的事件
			if (this.pageNum * this.pageSize >= this.total) return
			// 让页码值自增+1
			this.pageNum++
			this.getAllMaterial()
		},
		methods: {
			updateCurrent(obj) {
				this.currntObject = Object.assign(obj)
			},
			deleteItem(val) {
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
			getAllMaterial(type) {
				this.$api.getAllMaterialCategory2().then(res => {
					this.categoryList = this.subdefault.concat(res.data.category1)
					if (res.data.category2) {
						this.tabslist = this.subdefault.concat(res.data.category2)
					}
					if (res.data.supplier) {
						this.supplierList = this.supplierdefault.concat(res.data.supplier)
					}
					if(type !=1){
						this.getContlist(this.tabslist[0].cid)
					}
					
				})
			},
			minusNum(val) {
				this.contlist.forEach((item, index) => {
					if (item.mid == val.mid) {
						item.scalar--
						if (item.scalar == 0) {
							this.show = false
						}
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
			editNum(val) {
				this.contlist.forEach((item, index) => {
					if (item.mid == val.mid) {
						item.scalar = val.scalar
						this.$store.commit('editCar', item)
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
				let mids = this.$store.state.carShop.map(item => item.mid)
				console.log(this.$store.state.carShop, mids)
				this.$api.getCarList({
					mids
				}).then(res => {
					if (res.code == '200') {
						this.$store.commit('replaceCar', res.data)
					}

				})
				this.show = true
			},
			onSubmit(val) {
				if (!this.store.name) {
					uni.showToast({
						title: this.$t('index.pleaseSelect'),
						duration: 2000
					});
					return
				}
				this.show = false
				if (val <= 0) return
				uni.navigateTo({
					url: "/pages/previewApplication/previewApplication?getCarShop=" + JSON.stringify(this
						.getCarShop) + "&store=" + JSON.stringify(this.store)
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
				this.currntObject.current = item.cid
				this.currntObject.subcurrent = 0
				if (item.cid == 0) {
					this.getAllMaterial()
				} else {
					this.getSubCategory(item.cid)
				}

			},
			selectStore() {
				if (!this.page) return
				uni.navigateTo({
					url: "/pages/storeList/storeList"
				})
			},
			// 获取二级分类列表
			getSubCategory(id, type) {
				this.$api.getMaterialCategory3({
					id: id
				}).then(res => {
					if (res.code == '200') {
						if (res.data.supplier) {
							res.data.supplier.forEach((item, index) => {
								item.isChoose = false
							})
							this.supplierList = this.supplierdefault.concat(res.data.supplier)
						} else {
							this.supplierList = []
						}
						if (res.data.category2) {
							res.data.category2.forEach((item, index) => {
								item.isChoose = false
							})
							this.tabslist = this.subdefault.concat(res.data.category2)
						} else {
							this.tabslist = []
						}
						// 获取二级菜单全部
						if (!type) {
							this.getContlist(id)
						}
					}

				})
			},

			getMaterial(val) {
				this.pageNum = 1
				this.currntObject.subcurrent = val
				if (val == 0) {
					this.getContlist(this.currntObject.current)
				} else {
					this.getContlist(val)
				}
				this.$api.getMaterialCategory3({
					id: val
				}).then(res => {
					if (res.code == '200') {
						if (res.data.supplier) {
							res.data.supplier.forEach((item, index) => {
								item.isChoose = false
							})
							this.supplierList = this.supplierdefault.concat(res.data.supplier)
						} else {
							this.supplierList = []
						}
					}

				})
			},
			closeSearch() {
				this.categoryShow = false
			},
			getContlist(id) {
				console.log(id,this.currntObject)
				this.categoryShow = false
				if (id && id.constructor === Object) {
					if (id.categoryId == 0 || this.currntObject.current==0) {
						this.getAllMaterial(1)
						// return
					} else {
						this.getSubCategory(this.currntObject.current, 1)
						let that = this
						setTimeout(function() {
							that.$api.getMaterialCategory3({
								id: id.categoryId
							}).then(res => {
								if (res.code == '200') {
									if (res.data.supplier) {
										res.data.supplier.forEach((item, index) => {
											item.isChoose = false
										})
										that.supplierList = that.supplierdefault.concat(res.data.supplier)
									} else {
										that.supplierList = []
									}
								}
							})
						}, 500)
                     return
					}
					this.pageNum = 1
					this.param.categoryId = id.categoryId
					this.param.supplierCode = id.supplierCode
				} else {
					this.param.categoryId = id
				}
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
						this.total = res.data.total
						if (this.pageNum == 1) {
							this.contlist = res.data.data
						} else {
							this.contlist = [...this.contlist, ...res.data.data]
						}
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

			.carinfo {
				position: relative;

				.num {
					width: 18px;
					height: 18px;
					background-color: red;
					color: white;
					text-align: center;
					line-height: 18px;
					font-size: 12px;
					border-radius: 50%;
					position: absolute;
					right: -6rpx;
					top: -14rpx;
				}
			}

			image {
				width: 60rpx;
				height: 60rpx;
				// margin-top: -14rpx;
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

		.forbidden {
			background-color: #999999;
			color: #666666
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
		padding: 38rpx 30rpx 32rpx 30rpx;
		width: -moz-max-content;

		align-items: center;

		.scroll-view_H {
			width: 75%;
			white-space: nowrap;
		}

		.tab {
			position: relative;
		}

		.tab:not(:last-child) {
			margin-right: 44rpx;
			font-size: 28rpx;
			color: #999999;
			line-height: 40rpx;
			display: inline-block;
			padding-bottom: 10rpx;
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
				bottom: 0;
				min-width: -webkit-fill-available;
				height: 6rpx;
				background-color: #111;
			}
		}
	}
</style>