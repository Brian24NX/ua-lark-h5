<template>
	<van-popup :show="true" position="center" custom-style="width: 85%;border-radius: 40rpx;background-color:#f8f8f8"
		z-index='900' @close="onClose">
		<view class="dialog flex-vcenter column">
			<h3 class="title">{{title}}</h3>
			<view class="color-1DBA00 title2" v-if="pageFrom=='myApproval'&&isOk">{{this.$t('index.PO')}}</view>
			<view class="massage " v-if="pageFrom=='clear'|| pageFrom=='submit'">
				{{tip}}
			</view>
			<view class="massage " v-if="pageFrom=='approval'">
				<text>{{this.$t('index.selected')}}<text style="font-weight: bold;color: #111;">{{num}}</text>，</text>
				{{tip}}
			</view>
			<!-- 备注 -->
			<view class="textareas" v-if="pageFrom=='remark'">
				{{content}}
			</view>
			<view class="dialog-content" v-if="pageFrom=='myApproval'">
				<view class="dialog-content-item" v-for="(item, i) in orderList">
					<view class="dialog-content-order flex-vcenter">
						<view v-if="item.purchaseOrderNo">{{item.purchaseOrderNo}}</view>
						<view v-else>{{Order}}{{i+1}}</view>
						<view>{{item.nameChild}}</view>
					</view>
					<view class="dialog-content-details ">
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">{{store}}：</view>
							<view>{{item.store}}</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">{{totalCost}}：</view>
							<view>{{item.totalCost}}{{item.priceUnit}}</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">{{Quantity}}：</view>
							<view>{{item.quantity}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="cancle" @click="onClose" v-if="pageFrom !='remark'">
					{{this.$t('index.cancle')}}
				</view>
				<view class="confirm" @click="confirm">
					{{pageFrom =='remark'?'OK':this.$t('index.confirm')}}
				</view>
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
			pageFrom: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			tip: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			num: {
				type: Number,
				default: 0
			},
			orderList: {
				type: Array,
				default: []
			},
			isOk: false
		},
		data() {
			return {
				current: 1,
				store: this.$t('index.store'),
				totalCost: this.$t('index.TotalCost'),
				Quantity: this.$t('index.Quantity'),
				Order: this.$t('index.Order')
			}
		},
		methods: {
			onClose() {
				if(this.pageFrom == 'myApproval' && this.isOk){
					this.$emit('hideDialog', 'reload')
					return
				}
				this.$emit('hideDialog', false)
			},
			confirm() {
				if (this.pageFrom == 'clear') {
					this.$emit('deleteAll')
					this.$store.commit('deleteCarAll')
					this.$emit('hideDialog', false)
				} else if (this.pageFrom == 'submit' || this.pageFrom == 'approval') {
					this.$emit('submit')
					this.$emit('hideDialog', false)
				} else if (this.pageFrom == 'myApproval' && !this.isOk) {
					this.$emit('createOrder')
				} else if (this.pageFrom == 'myApproval' && this.isOk) {
					this.$emit('hideDialog', 'reload')
				}else{
					this.$emit('hideDialog', false)
				}

			}
		}
	}
</script>
<style lang="scss" scoped>
	.textareas {
		width: -webkit-fill-available;
		background: #F8F8F8;
		border-radius: 24rpx;
		border: 2rpx solid #DDDDDD;
		font-size: 28rpx;
		color: #111111;
		line-height: 38rpx;
		margin: 32rpx 40rpx 0 40rpx;
		padding: 30rpx;
	}

	.flex-vcenter {
		display: flex;
		align-items: center;
	}

	.column {
		flex-direction: column;
	}

	.dialog {
		background-color: #F8F8F8;

		.title {
			text-align: center;
			margin-top: 56rpx;
			font-size: 32rpx;
			font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
			font-weight: bold;
			color: #111111;
			line-height: 40rpx;
		}

		.title2 {
			padding: 32rpx 0rpx;
			font-size: 32rpx;
			font-family: MicrosoftYaHei;
			color: #1DBA00;
			line-height: 40rpx;
		}

		.color-1DBA00 {
			color: #1DBA00;
		}

		.color-999 {
			color: #999999;
		}

		.dialog-content {
			width: 100%;
			padding: 0rpx 40rpx;
			box-sizing: border-box;
			max-height: 700rpx;
			overflow-y: scroll;

			.dialog-content-item {
				margin-top: 32rpx;
				width: 100%;
				// height: 200rpx;
				background: #F8F8F8;
				border-radius: 24rpx;
				border: 2rpx solid #DDDDDD;
				padding: 0rpx 30rpx;
				box-sizing: border-box;

				.dialog-content-order {
					display: flex;
					align-items: center;
					height: 100rpx;
					font-size: 28rpx;
					font-family: MicrosoftYaHeiSemibold;
					color: #111111;
					justify-content: space-between;
					border-bottom: 2rpx solid #DDDDDD;
					font-weight: 600;
				}

				.dialog-content-details {
					padding: 22rpx 0rpx 32rpx 0rpx;
					font-size: 24rpx;
					color: #111111;

					.width-150 {
						width: 150rpx;
					}
				}

				.dialog-content-details-item {
					margin-top: 24rpx;
					height: 32rpx;
					box-sizing: border-box;
				}
			}
		}

		.massage {
			text-align: center;
			margin: 30rpx 70rpx 0rpx 70rpx;
			font-size: 28rpx;
			color: #999999;
			line-height: 40rpx;
		}

		.btn {
			display: flex;
			justify-content: center;
			margin: 60rpx 0rpx 42rpx 0rpx;

			view {
				width: 194rpx;
				height: 70rpx;
				border-radius: 35rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 38rpx;
				border: 2rpx solid #111111;
				text-align: center;
				line-height: 70rpx;
			}

			.cancle {
				color: #111;
				margin-right: 40rpx;
			}

			.confirm {
				color: #fff;
				background: #111111;
			}
		}
	}
</style>