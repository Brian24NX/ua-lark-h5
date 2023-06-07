<template>
	<view class="nav-header">
		<image class="arrow-down" src="../../static/down-arrow.png" mode="" @click="back"></image>
		<view class="barTitle">{{lang}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			lang: ""
		},
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},

		}
	}
</script>

<style lang="scss">
	.nav-header {
		height: 73px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.arrow-down {
			height: 25px;
			width: 28px;
			display: inline-block;
			position: absolute;
			left: 0px;
		}

		.arrow-down::after {
			content: "";
			height: 18px;
			width: 18px;
			border-width: 2px 2px 0 0;
			border-color: #000;
			border-style: solid;
			-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			position: absolute;
			transform: rotate(136deg);
		}

	}
</style>