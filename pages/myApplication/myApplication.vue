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
							@change="onChange(item,index)" v-if="showCheckbox">
							<image class="checkbox" slot="icon" :src="item.choose ? activeIcon : inactiveIcon" />
						</van-checkbox>
						<text style="margin-left: 20rpx;">{{item.storeName}}</text>
						<!-- <view class="tocar" @click="toCar(item)">
							{{this.$t('index.CopytoCart')}}
						</view> -->
						<image class="unfold" :style="item.open?'transform: rotate(180deg);':'transform: rotate(0deg);'"
							src="../../static/unfold.png" mode="" @click="changeContent(item,index)">
						</image>
					</view>
					<view class="info-header-bottom" >
						<view class="info-header-bottom-l">
							<view>{{Quantity}}: {{item.totalQuantity}}</view>
							<view>{{item.employeeName}}</view>

						</view>
						<view class="info-header-bottom-r">
							<view>{{Total}}:{{item.totalPrice}}{{item.priceUnit}}</view>
							<view>{{NORMSTARTTIMEfilter(item.applyTime)}}</view>
						</view>
					</view>
				</view>
				<!-- 展开 -->
				<view class="" v-show="item.open==true">
					<material-item v-for="(val,i) in item.orderItemPos" :key="i" :dataDetail="val"></material-item>
				</view>
			</view>
		</view>
		<view class="footer" v-if="storeRole==3">
			<view class="footer-l">
				<text style="margin-top: 8rpx;" v-if="selectedList.length">Selected: {{selectedList.length}}</text>
			</view>
			<view class="footer-r">
				<view style="margin-right: 40rpx;" :class="[selectedList.length<=0?'disabled':'']"
					@click="changeStatus(6)">
					<image class="approve"
						:src="selectedList.length<=0?'../../static/approve-sec.png':'../../static/approve.png'" mode="">
					</image>{{this.$t('index.Receipt')}}
				</view>
				<view @click="changeStatus(6,1)">
					<image class="reject" src="../../static/reject.png" mode="">
					</image> {{this.$t('index.Receive')}}
				</view>
			</view>
		</view>
		<!-- 弹窗 ops-->
		<public-dialog v-if="dialogShow"></public-dialog>
		<!-- 弹窗 -->
		<public-dialog v-if="confirmDialog" :pageFrom="'approval'" :title="this.$t('index.Confirm')" :tip="tip"
			:num="total" @submit="submit" @hideDialog="dialogHide" />
	</view>
</template>

<script>
	import dropDownList from "../../components/drop-down-list/index.vue"
	import searchBar from "../../components/search-bar/index.vue"
	import materialItem from "../../components/material-item/index2.vue"
	import publicDialog from "../../components/public-dialog/index.vue"
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
				tip: this.$t('index.reject-all'),
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
				param: {
					id: 0,
					params: {
						status: 0,
						orderItemPos: []
					}
				},
				forms: {
					orderStatus:1,
					materialCode: "",
					storeName: "",
					stm: "",
					etm: ""
				},
				// 1:大区经 2:小区经 3:店长 4:店员 10:OPS',
				storeRole: uni.getStorageSync('user').storeRole
			}
		},
		computed: {
			showCheckbox() {
				console.log(this.approveList)
				this.approveList.forEach(item => {
					if(item.orderItemPos){
						item.orderItemPos.forEach(val => {
							if (val.itemStatus == 5) {
								return true
							}
						})
					}
					
				})
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t("index.my-application")
			});
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
			toCar(item){
				this.$store.commit('copytocart',item.orderItemPos)
				let store={}
				this.dataList[0].list.forEach(val=>{
					if(val.larkDeptId == item.storeLarkDeptId){
						store = val
					}
				})
				uni.navigateTo({
					url:"/pages/selectMaterial/selectMaterial?store="+JSON.stringify(store)
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
				let month = moment(new Date()).subtract(n, 'months').format('YYYY-MM-DD HH:mm:ss');
				let datetime = moment().format('YYYY-MM-DD HH:mm:ss') //24小时制 HH:mm:ss
				this.forms.stm = month
				this.forms.etm = datetime
			},
			// 近N天 -Moment.js
			getRecentDay(n) {
				let day = moment(new Date()).subtract(n, 'days').format('YYYY-MM-DD HH:mm:ss');
				let datetime = moment().format('YYYY-MM-DD HH:mm:ss') //24小时制
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
			// controlsAll(id) {
			// 	if (id == 3) {
			// 		this.tip = this.$t('index.approve-all')
			// 	} else if (id == 7) {
			// 		this.tip = this.$t('index.reject-all')
			// 	}
			// 	this.param.id = id
			// 	if (uni.getStorageSync('platform') == "mp-lark") {
			// 		this.confirmDialog = true
			// 	} else {
			// 		this.submit()
			// 	}

			// },
			// submit() {
			// 	this.changeStatus(this.param.id, 1)
			// },
			dialogHide() {
				this.confirmDialog = false
			},
			changeStatus(id, type) {
				if (!type && this.selectedList.length <= 0) return;
				this.param.id = id
				this.param.params.status = type ? 1 : 0
				this.selectedList.forEach(item => {
					if (item.orderItemPos) {
						this.param.params.orderItemPos = this.param.params.orderItemPos.concat(item.orderItemPos)
					}
				})
				this.$api.updateApply(this.param).then(res => {
					if (res.code == '200') {
						this.selectedList = []
						this.pageNum = 1
						this.getApproveList()
					}
				})
			},
			NORMSTARTTIMEfilter(val) {
				const jsonDate = new Date(val).toJSON()
				return new Date(new Date(jsonDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
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
						uni.hideLoading();
						res.data.data.forEach(item => {
							item.open = true,
								item.choose = false
						})
						this.total = res.data.total
						if (this.pageNum == 1) {
							this.approveList = res.data.data
						} else {
							this.approveList = [...this.approveList, ...res.data.data]
						}
						console.log(this.approveList)
					}

				})
			},
			onChange(val, index) {
				this.checked = false
				if (val.choose) {
					this.$set(val, 'choose', false)
				} else {
					this.$set(val, 'choose', true)
				}
				this.$set(this.approveList, index, val)
				this.approveList.forEach((item, index) => {
					if (item.choose) {
						this.selectedList.push(item)
					} else {
						this.selectedList.splice(index, 1)
					}
				})
				this.selectedList = Array.from(new Set(this.selectedList))
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
		position: relative;
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
.tocar{
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
						margin: 12rpx 0 0 20rpx;
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
			width: 220rpx;
			opacity: 1;
			transform: translateY(0);
		}
	}

	.operate {
		// width: -webkit-fill-available;
		height: 100rpx;
		position: fixed;
		bottom: 190rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 30rpx;
		right: 0;

		.operate-all {
			width: 0;
			height: 92rpx;
			border-radius: 92rpx;
			border: 2rpx solid #111111;
			background: #ffffff;
			font-size: 32rpx;
			color: #111111;
			font-family: MicrosoftYaHeiSemibold;
			transform: translateX(50px);
			opacity: 0;
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
				// width: 220rpx;
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
				padding: 0 24rpx;
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