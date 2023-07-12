<template>
	<view class="container">
		<view class="searchbar">
			<!-- 搜索 -->
			<search-bar @searchClick="searchClick"></search-bar>
			<!-- 中心区域 :key="item"-->
			<drop-down-list @selectMenu="selectMenu(arguments)" @changeStore="changeStore" @changeTime="changeTime"
				@searchStatus="searchStatus" @hideMenu="hideMenu" :dataList="dataList"></drop-down-list>
		</view>
		<view class="content">
			<view class="goods-info" v-for="(item,index) in approveList" :key="index">
				<view class="info-header">
					<view class="info-header-top">
						<van-checkbox use-icon-slot :value="item.choose" custom-class="vancheck"
							@change="onChange(item,index)" v-if="item.itemStatus ==5 &&storeRole==3">
							<image class="checkbox" slot="icon" :src="item.choose ? activeIcon : inactiveIcon" />
						</van-checkbox>
						<text>{{item.storeName}}</text>
							<view class="tocar" @click="toCar(item)">
							{{$t('index.CopytoCart')}}
						</view>
						<image class="unfold" :style="item.open?'transform: rotate(180deg);':'transform: rotate(0deg);'"
							src="../../static/unfold.png" mode="" @click="changeContent(item,index)">
						</image>
					</view>
					<view class="info-header-bottom">
						<view class="info-header-bottom-l">
							<view>{{Quantity}}: {{item.totalQuantity}}</view>
							<view>{{item.employeeName}}</view>

						</view>
						<view class="info-header-bottom-r">
							<view>{{Total}}:{{item.totalRetailPrice}}{{item.priceUnit}}</view>
							<view>{{formatTimeFn(item.applyTime)}}</view>
						</view>
					</view>
				</view>
				<!-- 展开 -->
				<view class="" v-show="item.open==true">
					<material-item v-for="(val,i) in item.orderItemPos" :key="i" :dataDetail="val" :parentIndex="index"
						@selectOrder="selectOrder(arguments)"></material-item>
				</view>
			</view>
		</view>
		<view class="operate" v-if="storeRole==3">
			<view
				:class="['operate-all','flex-center','font-bold','margin-right-10','z-index-2',btnActive?'operate-all-active':'']"
				@click="changeStatus(6,1)">
				 {{$t('index.Receive')}}
			</view>
			<view class="batch flex-center font-bold" @click="btnActive = !btnActive">
				Batch
			</view>
		</view>
		<view class="footer" v-if="storeRole==3">
			<view class="footer-l">
				<text style="margin-top: 8rpx;" v-if="selectedList.length">Selected: {{selectedList.length}}</text>
			</view>
			<view class="footer-r">
				<view :class="[selectedList.length<=0?'disabled':'']"
					@click="changeStatus(6)">
					{{$t('index.Receipt')}}
				</view>
			</view>
		</view>
		<!-- 弹窗 ops-->
		<public-dialog v-if="dialogShow"></public-dialog>
		<!-- 弹窗 -->
		<public-dialog v-if="confirmDialog" :pageFrom="'application'" :title="$t('index.Confirm')" :tip="tip"
			 @submit="submit" @hideDialog="dialogHide" />
	</view>
</template>

<script>
	import dropDownList from "../../components/drop-down-list/index.vue"
	import searchBar from "../../components/search-bar/index.vue"
	import materialItem from "../../components/material-item/index2.vue"
	import publicDialog from "../../components/public-dialog/index.vue"
	import { formatDate } from '../../fetch/tools.js'
	import moment from 'moment';
	export default {
		components: {
			dropDownList,
			searchBar,
			materialItem,
			publicDialog
		},
		data() {
			return {
				Quantity: this.$t('index.Quantity'),
				Total: this.$t('index.total'),
				confirmDialog: false,
				tip: this.$t('index.toCart'),
				btnActive: false,
				dialogShow: false,
				checked: false,
				activeIcon: '../../static/checkbox-active.png',
				inactiveIcon: '../../static/checkbox.png',
				selectAll: '../../static/selectall.png',
				notAll: '../../static/notall.png',
				dataList: [{
						name: this.$t('index.store'),
						show: false,
						type: 'store',
						list: []
					},
					{
						name: this.$t('index.Status'),
						show: false,
						type: 'status',
						list: [{
								label: 'all',
								name: this.$t('index.all'),
								value: 0
							},
							{
								label: 'WaitingApproval',
								name: this.$t('index.WaitingApproval'),
								value: 2
							},
							{
								label: 'Approved',
								name: this.$t('index.Approved'),
								value: 3
							},
							{
								label: 'Dispatched',
								name: this.$t('index.Dispatched'),
								value: 4
							},
							{
								label: 'delivered',
								name: this.$t('index.delivered'),
								value: 5
							},
							{
								label: 'received',
								name: this.$t('index.received'),
								value: 6
							},
							{
								label: 'rejected',
								name: this.$t('index.rejected'),
								value: 7
							},
						]
					},
					{
						name: this.$t('index.application-time'),
						show: false,
						type: 'time',
						list: [{
								label: 'all',
								name: this.$t('index.all')
							},
							{
								label: 'week',
								name: this.$t('index.this-week')
							},
							{
								label: 'month',
								name: this.$t('index.this-month')
							},
							{
								label: 'three-month',
								name: this.$t('index.three-month')
							}
						]
					}
				],
				selectedList: [],
				approveList: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				carList:{},
				param: {
					id: 0,
					params: {
						status: 0,
						orderItemPos: []
					}
				},
				forms: {
					orderStatus: 1,
					materialCode: "",
					storeName: "",
					stm: "",
					etm: ""
				},
				// 1:大区经 2:小区经 3:店长 4:店员 10:OPS',
				storeRole: uni.getStorageSync('user').storeRole
			}
		},

		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t("index.my-application")
			});
			console.log(option)
			if(option.itemStatus){
				this.forms.itemStatus = option.itemStatus
				this.dataList[1].list.forEach(item=>{
					if(item.value ==option.itemStatus){
						this.dataList[1].name = item.name
					}
				})
			}
		},
		onShow() {
			this.getApproveList()
			this.getStoreList()
		},
		onReachBottom() {
			// 触底的事件
			if (this.pageNum * this.pageSize >= this.total) return
			// 让页码值自增+1
			this.pageNum++
			this.getApproveList()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
			// 1. 重置关键数据
			this.pageNum = 1
			this.total = 0
			this.approveList = []
			// 2. 重新发起请求
			this.getApproveList()
		},
		methods: {
			selectOrder(obj) {
				this.approveList.forEach(item => {
					if (item.orderItemPos) {
						item.orderItemPos.forEach(item2 => {
							if (item2.orderItemId == obj[0].orderItemId && obj[0].choose) {
								item2.choose = true
							} else if (item2.orderItemId == obj[0].orderItemId && !obj[0]
								.choose) {
								item2.choose = false
							}

						})
					}
				})
				if (obj[0].choose) {
					this.selectedList.push(obj[0])
				} else {
					let index = this.selectedList.findIndex(val => val.orderItemId == obj[0].orderItemId)
					this.selectedList.splice(index, 1)
				}
			},
			toCar(item) {
				this.carList=item
				this.confirmDialog=true
			},
			submit(){
				this.$store.commit('copytocart', this.carList.orderItemPos)
				let store = {}
				this.dataList[0].list.forEach(val => {
					if (val.larkDeptId == this.carList.storeLarkDeptId) {
						store = val
					}
				})
				uni.navigateTo({
					url: "/pages/selectMaterial/selectMaterial?store=" + JSON.stringify(store) + '&page=store'
				})
			},
			searchStatus(val) {
				if (val.label == 'all') {
					this.dataList[1].name = this.$t('index.Status')
					this.forms.itemStatus = ""
				} else {
					this.dataList[1].name = val.name
					this.forms.itemStatus = val.value
				}
				this.getApproveList()
			},
			changeTime(val) {
				if (val.label == 'all') {
					this.forms.stm = ""
					this.forms.etm = ""
					this.dataList[2].name = this.$t('index.application-time')
				}
				if (val.label == 'week') {
					this.dataList[2].name = val.name
					this.getRecentDay(7)
				} else if (val.label == 'month') {
					this.dataList[2].name = val.name
					this.getRecentMonth(1);
				} else if (val.label == 'three-month') {
					this.dataList[2].name = val.name
					this.getRecentMonth(3);
				}
				this.getApproveList()
			},
			getRecentMonth(n) {
				let month = moment(new Date()).subtract(n, 'months').format('YYYY-MM-DD');
				let datetime = moment().format('YYYY-MM-DD') //24小时制 HH:mm:ss
				this.forms.stm = month
				this.forms.etm = datetime
			},
			// 近N天 -Moment.js
			getRecentDay(n) {
				let day = moment(new Date()).subtract(n, 'days').format('YYYY-MM-DD');
				let datetime = moment().format('YYYY-MM-DD') //24小时制
				this.forms.stm = day
				this.forms.etm = datetime
			},
			changeStore(val) {
				if (val.id == 0) {
					this.dataList[0].name = this.$t('index.store')
					this.forms.storeName = ""
				} else {
					this.dataList[0].name = val.name
					this.forms.storeName = val.name
				}
				this.pageNum = 1
				this.getApproveList()
			},
			getStoreList() {
				let user = uni.getStorageSync("user")
				let data = {
					employeeNo: user.employeeNo,
					gender: user.gender,
					id: user.id,
					mobile: user.mobile,
					name: user.name,
					nickname: user.nickname,
					tenantCode: user.tenantCode
				}
				this.$api.searchStoreList(data).then(res => {
					console.log(res)
					if (res.code == '200') {
						let arr = [{
							id: 0,
							name: this.$t('index.all')
						}]
						this.dataList[0].list = arr.concat(res.data)
					}
				})
			},
			dialogHide() {
				this.confirmDialog = false
			},
			changeStatus(id, type) {
				if (!type && this.selectedList.length <= 0) return;
				this.param.id = id
				this.param.params.status = type ? 1 : 0
				this.param.params.orderItemPos = type ? [] : this.selectedList
				this.$api.updateApply1(this.param).then(res => {
					if (res.code == '200') {
						this.selectedList = []
						uni.showToast({
							title: this.$t('index.ReceiveSuccessful'),
							duration: 2000
						});
						let that = this
						setTimeout(function() {
							that.pageNum = 1
							that.getApproveList()
						}, 2000)

					}
				})
			},
			formatTimeFn(val) {
			 return formatDate(val)
			},
			getApproveList() {
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					param: this.forms
				}
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getAllMyApproval(data).then(res => {
					if (res.code == '200') {
						res.data.data.forEach(item => {
							item.open = true,
								item.choose = false
							if (item.orderItemPos) {
								item.orderItemPos.forEach(val => {
									if (val.itemStatus == 5) {
										val.choose = false
										item.itemStatus = 5
									}
								})
							}
						})
						this.total = res.data.total

						if (this.pageNum == 1) {
							this.approveList = res.data.data
						} else {
							this.approveList = [...this.approveList, ...res.data.data]
						}
					}

				}).finally(()=>{
						uni.hideLoading();
				})
			},
			onChange(val, index) {
				if (val.choose) {
					val.choose = false
					this.approveList[index].choose = false
					val.orderItemPos.forEach(item1 => {
						item1.choose = false
						if (item1.itemStatus == 5) {
							let i = this.selectedList.findIndex(va => va.orderItemId == item1.orderItemId)
							this.selectedList.splice(i, 1)
						}
					})
					console.log(this.selectedList)
				} else {
					val.choose = true
					this.approveList[index].choose = true
					val.orderItemPos.forEach(item1 => {
						if (item1.itemStatus == 5) {
							item1.choose = true
							this.selectedList.push(item1)
						}

					})
					let obj = {}
					this.selectedList = this.selectedList.reduce((preVal, curVal) => {
						obj[curVal.orderItemId] ? "" : obj[curVal.orderItemId] = preVal.push(curVal)
						return preVal
					}, [])
				}
			},
			onChangeAll() {
				this.selectedList.length = this.total
				this.checked = !this.checked
				if (this.checked) {
					this.selectedList.length = this.total
				} else {
					this.selectedList.length = 0
				}
			},
			selectMenu(val) {
				this.dataList.forEach(i => {
					i.show = false;
				})
				this.dataList[val[1]].show = true
			},
			hideMenu() {
				this.dataList.forEach(i => {
					i.show = false;
				})
			},
			searchClick(key) {
				this.forms.materialCode = key
				this.pageNum = 1
				this.getApproveList()
			},
			changeContent(item, index) {
				this.approveList.forEach(i => {
					if (i.open !== this.approveList[index].open) {
						i.open = false;
					}
				})
				item.open = !item.open
			}
		}
	}
</script>
<style lang="scss">
	//利用这句代码撑开容器
	.searchbar {
		position: sticky;
		top: 0;
		background-color: #f0f0f0;
		z-index: 2;
	}

	.vancheck {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.checkbox {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		top: 0;
	}
</style>
<style lang="scss" scoped>
	.container {
		padding-bottom: 160rpx;

		.content {
			margin: 0rpx 30rpx 40rpx 30rpx;

			.goods-info {
				background: #F8F8F8;
				border-radius: 40rpx;
				padding: 16rpx 20rpx 20rpx 20rpx;
				margin-bottom: 28rpx;

				.info-header {
					padding-bottom: 20rpx;

					.info-header-top {
						display: flex;
						align-items: center;
						position: relative;
						padding-left: 52rpx;

						.tocar {
							font-size: 24rpx;
							color: #40A1FF;
							line-height: 32rpx;
							padding: 4px 12rpx;
							border-radius: 20rpx;
							border: 1rpx solid #40A1FF;
							margin-left: 12rpx;
						}

						.unfold {
							width: 58rpx;
							height: 56rpx;
							position: absolute;
							right: 22rpx;
						}

						font-size: 28rpx;
						color: #111111;
						line-height: 40rpx;
					}

					.info-header-bottom {
						font-size: 24rpx;
						color: #999999;
						line-height: 32rpx;
						display: flex;
						margin: 12rpx 0 0 52rpx;
						flex-direction: column;

						.info-header-bottom-l,
						.info-header-bottom-r {
							display: flex;
							justify-content: space-between;

							text {
								color: #111111;
							}
						}
					}
				}
			}

		}

	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.font-bold {
		font-weight: bold;
	}

	.margin-right-10 {
		margin-right: 10rpx;
	}

	.z-index-1 {
		z-index: 1;
	}

	.z-index-2 {
		z-index: 2;
	}

	.operate-all-active {
		animation: enter-x-right 0.4s ease-in-out 0.3s;
		animation-fill-mode: forwards;

	}

	@keyframes enter-x-right {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.operate {
		height: 100rpx;
		position: fixed;
		bottom: 190rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 30rpx;
		right: 0;

		.operate-all {
			height: 92rpx;
			border-radius: 92rpx;
			border: 2rpx solid #111111;
			background: #ffffff;
			font-size: 32rpx;
			color: #111111;
			font-family: MicrosoftYaHeiSemibold;
			transform: translateX(50px);
			opacity: 0;
			padding: 0 36rpx;
		}

		.operate-all::after {
			content: ' ';
		}

		.batch {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #FFFFFF;
			border: 2rpx solid #111111;
			font-size: 32rpx;
			font-family: MicrosoftYaHeiSemibold;
			color: #111111;
			z-index: 9;
		}
	}

	.footer {
		width: -webkit-fill-available;
		height: 160rpx;
		background: #111111;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;

		.footer-l {
			font-size: 24rpx;
			color: #FFFFFF;
			line-height: 32rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.footer-r {
			display: flex;

			view {
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 45rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: bold;
				color: #111111;
				line-height: 42rpx;
				padding: 0 140rpx;
			}

			image.reject {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}

			image.approve {
				width: 33rpx;
				height: 25rpx;
				margin-right: 12rpx;
			}
		}
	}

	.disabled {
		background-color: #999999 !important;
		color: #666666 !important;
		border-color: #999999 !important;
	}
</style>