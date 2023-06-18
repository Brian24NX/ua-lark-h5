<template>
	<van-popup :show="true" position="center"
		custom-style="width: 85%;border-radius: 40rpx;z-index:500,background-color:#f8f8f8" @close="onClose">
		<view class="dialog flex-vcenter column">
			<h3 class="title">{{title}}</h3>
			<view class="color-1DBA00 title2" v-if="pageFrom=='myApproval'">PO created successful！</view>
			<view class="massage " v-if="pageFrom=='clear'|| pageFrom=='submit'">
				{{tip}}
			</view>
			<view class="massage " v-if="pageFrom=='approval'">
				<text>{{this.$t('index.selected')}}<text style="font-weight: bold;color: #111;">{{num}}</text>，</text>  {{tip}}
			</view>
			<!-- 备注 -->
			<textarea :value="content" v-if="pageFrom=='remark'" disabled="true"></textarea>
			<view class="dialog-content" v-if="pageFrom=='myApproval'">
				<view class="dialog-content-item">
					<view class="dialog-content-order flex-vcenter">
						<view>SO1264543</view>
						<view>上海齐心共赢</view>
					</view>
					<view class="dialog-content-details ">
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Store：</view>
							<view>广州太古汇</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Total Cost：</view>
							<view>800CNY</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Quantity：</view>
							<view>2</view>
						</view>
					</view>
				</view>
				<view class="dialog-content-item">
					<view class="dialog-content-order flex-vcenter">
						<view>SO1264543</view>
						<view>上海齐心共赢</view>
					</view>
					<view class="dialog-content-details ">
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Store：</view>
							<view>广州太古汇</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Total Cost：</view>
							<view>800CNY</view>
						</view>
						<view class="dialog-content-details-item flex-vcenter">
							<view class="width-150 color-999">Quantity：</view>
							<view>2</view>
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
			num:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				current: 1
			}
		},
		methods: {
			onClose() {
				this.$emit('hideDialog', false)
			},
			confirm() {
				if (this.pageFrom == 'clear') {
					this.$emit('deleteAll')
					this.$store.commit('deleteCarAll')
				}
				if (this.pageFrom == 'submit' ||this.pageFrom=='approval') {
					this.$emit('submit')
				}
				this.$emit('hideDialog', false)
			}
		}
	}
</script>
<style lang="scss" scoped>
	textarea {
		width: -webkit-fill-available;
		height: 132rpx;
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