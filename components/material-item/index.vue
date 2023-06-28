<!-- 审核 -->
<template>
	<view class="info">
		<van-checkbox use-icon-slot :value="dataDetail.selecte" custom-class="vancheck" @change="onChange(dataDetail)"
			v-if="storeRole==10">
			<image class="checkbox" slot="icon" :src="dataDetail.selecte ? activeIcon : inactiveIcon" />
		</van-checkbox>
		<image class="imageUrl" :src="dataDetail.imageUrl" mode=""></image>
		<view class="info_r">
			<view class="info_r_t">
				<view class="title">
					{{dataDetail.materialName}}
				</view>
				<view class="bold">
					x{{dataDetail.applyQuantity}}
					<view class="uni-input" @click="focus=true" v-if="storeRole==10 &&!focus">
						{{dataDetail.applyQuantity}}
					</view>
					<input class="uni-input" v-model="dataDetail.applyQuantity" type="number"
						@blur="handleInput(dataDetail.applyQuantity)" v-if="storeRole==10 && focus" />
				</view>
			</view>
			<view class="info_r_c">
				<view class="desc">
					{{dataDetail.supplierName}}
				</view>
				<view style="flex-direction: column;align-items: end;" v-if="storeRole==10">
					<view>
						<text class="bold"
							style="color: #C54646;">{{numMulti(dataDetail.applyQuantity || 1, dataDetail.retailPrice)}}</text>
						<text style="font-size: 16rpx; margin-left: 2rpx;">{{dataDetail.priceUnit}}</text>
					</view>
					<text class="cost">Cost {{numMulti(dataDetail.applyQuantity || 1, dataDetail.costPrice)}}CNY</text>
				</view>

			</view>
			<view class="info_r_b" v-if="storeRole==1||storeRole==2 ">
				<view class="remark bold" v-if="dataDetail.remark" @tap.native="dialog=true">
					{{this.$t('index.comment')}}
					<image class="more" src="../../static/more.png"></image>
				</view>
				<view>
					<text class="bold"
						style="color: #C54646;">{{(dataDetail.retailPrice*dataDetail.applyQuantity).toFixed(2)}}</text>
					<text style="font-size: 16rpx; margin-left: 2rpx;">{{dataDetail.priceUnit}}</text>
				</view>
			</view>
			<view class="info_r_b" v-if="storeRole==10">
				<view class="">
					{{NORMSTARTTIMEfilter(dataDetail.applyTime)}}
				</view>
				<view class="remark bold" v-if="dataDetail.remark" @tap.native="dialog=true">
					{{this.$t('index.comment')}}
					<image class="more" src="../../static/more.png"></image>
				</view>

			</view>
		</view>
		<public-dialog v-if="dialog" :title="this.$t('index.comment')" :pageFrom="'remark'" :content="dataDetail.remark"
			@hideDialog="hideDialog"></public-dialog>
	</view>
</template>

<script>
	import vanCheckbox from "@/wxcomponents/@vant/weapp/checkbox/index"
	import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		components: {
			publicDialog,
			vanCheckbox
		},
		props: {
			dataDetail: {}
	
		},
		data() {
			return {
				activeIcon: '../../static/checkbox-active.png',
				inactiveIcon: '../../static/checkbox.png',
				dialog: false,
				focus:false,
				storeRole: 10 //uni.getStorageSync('user').storeRole
			}
		},

		methods: {
			handleInput(val) {
				this.focus=false
				if (Number(val) >= 999) {
					console.log(val)
					// this.$set(this.dataDetail, 'applyQuantity', 999)
						this.$emit("defaultValue",this.dataDetail, 999)
				} else if (Number(val) <= 0) {
					console.log(val)
					this.$emit("defaultValue", this.dataDetail,1)
					
					// this.$set(this.dataDetail, 'applyQuantity', 1)
				}else{
					this.$emit("defaultValue", this.dataDetail,Number(val))
				}
				
				// this.$emit("defaultValue", this.dataDetail)
			},
			// 乘法运算，避免精度丢失
			numMulti(num1, num2) {
				let baseNum = 0
				try {
					baseNum += num1.toString().split('.')[1].length
				} catch (e) {}
				try {
					baseNum += num2.toString().split('.')[1].length
				} catch (e) {}
				return (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) / Math.pow(10,
					baseNum)
			},
			onChange(val) {
				if (val.selecte) {
					this.$set(val, 'selecte', false)
				} else {
					this.$set(val, 'selecte', true)
				}
				this.$emit('selectOrder', val)
			},
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
	.vancheck {
		width: 32rpx;
		height: 32rpx;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		margin-right: 20rpx;
	}

	.checkbox {
		width: 32rpx;
		height: 32rpx;
	}

	.info {
		display: flex;
		padding: 20rpx 0;
		border-top: 2rpx solid #dddddd;

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

				.more {
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
				line-height: 1.4rem; 
				min-height: 1.4rem; 
				max-height: 1.4rem; 
				border-radius: 6rpx;
				border: 1rpx solid #999999;
				margin-left: 16rpx;
				text-align: center;
				    align-items: center;
				    justify-content: center;
				
			}
		}
	}
</style>