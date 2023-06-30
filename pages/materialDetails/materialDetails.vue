<template>
	<view class="container">
		<view class="material">
			<view class="titles">
				{{$t('index.material')}}
			</view>
			<view class="info">
				<image :src="materialDetail.imageUrl" mode=""></image>
				<view class="info_r">
					<text class="name">{{materialDetail.materialName}}</text>
					<view class="info_r_b">
						<view class="oriSkuCode">{{materialDetail.oriSkuCode}}</view>
						<view style="text-align: right;;"><text style="font-weight: bold;" class="price">{{materialDetail.retailPrice}}</text> <text class="unit">{{materialDetail.priceUnit}}</text>
						  <view class="cost">
						  	{{$t('index.cost')}}  {{materialDetail.costPrice}}{{materialDetail.priceUnit}}
						  </view>
						</view>
					</view>
				</view>
			</view>
			<van-cell :title="$t('index.AppliedQuantity')" :value="materialDetail.applyQuantity" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell v-if="materialDetail.approvedQuantity" :title="$t('index.approvedQuantity')" :value="materialDetail.approvedQuantity" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.Category')" :value="materialDetail.categoryName" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.Specification')" :value="materialDetail.specifications" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.TotalPrice')" :value="`${(materialDetail.retailPrice*materialDetail.applyQuantity).toFixed(2)}${materialDetail.priceUnit}`" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.TotalCost')" :value="`${(materialDetail.costPrice*materialDetail.applyQuantity).toFixed(2)}${materialDetail.priceUnit}`" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.comment')" :value="materialDetail.remark" title-class="title"
				value-class="content" custom-class="bgColor borderNone" />
		</view>
		<view class="reference">
			<view class="titles">
				{{$t('index.reference')}}
			</view>
			<van-cell :title="$t('index.store')" :value="materialDetail.storeName" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="PO" :value="materialDetail.purchaseOrderNo" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell title="Tracking Number" value="物料类/日常店铺物料" title-class="title" value-class="content"
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
				}],
				materialDetail:{}
			}
		},

		onLoad(option) {
			this.materialDetail = JSON.parse(option.detail)
			console.log(JSON.parse(option.detail))
			uni.setNavigationBarTitle({
				title: this.$t("index.itemDetails")
			});
// 			this.materialDetail = this.$store.state.carShop[0]
// console.log(this.$store.state.carShop[0])
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
.info{
	display: flex;
	padding:20rpx;
	border-bottom: 2rpx solid #DDDDDD;;
	image{
		width: 140rpx;
		height: 140rpx;
		background: #F0F0F0;
		border-radius: 16rpx;
	}
	.info_r{
		    flex: 1 auto;
			margin-left: 24rpx;
		.name{
			font-size: 24rpx;
			color: #111111;
			line-height: 32rpx;
		}
		.info_r_b{
			display: flex;
			    justify-content: space-between;
			    align-items: end;
		}
		.oriSkuCode{
			font-size: 24rpx;
		font-weight: bold;
			color: #111111;
			line-height: 32rpx;
		}
		.price{
			font-size: 24rpx;
			color: #C54646;
			line-height: 32rpx;
		}
		.unit{
			font-size: 16rpx;
			color: #111111;
			line-height: 22rpx;
		}
		.cost{
			font-size: 20rpx;
			color: #006EFF;
			line-height: 28rpx;
		}
	}
}
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