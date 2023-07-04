<template>
	<view class="container">
		<image src="../../static/network.png" mode=""></image>
		<view class="title">
			{{$t('index.networkErr')}}
		</view>
		<view class="desc">
			{{$t('index.networkDec')}}
		</view>
		<view class="retry" @click="retry">
			{{$t('index.Retry')}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t("index.networkErr")
			});
		},
		methods: {
			retry() {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		text-align: center;
		margin: 0 66rpx;
	}

	image {
		width: 520rpx;
		height: 360rpx;
		margin-top: 218rpx;
	}

	.title {
		font-size: 36rpx;
		color: #111111;
		line-height: 40rpx;
		margin: 40rpx 0 28rpx 0;
	}

	.desc {
		font-size: 32rpx;
		color: #999999;
		line-height: 40rpx;
	}

	.retry {
		width: 194rpx;
		height: 70rpx;
		background: #111111;
		border-radius: 35rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 70rpx;
		margin: 60rpx auto;
	}
</style>