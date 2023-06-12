<template>
	<view class="container">
		<!-- 搜索 -->
		<search-bar @searchClick="searchClick"></search-bar>
		<!-- 中心区域 -->
		<view class="content">
			<drop-down-list :key="item" :dataList="dataList"></drop-down-list>
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
	</view>
</template>

<script>
	import dropDownList from "../../components/drop-down-list/index.vue"
	import searchBar from "../../components/search-bar/index.vue"
	import materialItem from "../../components/material-item/index.vue"
	export default {
		components: {
			dropDownList,
			searchBar,
			materialItem
		},
		data() {
			return {
				checked: true,
				activeIcon: '../../static/checkbox-active.png',
				inactiveIcon: '../../static/checkbox.png',
				selectAll: '../../static/selectall.png',
				notAll: '../../static/notall.png',
				dataList: [{
						name: "Store"
					},
					{
						name: "Application Time"
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
<style>
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
			margin: 38rpx 30rpx 40rpx 30rpx;

			.goods-info {
				background: #F8F8F8;
				border-radius: 40rpx;
				margin-top: 28rpx;
				padding: 16rpx 20rpx 20rpx 20rpx;

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