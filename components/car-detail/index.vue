<template>
	<view class="container">
		<van-popup :show="true" round position="bottom" custom-style="height: 40%;bottom:50px" @close="onClose">
			<view class="clearAll" @click="clearAll">
				Clear All
			</view>
			<view class="conts">
				<view class="cont" v-for="item in contlist" :key="item.id">
					<view class="prod-pic">
						<image :src="item.imgUrl" mode="aspectFit" />
					</view>
					<view class="prod-info" @click.native="tz(item.id,item.name,item)">
						<view class="prodname">定制明兴 M17</view>
						<view class="price-nums">
							￥30
						</view>
					</view>
					<view class="pro-right">
						<view class="">
							上海齐心共赢 <image src="https://b.yzcdn.cn/vant/icon-demo-1126.png"
								style="width: 15px;height: 15px;" mode=""></image>
						</view>
						<van-stepper custom-class="stepper" :value="1" bind:change="onChange" />
					</view>

				</view>
			</view>
		</van-popup>
		<!-- 弹窗 -->
 <!-- <dialog v-if="clearShow"></dialog> -->
 <public-dialog v-if="clearShow" @hide="hide"></public-dialog>
	</view>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	import vanStepper from "@/wxcomponents/@vant/weapp/stepper/index"
		import publicDialog from "../../components/public-dialog/index.vue"
	// import vanDialog from "@/wxcomponents/@vant/weapp/dialog/index"
	// import Dialog from "../../wxcomponents/@vant/weapp/dialog/dialog"
	export default {
		props: {
			contlist: {
				type: Array,
				default: []
			},
		},
		components: {
			vanPopup,
			vanStepper,
			publicDialog
		},
		data() {
			return {
				show: true,
				clearShow: false
			}
		},
		methods: {
			onClose() {
				this.$emit('hideDetail', false)
			},
			// beforeClose(action) {
			// 	if (action === 'confirm') {
			// 		resolve(true);
			// 	} else {
			// 		// 拦截取消操作
			// 		resolve(false);
			// 	}
			// },

			// onConfirm() {
			// 	console.log('1111111111')
			// },
			// onCancel() {
			// 	this.clearShow = false
			// },
			hide(val){
				this.clearShow=val
			},
			clearAll() {
				console.log('1111111111')
	        this.clearShow=true
			}
		}
	}
</script>

<style lang="scss">

	.clearAll {
		text-align: right;
		margin-right: 20px;
	}

	.cont {
		display: flex;
		align-items: center;
		font-size: 14px;

		image {
			width: 100px;
			height: 100px;
		}

		.pro-right {
			display: flex;
			flex-direction: column;
			position: absolute;
			right: 20px;

			image {
				margin-left: 10px;
			}
		}
	}
</style>