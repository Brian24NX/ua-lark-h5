<template>
	<view class="classbox">
		<!-- 左侧 -->
		<view class="sub-tabs" v-if="!hideTab">
			<view :class="['sub-tab',item.cid==subcurrent?'navActive' :'']" v-for="(item,index) in tabslist"
				:key="item.cid" @click="select(item)">{{item.categoryName}}</view>
		</view>
		<!-- 右侧 -->
		<view class="conts"
			:style="hideTab?'padding-left: 0;width: 100%;padding-right: 0;margin-top:18rpx':'padding-left: 192rpx'">
			<view class="cont" v-if="contlist.length >0" v-for="(item,index) in contlist" :key="index">
				<view class="prod-pic" @click.capture="tz(item)">
					<image :src="item.imageUrl" mode="aspectFit" />
				</view>
				<view class="prod-info" @click.capture="tz(item)">
					<view class="prodname">{{item.shortName}}</view>
					<view class="desc">{{item.specifications}}</view>
					<view class="desc">{{item.supplierName}}</view>
					<view class="price-nums">
						{{item.retailPrice}} <text>{{item.priceUnit}}</text>
					</view>
				</view>
				<view class="change-num">
					<image v-if="item.scalar>0" class="addcar" src="../../static/minuscar.png" @tap.stop="minusNum(item)"></image> 
					<input v-if="item.scalar>0" :value="item.scalar" type="text" class="inp" />
					<image class="addcar" src="../../static/addcar.png" mode="" @tap.stop="plusNum(item)" ></image>
				</view>
			</view>
			<view class="empty" v-if="contlist.length==0">
				<image src="../../static/empty.png" mode=""></image>
				{{this.$t('index.empty')}}
			</view>
		</view>
		<!-- 物料详情 -->
		<material-detail v-if="show" :detail="detail" @onClose="onClose"></material-detail>
	</view>
</template>

<script>
	import vanStepper from "@/wxcomponents/@vant/weapp/stepper/index"
	import materialDetail from "../material-detail/index"
	export default {
		props: {
			tabslist: {
				type: Array,
				default: []
			},
			contlist: {
				type: Array,
				default: []
			},
			hideTab: {
				type: Boolean,
				default: false
			},
			subcurrent: {
				type: Number,
				default: 1
			}
		},
		components: {
			vanStepper,
			materialDetail
		},
		data() {
			return {
				show: false,
				detail: {}
			}
		},
		methods: {
			onChange(val) {
				console.log(val)
			},
			showStep() {
				console.log('123')
			},
			onClose() {
				this.show = false
			},
			back() {
				uni.navigateBack()
			},
			minusNum(item){
				if(item.scalar<=0) return
				this.$emit('minusNum',item)
			},
			plusNum(item){
				this.$emit("plusNum",item)
			},
			select(item) {
				this.$emit('getMaterial', item.cid)

			},
			tz(item) {
				this.show = true
				this.detail = item
			}
		}
	}
</script>
<style lang="scss" scoped>
	.change-num {
		position: absolute;
		right: 20rpx;
		bottom: 30rpx;
		display: flex;
		align-items: center;
        min-height: 1.4rem;
		.addcar {
			width: 36rpx;
			height: 36rpx;
			margin: 0;
		}

		input{
			width: 20px;
			height: 36rpx;
			font-size: 24rpx;
			color: #111111;
			text-align: center;
		}
	}


	.sub-tabs {
		position: fixed;
		height: 100%;
		width: 192rpx;
		background: #f8f8f8;
		left: 0px;
		overflow-y: scroll;
		text-align: center;
		border-radius: 0rpx 30rpx 30rpx 0rpx;

		.sub-tab {
			width: 100%;
			font-size: 24rpx;
			font-family: MicrosoftYaHei;
			color: #999999;
			line-height: 40rpx;
			padding: 28rpx 0;
		}
	}

	.conts {
		width: -webkit-fill-available;
		min-height: 600rpx;

		.empty {
			font-size: 36rpx;
			color: #111111;
			line-height: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 298rpx;

			image {
				width: 284rpx;
				height: 184rpx;
				margin-bottom: 40rpx;
			}
		}
	}

	:root {
		--radius-size: 15px;
		--acticity-color: #f0f0f0;
	}

	.navActive {
		background: #f0f0f0;
		position: relative;
	}

	.navActive::before,
	.navActive::after {
		content: "";
		display: block;
		height: var(--radius-size);
		width: var(--radius-size);
		position: absolute;
		bottom: 0;
		background: radial-gradient(var(--radius-size) at var(--radius-size) 0px,
				transparent var(--radius-size),
				var(--acticity-color) var(--radius-size));
	}

	.navActive::before {
		right: 0;
		bottom: calc(-1 * var(--radius-size));
		transform: scale(-1);
	}

	.navActive::after {
		right: 0;
		top: calc(-1 * var(--radius-size));
		transform: scaleX(-1);
	}

	.cont {
		display: flex;
		align-items: center;
		height: 236rpx;
		margin: 0 30rpx 20rpx 30rpx;
		position: relative;
		background: #F8F8F8;
		border-radius: 40rpx;

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

		.prod-info {
			.prodname {
				font-size: 24rpx;
				color: #111111;
				line-height: 40rpx;
			}

			.desc {
				font-size: 20rpx;
				color: #999999;
				line-height: 28rpx;
				margin-top: 4rpx;
			}

			.price-nums {
				font-size: 24rpx;
				font-weight: bold;
				color: #C54646;
				line-height: 32rpx;
				margin-top: 40rpx;

				text {
					font-size: 16rpx;
					color: #111111;
					line-height: 22rpx;
					margin-left: 2rpx;
				}
			}
		}
	}

	.cont image {
		width: 176rpx;
		height: 176rpx;
		margin: 0 16rpx 0 20rpx;
	}

	.classbox {
		display: flex;
	}

	.name {
		font-size: 26rpx;
		text-align: center;
	}
</style>