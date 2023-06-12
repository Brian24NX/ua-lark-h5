<template>
	<view class="container">
		<search-bar @searchClick="searchClick"></search-bar>
		<view class="content">
			<drop-down-list :key="item" :dataList="dataList"></drop-down-list>
			<view class="goods-info" v-for="(item,index) in itemList" :key="index">
				<view class="info-header">
					<view class="info-header-top">
						<van-checkbox use-icon-slot :value="checked" bind:change="onChange">
							<image class="checkbox" slot="icon" :src="checked ? activeIcon : inactiveIcon" />
						</van-checkbox>
						上海太古汇
						<image class="unfold" src="../../static/unfold.png" mode=""  @click="changeContent(item,index)"></image>
					</view>
					<view class="info-header-bottom">
						<view class="">
							Claire Wang
						</view>
						<view class="">
							Quantity: 3
						</view>
						<view class="">
							2023.06.04 10:54
						</view>
						<view class="">
							Total: 65.10CNY
						</view>
					</view>
				</view>
				<!-- 展开 -->
				<view class="" v-show="item.open==true">
					<material-item v-for="item in 2" :key="item"></material-item>
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
<style lang="scss">
	.container {
		.content{
			margin: 38rpx 30rpx 40rpx 30rpx;
			.goods-info{
				background: #F8F8F8;
				border-radius: 40rpx;
				margin-top: 28rpx;
				padding: 16rpx 20rpx 20rpx 20rpx;
				.info-header {
							.info-header-top {
								display: flex;
								align-items: center;
				position: relative;
								.checkbox {
									width: 32rpx;
									height: 32rpx;
									    vertical-align: text-bottom;
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
				.info-header-bottom{
					font-size: 24rpx;
					color: #999999;
					line-height: 32rpx;
					column-width: 178rpx;
				}
						}
			}

		}

	}
</style>