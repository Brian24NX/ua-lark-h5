<template>
	<view class="info">
		<image :src="dataDetail.imageUrl" mode=""></image>
		<view class="info_r">
			<view class="info_r_l">
				<view class="title">
					{{dataDetail.materialName}}
				</view>
				<view class="desc">
					{{dataDetail.supplierName}}
				</view>
				<view class="remark bold" v-if="dataDetail.remark" @click="dialog=true">
					Remark <image src="../../static/more.png"></image>
				</view>
			</view>
			<view class="info_r_r">
				<view class="bold">
					x{{dataDetail.applyQuantity}}
				</view>
				<view>
					<text class="bold">{{dataDetail.retailPrice*dataDetail.applyQuantity}}</text> <text style="font-size: 16rpx; margin-left: 2rpx;">{{dataDetail.priceUnit}}</text>
				</view>
			</view>
		</view>
		<public-dialog v-if="dialog" :title="'Remark'" :pageFrom="'remark'" :content="dataDetail.remark" @hideDialog="hideDialog"></public-dialog>
	</view>
</template>

<script>
		import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		components: {
			publicDialog
		},
		props: {
			dataDetail: {}
		},
		data() {
			return {
				dialog:false
				// keyword:""
			}
		},
		onLoad() {

		},
		methods: {
			hideDialog(val){
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
			flex: 1;
			justify-content: space-between;
			font-size: 24rpx;
			color: #111111;
			line-height: 32rpx;

			.info_r_l,
			.info_r_r {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.info_r_l {
				.desc {
					color: #999999;
				}

				.remark {
					image {
						width: 20rpx;
						height: 18rpx;
						margin-left: 4px;
						vertical-align: unset;
					}
				}
			}
		}

		.bold {
			font-weight: bold;
			color: #111111;
			line-height: 32rpx;
		}
	}
</style>