<template>
	<view class="info">
		<image src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
			mode=""></image>
		<view class="info_r">
			<view class="info_r_l">
				<view class="title">
					定制明兴 M17
				</view>
				<view class="desc">
					上海齐心共赢
				</view>
				<view class="remark bold">
					Remark <image src="../../static/more.png"></image>
				</view>
			</view>
			<view class="info_r_r">
				<view class="bold">
					x1
				</view>
				<view>
					<text class="bold">32.00</text> <text style="font-size: 16rpx; margin-left: 2rpx;">CNY</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataDetail: {}
		},
		data() {
			return {
				// keyword:""
			}
		},
		onLoad() {

		},
		methods: {
			// searchClick(key){
			// 	this.$emit('searchClick',key)
			// }
		}
	}
</script>

<style lang="scss">
	.info {
		display: flex;
		padding: 20rpx 0;
		border-top: 2rpx solid #dddddd;

		image {
			width: 176rpx;
			height: 176rpx;
			background: #F0F0F0;
			border-radius: 24rpx;
			margin-right: 16rpx;
		}

		.info_r {
			display: flex;
			flex: 1;
			justify-content: space-between;
			font-size: 24rpx;
			color: #111111;
			line-height: 32rpx;

			.info_r_l,
			.info_r_r {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.info_r_l {
				.desc {
					color: #999999;
				}

				.remark {
					image {
						width: 20rpx;
						height: 18rpx;
						margin-left: 4px;
						vertical-align: unset;
					}
				}
			}
		}

		.bold {
			font-weight: bold;
			color: #111111;
			line-height: 32rpx;
		}
	}
</style>