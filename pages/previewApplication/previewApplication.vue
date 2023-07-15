<template>
	<view class="container">
		<!-- 区域 -->
		<view class="address">
			<image src="../../static/store.png" mode=""></image>{{form.storeName}}
		</view>
		<view class="title">
			{{$t('index.material')}}
		</view>
		<view class="product">
			<div id="article" class="article" :class="[status == 1 && 'extended']">
				<view class="info" v-for="(item,index) in materialList" :key="index">
					<image :src="item.imageUrl" mode=""></image>
					<view class="info_r">
						<view class="info_r_l">
							<view class="titles">
								{{item.shortName?item.shortName:item.materialName}}
							</view>
							<view class="desc">
								{{item.supplierName}}
							</view>
							<view class="num">
								{{$t('index.Quantity')}}: {{item.scalar}}
							</view>
						</view>
						<view class="info_r_r">
							{{(item.scalar*item.retailPrice).toFixed(2)}} <text>{{item.priceUnit}}</text>
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
			{{$t('index.comment')}}
		</view>
		<!-- 备注 -->
	      <view class="textarea-wrp">
			  <view class="" v-if="!focus" @click="focus=true" :style="form.remark?'color: #111;':'color: #999;'">
			  	{{form.remark ||$t('index.textarea')}}
			  </view>
	        <textarea v-else v-model="form.remark"   auto-height :placeholder="$t('index.textarea')" :focus="focus" @blur="focus=false" placeholder-style="color: #999"/>
	      </view>

		<!-- 提交 -->
		<view class="submit-bar">
			<view class="submit-bar-l">
				<view class="num">{{$t('index.Quantity')}}： <text class="bold">{{priceInfo.num}}</text> </view>
				<view class="price">
					<text>{{$t('index.total')}}： </text><text class="bold">{{priceInfo.sumPrice}}</text><text
						style="font-size: 20rpx">CNY</text>
				</view>
			</view>
			<view class="submit-bar-r" @click="onSubmit">
				{{$t('index.submit')}}
			</view>
		</view>
		<!-- 弹窗 -->
		<public-dialog v-if="dialogShow" :pageFrom="pageFrom" :title="$t('index.Confirm')" :errList="errList" @submit="submit" :tip="tip"
			@hideDialog="dialogHide" />
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
				errList:[],
				focus:false,
				pageFrom:"submit",
				form: {
					remark: "",
					storeLarkDeptId: 0, //74,
					storeName: '', //广州奥体天河城
					priceUnit: "",
					totalPrice: "",
					totalQuantity: "",
					orderItemPos: []
				}
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
			    title:this.$t("index.previewApplication")
			});
			if (option.store != 'undefined') {
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
			this.form.orderItemPos.forEach(item => {
				item.applyQuantity = item.scalar
				item.categoryName=item.categoryPath
				item.supplierSkuCode = item.oriSkuCode
				item.storeLarkDeptId = this.form.storeLarkDeptId
				item.regionLarkDeptId = this.form.regionLarkDeptId
				item.storeName = this.form.storeName
			})
			this.form.materialPos = this.form.orderItemPos
		},
		methods: {
			openOrClose() {
				this.status = this.status == 1 ? 0 : 1;
				this.btnTxt = this.status == 1 ? this.$t('index.pack-up') : this.$t('index.view-more');
			},
			onSubmit() {
				if (uni.getStorageSync('platform') == "mp-lark") {
					this.tip=this.$t('index.isSubmit')
					this.pageFrom = 'submit'
					this.dialogShow = true
				} else {
					this.submit()
				}
			},
			submit() {
				this.$api.saMaterialAdd(this.form).then(res => {
					if (res.code == '200') {
						this.$store.commit('deleteCarAll')
						uni.navigateBack()
					} else if(res.code == '1002'){
						this.tip = this.$t('index.delist')
						this.pageFrom = 'delist'
						this.errList = JSON.parse(res.message)
						this.dialogShow = true
					}else{
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
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
	.textarea-wrp {
		width: auto;
		height: 192rpx !important;
		background: #F8F8F8;
		border-radius: 40rpx;
		font-size: 28rpx;
		color: #111111;
		line-height: 38rpx;
		padding: 40rpx 40rpx 0 40rpx;
	    overflow-y: scroll;
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