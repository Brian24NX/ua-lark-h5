<!-- 申请单 -->
<template>
	<view class="info">
		<van-checkbox use-icon-slot :value="dataDetail.choose" custom-class="vancheck"
			@change.native="onChange(dataDetail)" v-if="dataDetail.itemStatus ==5 && storeRole==3">
			<image class="checkbox" slot="icon" :src="dataDetail.choose ? activeIcon : inactiveIcon" />
		</van-checkbox>
		<image class="imageUrl" :src="dataDetail.imageUrl" mode="" @click="toDetail"></image>
		<view class="info_r" @click="toDetail">
			<view class="info_r_t">
				<view class="title">
					{{dataDetail.materialName}}
				</view>
				<view>
					<text class="bold"
						style="color: #C54646;">{{dataDetail.totalRetailPrice}}</text>
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
					x{{dataDetail.approvedQuantity||dataDetail.applyQuantity}}
				</view>
				<view>
					<text class="bold" style="color: #C54646;">{{getStatus}}</text>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vanCheckbox from "@/wxcomponents/@vant/weapp/checkbox/index"
	export default {
		components: {
			vanCheckbox
		},
		props: {
			dataDetail: {},
			parentIndex: 0
		},
		computed: {
			// 2. Waiting for Approval - 待审核 3. Approved - 待派单 - 区经已审核 4. Dispatched - 待发货 - 已派单  5. Delivered - 待收货 - 已发货 6. Received - 已收货（已完成） 7. Rejected - 已驳回
			getStatus() {
				switch (this.dataDetail.itemStatus) {
					case 2:
						return this.$t('index.WaitingApproval')
						break;
					case 3:
						return this.$t('index.approved')
						break;
					case 4:
						return this.$t('index.dispatched')
						break;
					case 5:
						return this.$t('index.delivered')
						break;
					case 6:
						return this.$t('index.received')
						break;
					case 7:
						return this.$t('index.rejected')
						break;
				}
			}
		},
		data() {
			return {
				dialog: false,
				storeRole: uni.getStorageSync('user').storeRole,
				activeIcon: '../../static/checkbox-active.png',
				inactiveIcon: '../../static/checkbox.png',
			}
		},
		onLoad() {},
		methods: {
			onChange(val) {
				if (val.choose) {
					this.$set(val, 'choose', false)
				} else {
					this.$set(val, 'choose', true)
				}
				console.log(val)
				this.$emit('selectOrder', val, this.parentIndex)
			},
			hideDialog(val) {
				this.dialog = val
			},
			toDetail() {
				uni.navigateTo({
					url: "/pages/materialDetails/materialDetails?detail=" + JSON.stringify(this.dataDetail)
				})
			}
		}
	}
</script>

<style lang="scss">
	.vancheck {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}

	.checkbox {
		width: 32rpx;
		height: 32rpx;
	}

	.info {
		display: flex;
		padding: 20rpx 0 20rpx 52rpx;
		border-top: 2rpx solid #dddddd;
		position: relative;

		.imageUrl {
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