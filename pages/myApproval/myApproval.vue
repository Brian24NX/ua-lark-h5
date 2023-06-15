<template>
	<view class="container">
		<view class="searchbar">
			<!-- 搜索 -->
			<search-bar @searchClick="searchClick"></search-bar>
			<!-- 中心区域 -->
			<drop-down-list :key="item" @selectMenu="selectMenu(arguments)" @hideMenu="hideMenu"
				:dataList="dataList"></drop-down-list>
		</view>
		<view class="content">
			<view class="goods-info" v-for="(item,index) in itemList" :key="index">
				<view class="info-header">
					<view class="info-header-top">
						<van-checkbox use-icon-slot :value="checked" custom-class="vancheck" bind:change="onChange">
							<image class="checkbox" slot="icon" :src="checked ? activeIcon : inactiveIcon" />
						</van-checkbox>
						<text style="margin-left: 20rpx;">上海太古汇</text>
						<image class="unfold" :style="item.open?'transform: rotate(180deg);':'transform: rotate(0deg);'"
							src="../../static/unfold.png" mode="" @click="changeContent(item,index)">
						</image>
					</view>
					<view class="info-header-bottom">
						<view class="info-header-bottom-l">
							<view>Claire Wang</view>
							<view>2023.06.04 10:54</view>
						</view>
						<view class="info-header-bottom-r">
							<view>Quantity: <text>3</text> </view>
							<view>Total: <text>65.10CNY</text> </view>
						</view>
					</view>
				</view>
				<!-- 展开 -->
				<view class="" v-show="item.open==true">
					<material-item v-for="item in 2" :key="item"></material-item>
				</view>
			</view>
		</view>
		<view class="operate">
			<view
				:class="['operate-all','flex-center','font-bold','margin-right-10','z-index-1',btnActive?'operate-all-active':'']  ">
				Approve All
			</view>

			<view
				:class="['operate-all','flex-center','font-bold','margin-right-10','z-index-2',btnActive?'operate-all-active':'']">
				Approve All
			</view>
			<view class="batch flex-center font-bold" @click="btnActive = !btnActive">
				Batch
			</view>
		</view>
		<view class="footer">
			<view class="footer-l">
				<van-checkbox use-icon-slot :value="checked" custom-class="vancheck" bind:change="onChange">
					<image class="checkbox" slot="icon" :src="checked ? selectAll : notAll" />
				</van-checkbox>
				<text style="margin-top: 8rpx;">Selected: 2</text>
			</view>
			<view class="footer-r">
				<view style="margin-right: 40rpx;">
					<image class="approve" src="../../static/approve.png" mode=""></image>Approve
				</view>
				<view class="">
					<image class="reject" src="../../static/reject.png" mode=""></image>Reject
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<public-dialog v-if="dialogShow"></public-dialog>
	</view>
</template>

<script>
	import dropDownList from "../../components/drop-down-list/index.vue"
	import searchBar from "../../components/search-bar/index.vue"
	import materialItem from "../../components/material-item/index.vue"
	import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		components: {
			dropDownList,
			searchBar,
			materialItem,
			publicDialog
		},
		data() {
			return {
				btnActive: false,
				dialogShow: false,
				checked: true,
				activeIcon: '../../static/checkbox-active.png',
				inactiveIcon: '../../static/checkbox.png',
				selectAll: '../../static/selectall.png',
				notAll: '../../static/notall.png',
				dataList: [{
						name: "Store",
						show: false
					},
					{
						name: "Application Time",
						show: false
					}
				],
				level: "2",
				itemList: [{
						open: true,

					},
					{
						open: true,

					}
				]
			}
		},
		methods: {
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

			},
			changeContent(item, index) {
				this.itemList.forEach(i => {
					if (i.open !== this.itemList[index].open) {
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
					.info-header-top {
						display: flex;
						align-items: center;
						position: relative;


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
						margin-left: 52rpx;
						margin-bottom: 24rpx;

						.info-header-bottom-l {
							margin-right: 60rpx;
						}

						.info-header-bottom-l,
						.info-header-bottom-r {
							margin-top: 12rpx;

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
			width: 220rpx;
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
		padding: 0 30rpx 0 12rpx;
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
				width: 220rpx;
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
</style>