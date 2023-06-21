<template>
	<van-popup :show="show" position="center" custom-class="info_detail" @close="onClose">
		<image :src="detail.imageUrl" mode="" @tap="preview(detail.imageUrl)"></image>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.name')}}:
			</view>
			<view class="info_detail_b_r">
				{{detail.materialName}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.SKUCode')}}:
			</view>
			<view class="info_detail_b_r">
				{{detail.oriSkuCode}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.Category')}}:
			</view>
			<view class="info_detail_b_r">
				{{detail.categoryPath}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.Specification')}}:
			</view>
			<view class="info_detail_b_r">
				{{detail.specifications}}
			</view>
		</view>
		<!-- 	<view class="info_detail_b">
			<view class="info_detail_b_l">
				Unit:
			</view>
			<view class="info_detail_b_r">
				{{detail.unit}}
			</view>
		</view> -->
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.supplier')}}:
			</view>
			<view class="info_detail_b_r">
				{{detail.supplierName}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				{{this.$t('index.Price')}}:
			</view>
			<view class="info_detail_b_r price">
				{{detail.retailPrice}} <text> {{detail.priceUnit}}</text>
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
		props: {
			detail: {}
		},
		data() {
			return {
				show: true
			}
		},
		methods: {
			preview(img) {
				uni.previewImage({
					urls: [
						img
					],
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				});
			},

			onClose() {
				this.$emit('onClose', false)
			}

		}
	}
</script>

<style lang="scss">
	.info_detail {
		width: 85%;
		border-radius: 40rpx;
		padding-bottom: 18rpx;

		image {
			margin: 40rpx 40rpx 30rpx 40rpx;
			width: -webkit-fill-available;
		}

		.info_detail_b {
			display: flex;
			padding: 0 40rpx 12rpx 40rpx;

			view {
				font-size: 24rpx;
				line-height: 40rpx;
			}

			.info_detail_b_l {
				width: 30%;
				color: #999999;

			}

			.info_detail_b_r {
				width: 70%;
				color: #111111;
			}

			.price {
				color: #C54646;

				text {
					color: #111111;
					margin-left: 5rpx;
				}
			}
		}
	}
</style>