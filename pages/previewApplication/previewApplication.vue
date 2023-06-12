<template>
	<view class="container">
		<!-- 区域 -->
		<view class="address">
			<image src="../../static/store.png" mode=""></image>广州太古汇
		</view>
		<view class="title">
			Material
		</view>
		<view class="product">
			<div id="article" class="article" :class="[status == 1 && 'extended']">
				<view class="info" v-for="item in 5">
					<image src="../../static/xiezi.png" mode=""></image>
					<view class="info_r">
						<view class="info_r_l">
							<view class="titles">
								定制明兴 M17
							</view>
							<view class="desc">
								上海齐心共赢
							</view>
							<view class="num">
								Quantity: 1
							</view>
						</view>
						<view class="info_r_r">
							32.00 <text>CNY</text>
						</view>
					</view>
				</view>
			</div>
			<view class="btn" @click="openOrClose">{{btnTxt}}
				<image :class="!status?'default':'active'" src="../../static/arrow-left.png" mode=""></image>
			</view>
		</view>
		<!-- 备注 -->
		<view class="title">
			Comment
		</view>
		<view class="common">
			<van-cell-group>
				<van-field :value="message" type="textarea" :autosize="{maxHeight: 100, minHeight: 50 }"
					placeholder="Expect to be delivered as soon as possible" autosize :border="true"
					custom-style="height:192px;border-radius: 40rpx;background: #F8F8F8;z-index:100" />
			</van-cell-group>

		</view>
		<!-- 提交 -->
		<!-- 	<van-submit-bar bar-class="submit-bar" button-class="btnsClss"  :button-text="this.$t('index.submit')"
			@submit="onSubmit">
			<view class="submit-bar-l">
				<view class="num">Quantity： <text class="bold">3</text> </view>
				<view class="price">
					<text>Total： </text><text class="bold">96.00 </text><text style="font-size: 20rpx">CNY</text>
				</view>
			</view>
		</van-submit-bar> -->
		<view class="submit-bar">
			<view class="submit-bar-l">
				<view class="num">Quantity： <text class="bold">3</text> </view>
				<view class="price">
					<text>Total： </text><text class="bold">96.00 </text><text style="font-size: 20rpx">CNY</text>
				</view>
			</view>
			<view class="submit-bar-r" @click="onSubmit">
				{{this.$t('index.submit')}}
			</view>
		</view>
		<!-- 弹窗 -->
		<public-dialog v-if="dialogShow" @hideDialog="dialogHide" />
	</view>
</template>

<script>
	import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		components: {
			publicDialog
		},
		data() {
			return {
				status: 0, // 状态值
				btnTxt: "View More", // 按钮文案
				message: "",
				dialogShow: false
			}
		},
		methods: {
			openOrClose() {
				this.status = this.status == 1 ? 0 : 1;
				this.btnTxt = this.status == 1 ? "收起内容" : "查看更多";
			},
			onSubmit() {
				this.dialogShow = true
			},
			dialogHide(val) {
				this.dialogShow = val
			}
		}
	}
</script>

<style lang="scss">
	.article {
		// max-width: 800px;
		max-height: 788rpx;
		overflow-y: hidden;
		/* 增加过渡时间以适应高度 */
		transition: max-height 0.7s linear;
	}

	.extended {
		max-height: 1000px !important;
	}

	.btn {
		padding: 11px;
		font-size: 11px;
		color: #111111;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 33rpx;
			height: 33rpx;
		}

		.default {
			transform: rotate(270deg);
		}

		.active {
			transform: rotate(90deg);
		}
	}

	.container {
		padding: 0 30rpx 200rpx 30rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #111111;
			line-height: 42rpx;
			margin: 38rpx 0 28rpx 0;
		}

		.address {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #000000;
			line-height: 40rpx;
			padding-bottom: 26rpx;
			border-bottom: 2rpx solid #ddd;

			image {
				width: 52rpx;
				height: 52rpx;
				margin-right: 6rpx;
			}
		}

		.product {
			background: #F8F8F8;
			border-radius: 40rpx;
		}
	}

	.info {
		display: flex;
		padding: 30rpx 0 26rpx 0;
		margin: 0 20rpx;
		border-bottom: 2rpx solid #dddddd;

		image {
			width: 100px;
			height: 100px;
		}

		.info_r {
			display: flex;
			flex: 1;
			justify-content: space-between;
			position: relative;

			.info_r_l {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.titles {
					font-size: 24rpx;
					color: #111111;
					line-height: 40rpx;
				}

				.desc {
					font-size: 20rpx;
					color: #999999;
					line-height: 28rpx;
					margin: 20rpx 0 60rpx 0;
				}

				.num {
					font-size: 20rpx;
					color: #111111;
					line-height: 28rpx;
				}
			}

			.info_r_r {
				font-size: 24rpx;
				font-weight: bold;
				color: #C54646;
				line-height: 32rpx;
				position: absolute;
				bottom: 0;
				right: 0;

				text {
					font-size: 16rpx;
					color: #111111;
					line-height: 22rpx;
					margin-left: 2rpx;
				}
			}
		}
	}

	.submit-bar {
		width: -webkit-fill-available;
		display: flex;
		justify-content: space-between !important;
		background-color: #111111 !important;
		height: 160rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		align-items: center;
		padding: 0 30rpx;

		view {
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 38rpx;
		}

		.num {
			margin-bottom: 22rpx;
		}

		text.bold {
			font-size: 36rpx;
			font-weight: bold;
		}

		.submit-bar-r {
			width: 176rpx;
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #111111;
			line-height: 42rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>