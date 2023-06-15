<template>
	<view class="container">
		<van-popup :show="true" round position="bottom" custom-style="padding-bottom:160rpx" @close="onClose">
			<view class="clearAll">
				<view class="clearAll_l">
					{{this.$t('index.clear-all')}}
				</view>
				<view class="clearAll_r" @click="clearAll">
					<image src="../../static/delete.png" mode=""></image>
					{{this.$t('index.clear-all')}}
				</view>
			</view>
			<view class="conts" v-for="(item,index) in carList" :key="index">
				<view class="cont">
					<image src="../../static/xiezi.png" mode="aspectFit" />
					<view class="prod-info" @click.native="tz(item.id,item.name,item)">
						<view class="prodname">{{item.shortName}}</view>
						<view class="prodesc">{{item.supplierName}}</view>
						<view class="price-nums">
							{{item.retailPrice}} <text>{{item.priceUnit}}</text>
						</view>
					</view>
					<view class="pro-right">
						<view class="pro-right-delete" @click="deleteItem(item)">
							<image src="../../static/delete_active.png" mode=""></image>{{this.$t('index.delete')}}
						</view>
						<view class="change-num">
							<image class="addcar" src="../../static/minuscar.png" @tap.stop="minusNum(item)"></image>
							<input v-model="item.scalar" type="text"  @blur="editNum(item)" />
						<image class="addcar" v-if="item.scalar>=999"  src="../../static/notadd.png" mode="" ></image>
						<image class="addcar" v-else src="../../static/addcar.png" mode="" @tap.stop="plusNum(item)" ></image>
							</image>
						</view>
					</view>
				</view>
				<!-- v-if="item.scalar>0&& edit" -->
				<van-divider customStyle="margin:0;color: #ddd; border-color: #ddd; padding-left:166rpx"
					v-if="index !=carList.length-1" />
			</view>
		</van-popup>
	</view>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	import vanStepper from "@/wxcomponents/@vant/weapp/stepper/index"
	import vanDivider from "@/wxcomponents/@vant/weapp/divider/index"

	export default {
		components: {
			vanPopup,
			vanStepper,
			vanDivider
		},
		data() {
			return {
				edit:true
			}
		},
		computed: {
			carList() {
				return this.$store.state.carShop
			}
		},
		methods: {
			onClose() {
				this.$emit('hideDetail', false)
			},
			clearAll() {
				this.$emit('showDialog', true)
			},
			minusNum(item) {
				this.$emit('minusNum', item)
			},
			plusNum(item) {
				this.$emit("plusNum", item)
			},
			editNum(item){
				if(item.scalar>=999){
					item.scalar=999
				}
				this.$emit("editNum",item)
			},
			deleteItem(item) {
				if (this.carList.includes(item)) {
					let index = this.carList.indexOf(item)
					this.carList.splice(index, 1)
					this.$emit('deleteItem', item)
					this.$store.commit('deleteCar', this.carList)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.change-num {
		position: absolute;
		right: 0rpx;
		display: flex;
		align-items: center;
		min-height: 1.4rem;

		.addcar {
			width: 36rpx;
			height: 36rpx;
			margin: 0;
		}

		input {
			width: 44rpx;
			font-size: 24rpx;
			color: #111111;
			line-height: 28rpx;
			text-align: center;
		}
	}

	.clearAll {
		display: flex;
		justify-content: space-between;
		margin: 0rpx 30rpx;
		padding: 40rpx 0;
		border-bottom: 2rpx solid #ddd;

		view {
			font-size: 28rpx;
			line-height: 40rpx;
		}

		.clearAll_l {
			color: #111111;
		}

		.clearAll_r {
			color: #999999;
			display: flex;
			align-items: center;

			image {
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;
			}
		}
	}

	.cont {
		display: flex;
		align-items: center;
		font-size: 14px;
		margin: 28rpx 30rpx 28rpx 30rpx;
		position: relative;

		image {
			width: 116rpx;
			height: 116rpx;
			margin-right: 20rpx;
		}

		.prod-info {
			.prodname {
				font-size: 28rpx;
				color: #111111;
				line-height: 38rpx;
			}

			.prodesc {
				font-size: 20rpx;
				color: #999999;
				line-height: 28rpx;
				margin: 8rpx 0 14rpx 0;
			}

			.price-nums {
				font-size: 28rpx;
				font-weight: bold;
				color: #C54646;
				line-height: 40rpx;

				text {
					font-size: 20rpx;
					color: #111111;
					line-height: 40rpx;
					margin-left: 5rpx;
				}
			}
		}

		.minus {
			border: 1px solid #111 !important;
			color: #111 !important;
		}

		.add {
			background-color: #111 !important;
			color: #fff !important;
		}

		.input {
			width: 40rpx !important;
		}

		.pro-right {
			position: absolute;
			right: 30rpx;
top: 0;
			.pro-right-delete {
				font-size: 24rpx;
				color: #111111;
				line-height: 32rpx;
				margin-bottom: 50rpx;
				display: flex;
				justify-content: end;
				align-items: center;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}

		}
	}
</style>