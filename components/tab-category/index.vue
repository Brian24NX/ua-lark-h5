<template>
	<view class="classbox">
		<!-- 左侧 -->
		<view class="sub-tabs" v-if="!hideTab">
			<view :class="['sub-tab',item.id==current?'navActive' :'']" @click="select(item)" v-for="item in tabslist"
				:key="item.id">{{item.name}}</view>
		</view>
		<!-- 左侧 -->
		<view class="conts"
			:style="hideTab?'padding-left: 0;width: 100%;padding-right: 0;margin-top:18rpx':'padding-left: 192rpx'">
				<view class="cont" v-for="item in contlist" :key="item.id" @click.native="tz(item.id,item.name,item)">
				<view class="prod-pic">
					<image src="../../static/xiezi.png" mode="aspectFit" />
				</view>
				<view class="prod-info" >
					<view class="prodname">定制明兴 M17</view>
					<view class="desc">直径13mm｜高10mm｜100</view>
					<view class="desc">上海齐心共赢</view>
					<view class="price-nums">
						￥30 <text>CNY</text>
					</view>
				</view>
				<van-stepper custom-class="stepper" :value="1" theme="round" button-size="25px" input-class="input"
					plus-class="add" minus-class="minus" bind:change="onChange" />
			</view>
		<!-- 	<view class="empty">
				<image src="../../static/empty.png" mode=""></image>
				{{this.$t('index.empty')}}
			</view> -->
		</view>
		<!-- 物料详情 -->
		<material-detail v-if="show" @onClose="onClose"></material-detail>
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
			}
		},
		components: {
			vanStepper,
			// vanPopup,
			materialDetail
		},
		data() {
			return {
				current: 1,
				show: false
			}
		},
		methods: {

			onClose() {
				this.show = false
			},
			back() {
				uni.navigateBack()
			},
			select(item) {
				this.current = item.id
				// this.getcontlist(this.current)
				this.$emit('getMaterial', item.id)

			},
			tz(id, name, item) {
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	.stepper {
		position: absolute;
		right: 20rpx;
		bottom: 30rpx;
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