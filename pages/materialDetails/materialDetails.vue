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
						<view class="oriSkuCode">{{materialDetail.supplierSkuCode}}</view>
						<view style="text-align: right;;"><text style="font-weight: bold;"
								class="price">{{materialDetail.retailPrice}}</text> <text
								class="unit">{{materialDetail.priceUnit}}</text>
							<view class="cost" v-if="storeRole==10">
								{{$t('index.cost')}} {{materialDetail.costPrice}}{{materialDetail.priceUnit}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<van-cell :title="$t('index.AppliedQuantity')" :value="materialDetail.applyQuantity" title-class="title"
				value-class="content" custom-class="bgColor" />
			<van-cell v-if="materialDetail.approvedQuantity" :title="$t('index.approvedQuantity')"
				:value="materialDetail.approvedQuantity" title-class="title" value-class="content"
				custom-class="bgColor" />
			<van-cell :title="$t('index.Category')" :value="materialDetail.categoryName" title-class="title"
				value-class="content" custom-class="bgColor" />
			<van-cell :title="$t('index.Specification')" :value="materialDetail.specifications" title-class="title"
				value-class="content" custom-class="bgColor" />
			<van-cell :title="$t('index.TotalPrice')"
				:value="`${(materialDetail.retailPrice*materialDetail.applyQuantity).toFixed(2)}${materialDetail.priceUnit}`"
				title-class="title" value-class="content" custom-class="bgColor" />
			<van-cell :title="$t('index.TotalCost')"
				:value="`${(materialDetail.costPrice*materialDetail.applyQuantity).toFixed(2)}${materialDetail.priceUnit}`"
				title-class="title" value-class="content" custom-class="bgColor" v-if="storeRole==10" />
			<van-cell :title="$t('index.comment')" :value="materialDetail.remark" title-class="title"
				value-class="content" custom-class="bgColor borderNone" v-if="materialDetail.remark" />
		</view>
		<view class="reference">
			<view class="titles">
				{{$t('index.reference')}}
			</view>
			<van-cell :title="$t('index.store')" :value="`${materialDetail.storeName}`" title-class="title" 
				value-class="content right" custom-class="bgColor" @click="showAddress" />
			<van-cell title="PO" :value="materialDetail.purchaseOrderNo" title-class="title" value-class="content"
				custom-class="bgColor" v-if="materialDetail.purchaseOrderNo" />
			<van-cell :title="$t('index.TrackingNumber')" :value="materialDetail.trackingNo" title-class="title"
				value-class="content" custom-class="bgColor borderNone" v-if="materialDetail.trackingNo" />
		</view>
		<view class="procedure" v-if="steps.length">
			<view class="titles">
				{{$t('index.Procedure')}}
			</view>
			<kl-steps :active="activeStep">
				<kl-step v-for="(item,index) in steps" :key="index" :activeIndex="steps.length-1" :index="index"
					:maxIndex="steps.length">
					<view class="step-top">
						<text>{{item.role}}</text>
						<text
							:style="item.status=='Adjust and Dispatched'?'font-weight: bold;color:#C54646':'font-weight: bold;'">{{item.status}}</text>
					</view>
					<view class="step-bottom">
						<text>{{item.name}} <text v-if="item.no">({{item.no}})</text> </text>
						<text>{{formatTimeFn(item.time)}}</text>
					</view>
				</kl-step>
			</kl-steps>
		</view>
		 <public-dialog v-if="addressShow"  :pageFrom="'detail'" @hideDialog="dialogHide" :storeDetail="storeDetail"/>
	</view>
</template>

<script>
	import klSteps from "../../components/kl-steps/index.vue"
	import klStep from "../../components/kl-step/index.vue"
	import publicDialog from "../../components/public-dialog/index.vue"
	import {
		formatDate
	} from '../../fetch/tools.js'
	export default {
		components: {
			klSteps,
			klStep,
			publicDialog
		},
		data() {
			return {
				currentSwipeItem: 0,
				active: 1,
				steps: [],
				materialDetail: {},
				addressShow:false,
				storeDetail:{},
				// 1:大区经 2:小区经 3:店长 4:店员 10:OPS',
				storeRole: uni.getStorageSync('user').storeRole
			}
		},

		onLoad(option) {
			this.materialDetail = JSON.parse(option.detail)
			console.log(this.materialDetail)
			uni.setNavigationBarTitle({
				title: this.$t("index.itemDetails")
			});
			this.getSteps(this.materialDetail.orderItemId)
		},
		mounted() {

		},
		methods: {
			formatTimeFn(val) {
				return formatDate(val)
			},
			getSteps(orderItemId) {
				this.$api.getSteps(orderItemId).then(res => {
					console.log(res)
					if (res.code == '200') {
						this.steps = res.data.list
						this.storeDetail = res.data.store
					}
				})
			},
			onStep(index) {
				this.currentSwipeItem = index
			},
			showAddress(){
				this.addressShow=true
			},
			dialogHide(val){
				this.addressShow=val
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 0 30rpx;

		.info {
			display: flex;
			padding: 20rpx;
			border-bottom: 2rpx solid #DDDDDD;
			;

			image {
				width: 140rpx;
				height: 140rpx;
				background: #F0F0F0;
				border-radius: 16rpx;
			}

			.info_r {
				flex: 1 auto;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-size: 24rpx;
					color: #111111;
					line-height: 32rpx;
				}

				.info_r_b {
					display: flex;
					justify-content: space-between;
					align-items: end;
				}

				.oriSkuCode {
					font-size: 24rpx;
					font-weight: bold;
					color: #111111;
					line-height: 32rpx;
				}

				.price {
					font-size: 24rpx;
					color: #C54646;
					line-height: 32rpx;
				}

				.unit {
					font-size: 16rpx;
					color: #111111;
					line-height: 22rpx;
				}

				.cost {
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
     .right{
		 padding-right: 22rpx;
		 background: url("../../static/right.png") center right no-repeat;
		 background-size: 12rpx 16rpx;
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