<template>
	<view class="">
		<view class="nav" v-if="haveIcon">
			<view class="nav-l">
				<image :src="img" mode=""></image>
				<view class="title">
					{{newApplication}}
				</view>
			</view>
			<image class="nav-r" src="../../static/arrow-right.png" mode=""></image>
		</view>
		<view class="nav" v-else>
			<view class="nav-l" style="flex-direction: column;align-items: start;">
				<view class="titles">
					{{myApplication}}
				</view>
				<view class="desc">
					{{check}}
				</view>
			</view>
			<image class="nav-r" src="../../static/arrow-right.png" mode=""></image>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			newApplication: "",
			myApplication: "",
			check: "",
			haveIcon: false,
			isOps: false,
			img: ""
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
	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22rpx 30rpx;

		.nav-l {
			display: flex;
			align-items: center;

			image {
				width: 112rpx;
				height: 112rpx;
				margin-right: 20rpx;
			}

			view {

				font-size: 48rpx;
				color: #111111;
				line-height: 48rpx;
			}

			.title {
				width: 280rpx;
				font-weight: bold;
			}

			.titles {
				font-weight: bold;
			}

			.desc {
				margin-top: 8rpx;
			}
		}

		.nav-r {
			width: 60rpx;
			height: 60rpx;
		}
	}
</style>