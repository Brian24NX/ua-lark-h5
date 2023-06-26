<template>
	<view class="info">
		<image :src="dataDetail.imageUrl" mode=""></image>
		<view class="info_r">
			<view class="info_r_t">
				<view class="title">
					{{dataDetail.materialName}}
				</view>
				<view>
					<text class="bold"
						style="color: #C54646;">{{(dataDetail.retailPrice*dataDetail.applyQuantity).toFixed(2)}}</text>
					<text style="font-size: 16rpx; margin-left: 2rpx;">{{dataDetail.priceUnit}}</text>
				</view>
			</view>
			<view class="info_r_c">
				<view class="desc">
					{{dataDetail.supplierName}}
				</view>
			</view>
			<view class="info_r_b">
				<view class="bold">
					x{{dataDetail.applyQuantity}}
				</view>
			<view>
				<text class="bold"
					style="color: #C54646;">Waiting for Approval</text>
				
			</view>
			</view>
		</view>
	<!-- 	<public-dialog v-if="dialog" :title="this.$t('index.comment')" :pageFrom="'remark'" :content="dataDetail.remark"
			@hideDialog="hideDialog"></public-dialog> -->
	</view>
</template>

<script>
	// import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		// components: {
		// 	publicDialog
		// },
		props: {
			dataDetail: {}
		},
		data() {
			return {
				dialog: false,
				storeRole:uni.getStorageSync('user').storeRole
			}
		},
		onLoad() {

		},
		methods: {
			NORMSTARTTIMEfilter(val) {
				const jsonDate = new Date(val).toJSON()
				return new Date(new Date(jsonDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
			},
			hideDialog(val) {
				this.dialog = val
			}
			// searchClick(key){
			// 	this.$emit('searchClick',key)
			// }
		}
	}
</script>

<style lang="scss">
	.info {
		display: flex;
		padding: 20rpx 0;
		border-top: 2rpx solid #dddddd;

		image {
			width: 176rpx;
			height: 176rpx;
			background: #F0F0F0;
			border-radius: 24rpx;
			margin-right: 16rpx;
		}

		.info_r {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			font-size: 24rpx;
			color: #111111;
			line-height: 32rpx;

			.info_r_t,
			.info_r_c,
			.info_r_b {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 20rpx;
					height: 18rpx;
					margin-left: 4px;
					vertical-align: unset;
				}

				.title {
					width: 70%;
				}

				.desc {
					color: #999999;
				}

				text.cost {
					font-size: 20rpx;
					color: #006EFF;
					line-height: 28rpx;
				}

				view {
					display: flex;
				}
			}
		}

		.bold {
			font-weight: bold;
			color: #111111;
			line-height: 32rpx;
			display: flex;
			align-items: center;

			.uni-input {
				width: 72rpx;
				height: 40rpx;
				border-radius: 6rpx;
				border: 1rpx solid #999999;
				margin-left: 16rpx;
			}
		}
	}
</style>