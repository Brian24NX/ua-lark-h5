<template>
	<view class="container">
		<view class="material">
			<view class="titles">
				Material
			</view>
			<van-cell title="Applied Quantity" value="1" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Approved Quantity" value="1" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Category" value="物料类/日常店铺物料" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Specification" value="直径13mm｜高10mm｜100个/包" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Total Price" value="64.00CNY" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Total Cost" value="70.00CNY" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Comment" label="Expect to be delivered as soon as possible" title-class="title"
				value-class="content" custom-class="bgColor borderNone" />
		</view>
		<view class="reference">
			<view class="titles">
				Reference
			</view>
			<van-cell title="Applied Quantity" value="1" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Approved Quantity" value="1" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Category" value="物料类/日常店铺物料" title-class="title" value-class="content"
				custom-class="bgColor borderNone" />
		</view>
		<view class="procedure">
			<view class="titles">
				Procedure
			</view>
			<kl-steps :active="activeStep">
				<kl-step v-for="(item,index) in steps" :key="index" :activeIndex="2" :index="index"
					:maxIndex="steps.length">
					<view class="step-top">
						<text>{{item.name}}</text>
						<text style="font-weight: bold;">{{item.status}}</text>
					</view>
					<view class="step-bottom">
						<text>{{item.role}}</text>
						<text>{{item.time}}</text>
					</view>
				</kl-step>
			</kl-steps>


		</view>
	</view>
</template>

<script>
	import klSteps from "../../components/kl-steps/index.vue"
	import klStep from "../../components/kl-step/index.vue"
	export default {
		components: {
			klSteps,
			klStep
		},
		data() {
			return {
				currentSwipeItem: 0,
				active: 1,
				steps: [{
					name: "Cici Wang (092081)",
					role: "Store Manager",
					status: "Applied",
					time: '2023.03.01 10:30'
				}, {
					name: "Coco Li (092876)",
					role: "Store Manager",
					status: "Applied",
					time: '2023.03.01 10:30'
				}, {
					name: "Coco Li (092876)",
					role: "Store Manager",
					status: "Applied",
					time: '2023.03.01 10:30'
				}]
			}
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t("index.itemDetails")
			});

		},
		mounted() {

		},
		methods: {
			onStep(index) {
				this.currentSwipeItem = index
			},
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 0 30rpx;

		.material,
		.reference,
		.procedure {
			background: #F8F8F8;
			border-radius: 40rpx;
			margin-bottom: 28rpx;
			overflow: hidden;

			.bgColor {
				width: auto !important;
				background-color: #f8f8f8 !important;
				margin: 0rpx 20rpx !important;
				padding: 30rpx 0 30rpx !important;
				border-bottom: 2rpx solid #DDDDDD;
			}

			.borderNone {
				border-bottom: none;
			}
		}

		.procedure {
			padding-bottom: 68rpx;
		}
	}



	.titles {
		font-size: 32rpx;
		font-weight: bold;
		color: #111111;
		line-height: 42rpx;
		padding: 30rpx 0 30rpx 20rpx;
		border-bottom: 2rpx solid #DDDDDD;
	}

	.title {
		font-size: 28rpx;
		color: #999999;
		line-height: 38rpx;
	}

	.content {
		font-size: 28rpx;
		color: #111111 !important;
		line-height: 38rpx;
	}

	.step-top {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #111111;
		line-height: 38rpx;
		padding: 0 20rpx 0 12rpx;
		margin-top: -4rpx;
	}

	.step-bottom {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999999;
		line-height: 32rpx;
		margin-top: 22rpx;
		padding: 0 20rpx 0 12rpx;
	}
</style>