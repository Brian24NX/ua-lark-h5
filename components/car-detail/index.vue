<template>
	<view class="container">
		<van-popup :show="true" round position="bottom" custom-style="padding-bottom:160rpx" @close="onClose">
			<view class="clearAll">
				<view class="clearAll_l">
					Clear All
				</view>
				<view class="clearAll_r"  @click="clearAll">
					<image src="../../static/delete.png" mode=""></image>
					Clear All
				</view>
			</view>
			<view class="conts" v-for="(item,index) in contlist" :key="item.id">
				<view class="cont">
					<image src="../../static/xiezi.png" mode="aspectFit" />
					<view class="prod-info" @click.native="tz(item.id,item.name,item)">
						<view class="prodname">定制明兴 M17</view>
						<view class="prodesc">上海齐心共赢文化用品发展有限公司</view>
						<view class="price-nums">
							￥30 <text>CNY</text>
						</view>
					</view>
					<view class="pro-right">
						<view class="pro-right-delete">
							<image src="../../static/delete_active.png" mode=""></image>删除
						</view>
						<van-stepper custom-class="stepper" :value="1" theme="round" button-size="25px"
							input-class="input" plus-class="add" minus-class="minus" bind:change="onChange" />
					</view>
				</view>
				<van-divider customStyle="margin:0;color: #ddd; border-color: #ddd; padding-left:166rpx"
					v-if="index !=contlist.length-1" />
			</view>
		</van-popup>
	</view>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	import vanStepper from "@/wxcomponents/@vant/weapp/stepper/index"
	import vanDivider from "@/wxcomponents/@vant/weapp/divider/index"

	export default {
		props: {
			contlist: {
				type: Array,
				default: []
			},
		},
		components: {
			vanPopup,
			vanStepper,
			vanDivider
		},
		data() {
			return {
			
			}
		},
		methods: {
			onClose() {
				this.$emit('hideDetail', false)
			},
			clearAll() {
				this.$emit('showDialog',true)
			}
		}
	}
</script>

<style lang="scss">
	.clearAll {
		display: flex;
		justify-content: space-between;
		margin: 0rpx 30rpx;
		padding: 40rpx 0;
		border-bottom: 2rpx solid #ddd;

		view {
			font-size: 28rpx;
			line-height: 40rpx;
		}

		.clearAll_l {
			color: #111111;
		}

		.clearAll_r {
			color: #999999;
			display: flex;
			align-items: center;

			image {
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;
			}
		}
	}

	.cont {
		display: flex;
		align-items: center;
		font-size: 14px;
		padding: 28rpx 30rpx 28rpx 30rpx;
		position: relative;

		image {
			width: 116rpx;
			height: 116rpx;
			margin-right: 20rpx;
		}

		.prod-info {
			.prodname {
				font-size: 28rpx;
				color: #111111;
				line-height: 38rpx;
			}

			.prodesc {
				font-size: 20rpx;
				color: #999999;
				line-height: 28rpx;
				margin: 8rpx 0 14rpx 0;
			}

			.price-nums {
				font-size: 28rpx;
				font-weight: bold;
				color: #C54646;
				line-height: 40rpx;

				text {
					font-size: 20rpx;
					color: #111111;
					line-height: 40rpx;
					margin-left: 5rpx;
				}
			}
		}

		.minus {
			border: 1px solid #111 !important;
			color: #111 !important;
		}

		.add {
			background-color: #111 !important;
			color: #fff !important;
		}

		.input {
			width: 40rpx !important;
		}

		.pro-right {
			position: absolute;
			right: 30rpx;

			.pro-right-delete {
				font-size: 24rpx;
				color: #111111;
				line-height: 32rpx;
				margin-bottom: 25rpx;
				display: flex;
				justify-content: end;
				align-items: center;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}

		}
	}
</style>