<template>
	<div class="kl-step">
		<div class="kl-step-header">
			<div :class="[
                    'kl-step-left-line',
					maxIndex == index+1 ? 'transparent':''
                ]"></div>
			<div :class="['default-icon',activeIndex == index?'kl-step-top-index-active':'kl-step-top-index']">
			</div>
		</div>

		<div class="kl-step-slot">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {

			activeIndex: {
				type: Number,
				default: 1
			},
			index: {
				type: Number,
				default: 1
			},
			maxIndex: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	$size: 24rpx;
	$defaultColor: #666;
	$lineWidth: 2rpx;
	$primary: #111111;

	.kl-step {
		font-size: 16rpx;
		color: #666;
		display: flex;
		align-items: start;

		.kl-step-header {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;

			.kl-step-left-line {
				width: $lineWidth;
				height: 132rpx;
				background-color: #979797;
			}
		}

		.default-icon {
			height: $size;
			width: $size;
			border-radius: 50%;

		}

		.kl-step-top-index {
			background: url("../../static/inactiveIcon.png") center no-repeat;
			background-size: $size ;
		}

		.kl-step-top-index-active {
			background: url("../../static/activeIcon.png") center no-repeat;
			background-size: $size ;
		}

		.kl-step-center-title,
		.kl-step-slot {
			color: $defaultColor;
			text-align: center;
			flex: 1 auto;
		}

		.transparent {
			display: none !important;
		}
	}
</style>