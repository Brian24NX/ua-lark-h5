<template>
	<view class="container">
		<view class="nav">
			<view class="nav-l">
				<view class="recent">{{this.$t('index.recent')}}</view>
				<view class="title">
					{{newApplication}}
				</view>
			</view>
			<image class="nav-r" src="../../static/arrow-right.png" mode=""></image>
		</view>
		<view class="btn" v-if="haveBtn">
			<view class="">
				{{ this.$t('index.unapproved')}}
			</view>
			<view class="">
				{{ this.$t('index.passed')}}
			</view>
			<view class="" v-if="haveRefused">
				{{ this.$t('index.refused')}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			newApplication: "",
			haveRefused: false,
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
		padding-bottom: 40rpx;
	}

	.btn {
		display: flex;
		padding-left: 30rpx;
		margin-top: 36rpx;

		view {
			width: 194rpx;
			height: 70rpx;
			border-radius: 35rpx;
			border: 2rpx solid #111111;
			font-size: 28rpx;
			text-align: center;
			line-height: 70rpx;
			margin-right: 10rpx;
		}

		view:not(:first-child) {
			color: #fff;
			background-color: #111111;
		}
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 30rpx 0 30rpx;

		.nav-l {

			image {
				width: 152rpx;
				height: 152rpx;
				margin-right: 20rpx;
			}

			view {
				font-size: 60rpx;
				color: #111111;
				line-height: 60rpx;
			}

			.recent {
				font-size: 28rpx;
				color: #666666;
				line-height: 38rpx;
			}

			.title {
				width: 310rpx;
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
		}
	}
</style>