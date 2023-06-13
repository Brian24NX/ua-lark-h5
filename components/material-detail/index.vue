<template>
	<van-popup :show="show" position="center" custom-class="info_detail" @close="onClose">
		<image :src="detail.imageUrl" mode="" @tap="preview()"></image>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Name:
			</view>
			<view class="info_detail_b_r">
				{{detail.materialName}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				SKU Code:
			</view>
			<view class="info_detail_b_r">
				{{detail.oriSkuCode}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Category:
			</view>
			<view class="info_detail_b_r">
				物料类/日常店铺物料
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Specification:
			</view>
			<view class="info_detail_b_r">
				{{detail.specifications}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Unit:
			</view>
			<view class="info_detail_b_r">
				{{detail.unit}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Supplier:
			</view>
			<view class="info_detail_b_r">
				{{detail.supplierName}}
			</view>
		</view>
		<view class="info_detail_b">
			<view class="info_detail_b_l">
				Price:
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
			preview() {
				uni.previewImage({
					urls: [
						"https://3aportal-public.oss-cn-shenzhen.aliyuncs.com/newSchool/photo/2022/11/28/1669620678526_6hLyexTnJSyA5f64337904892f013b9883fd2f8de34a.jpg"
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