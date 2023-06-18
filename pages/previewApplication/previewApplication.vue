<template>
	<view class="container">
		<!-- 区域 -->
		<view class="address">
			<image src="../../static/store.png" mode=""></image>{{form.storeName}}
		</view>
		<view class="title">
			{{this.$t('index.material')}}
		</view>
		<view class="product">
			<div id="article" class="article" :class="[status == 1 && 'extended']">
				<view class="info" v-for="(item,index) in materialList" :key="index">
					<image :src="item.imageUrl" mode=""></image>
					<view class="info_r">
						<view class="info_r_l">
							<view class="titles">
								{{item.shortName}}
							</view>
							<view class="desc">
								{{item.supplierName}}
							</view>
							<view class="num">
								Quantity: {{item.scalar}}
							</view>
						</view>
						<view class="info_r_r">
							{{item.retailPrice}} <text>{{item.priceUnit}}</text>
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
			{{this.$t('index.comment')}}
		</view>
		<!-- 备注 -->
		<textarea v-model="form.remark" name="" id="" :placeholder="this.$t('index.textarea')"></textarea>
		<!-- 提交 -->
		<view class="submit-bar">
			<view class="submit-bar-l">
				<view class="num">{{this.$t('index.Quantity')}}： <text class="bold">{{priceInfo.num}}</text> </view>
				<view class="price">
					<text>Total： </text><text class="bold">{{priceInfo.sumPrice}}</text><text
						style="font-size: 20rpx">CNY</text>
				</view>
			</view>
			<view class="submit-bar-r" @click="onSubmit">
				{{this.$t('index.submit')}}
			</view>
		</view>
		<!-- 弹窗 -->
		<public-dialog v-if="dialogShow" :pageFrom="'submit'" :title="'CONFIRM'" @submit="submit" :tip="tip" @hideDialog="dialogHide" />
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
				tip: this.$t('index.isSubmit'),
				status: 0, // 状态值
				btnTxt: this.$t('index.view-more'), // 按钮文案
				dialogShow: false,
				priceInfo: {},
				materialList: [],
				form: {
					remark: "",
					storeLarkDeptId: 0 ,//74,
					storeName: '',    //广州奥体天河城
					priceUnit: "",
					totalPrice: "",
					totalQuantity: "",
					orderItemPos: []
				}
			}
		},
		onLoad(option) {
			if(option.store != 'undefined'){
				this.form.storeName = JSON.parse(option.store).name
				this.form.storeLarkDeptId = JSON.parse(option.store).larkDeptId
				this.form.regionLarkDeptId = JSON.parse(option.store).regionLarkDeptId
			}
			this.priceInfo = JSON.parse(option.getCarShop)
			this.materialList = this.$store.state.carShop
			this.form.totalPrice = this.priceInfo.sumPrice
			this.form.totalQuantity = this.priceInfo.num
			this.form.priceUnit = this.priceInfo.unit
			this.form.orderItemPos = this.$store.state.carShop
			this.form.orderItemPos.forEach(item=>{
				item.applyQuantity = item.scalar
				item.supplierSkuCode = item.oriSkuCode
				item.storeLarkDeptId =this.form.storeLarkDeptId
				item.regionLarkDeptId = this.form.regionLarkDeptId 
				item.storeName=this.form.storeName
			})
		},
		methods: {
			openOrClose() {
				this.status = this.status == 1 ? 0 : 1;
				this.btnTxt = this.status == 1 ? this.$t('index.pack-up') : this.$t('index.view-more');
			},
			onSubmit() {
				console.log('=========')
				if(uni.getSystemInfoSync().uniPlatform == "mp-lark"){
						this.dialogShow = true
				}else{
					this.submit()
				}
			},
			submit() {
				this.$api.saMaterialAdd(this.form).then(res => {
					if(res.code=='200'){
						this.$store.commit('deleteCarAll')
						uni.navigateBack()
					}
				})
			},
			dialogHide(val) {
				this.dialogShow = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	textarea {
		width: auto;
		height: 192rpx;
		background: #F8F8F8;
		border-radius: 40rpx;
		font-size: 28rpx;
		color: #111111;
		line-height: 38rpx;
		padding: 40rpx 40rpx 0 40rpx;
	}

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