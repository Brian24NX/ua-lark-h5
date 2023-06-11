<template>
	<van-popup :show="show" position="center" custom-style="width: 85%;border-radius: 20px;" @close="onClose">
		<view class="dialog">
			<h3 class="title">{{this.$t('index.Confirm')}}</h3>
			<view class="massage">
				{{this.$t('index.clean_up')}}
			</view>
			<view class="btn">
				<view class="cancle" @click="onClose">
					{{this.$t('index.cancle')}}
				</view>
				<view class="confirm" @click="confirm">
					{{this.$t('index.confirm')}}
				</view>
			</view>
		</view>
	</van-popup>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	export default {
		components: {
			vanPopup
		},
		data() {
			return {
				current: 1,
				show: true
			}
		},
		methods: {
			onClose() {
				this.show = false
				this.$emit('hideDialog', false)
			},
			confirm() {
				this.show = false
				this.$emit('hideDialog', false)
			}
		}
	}
</script>

<style lang="scss">
	.dialog {
		.title {
			text-align: center;
			margin-top: 56rpx;
			font-size: 32rpx;
			font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
			font-weight: bold;
			color: #111111;
			line-height: 40rpx;
		}

		.massage {
			text-align: center;
			margin: 30rpx 24rpx 62rpx 22rpx;
			font-size: 28rpx;
			color: #999999;
			line-height: 40rpx;
		}

		.btn {
			    display: flex;
			    justify-content: center;
			margin: 0 0rpx 42rpx 0rpx;
			view {
				width: 194rpx;
				height: 70rpx;
				border-radius: 35rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 38rpx;
				border: 2rpx solid #111111;
				text-align: center;
				line-height: 70rpx;
			}
			.cancle {
				color: #111;
				margin-right: 40rpx;
			}
			.confirm {
				color: #fff;
				background: #111111;
			}
		}
	}
</style>