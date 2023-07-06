<template>
	<view class="container">
		<view class="nav">
			<view class="nav-l">
				<!-- <view class="recent">{{this.$t('index.recent')}}</view> -->
				<view class="title">
					{{newApplication}}
				</view>
			</view>
			<image class="nav-r" src="../../static/arrow-right.png" mode=""></image>
		</view>
		<view class="btns" v-if="haveBtn">
			<view class="btn" v-if="havepending">
				{{ $t('index.pending')}}
				<!-- <view class="num">
					2
				</view> -->
			</view>
			<view class="btn-b" v-else>
				<view class="btn">
					{{ $t('index.delivered')}}
					<!-- <view class="num">
						2
					</view> -->
				</view>
				<view class="btn">
					{{ $t('index.received')}}
				</view>
				<view class="btn">
					{{ $t('index.rejected')}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			newApplication: "",
			havepending: false,
			check: "",
			haveIcon: false,
			haveBtn: false,
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 16rpx;
		position: relative;
	}

	.btns {
		display: flex;
		padding-left: 30rpx;
		margin-top: 36rpx;

		.btn-b {
			display: flex;
		}

		.btn {
			width: 194rpx;
			height: 56rpx;
			border-radius: 35rpx;
			border: 2rpx solid #111111;
			font-size: 28rpx;
			text-align: center;
			line-height: 56rpx;
			margin-right: 10rpx;
			position: relative;
		}

		view:not(:first-child) {
			color: #fff;
			background-color: #111111;
		}

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
			right: 0;
			top: -20rpx;
		}
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 30rpx 0 30rpx;
		.nav-l {

			image {
				width: 152rpx;
				height: 152rpx;
				margin-right: 20rpx;
			}

			view {
				font-size: 48rpx;
				color: #111111;

				line-height: 48rpx;
			}
			.title {
				font-weight: bold;
			}

			.titles {
				font-weight: bold;
			}

			.desc {
				margin-top: 40rpx;
			}
		}

		.nav-r {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: 50%;
			right: 30rpx;
			transform: translateY(-50%);
		}
	}
	.nav:last-child{
		padding-top: 36rpx;
		// padding-bottom: 36rpx;
	}
</style>