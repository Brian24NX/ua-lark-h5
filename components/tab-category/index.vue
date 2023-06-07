<template>
	<view class="classbox">
		<view class="sub-tabs">
			<view class="sub—tab alldisplay" :class="item.id==current?'active' :''" @click="select(item)"
				v-for="item in tabslist" :key="item.id">{{item.name}}</view>
		</view>
		<!-- <scroll-view scroll-y="true" style="height: 100vh;">
			
		</scroll-view> -->
		<view class="conts">
			<view class="cont" v-for="item in contlist" :key="item.id">
				<view class="prod-pic">
					<image :src="item.imgUrl" mode="aspectFit" />
				</view>
				<view class="prod-info" @click.native="tz(item.id,item.name,item)">
					<view class="prodname">定制明兴 M17</view>
					<view class="prodname">直径13mm｜高10mm｜100</view>
					<view class="price-nums">
						￥30
					</view>
				</view>
				<van-stepper custom-class="stepper" :value="1" bind:change="onChange" />

			</view>
		</view>
		<van-popup :show="show" position="center" custom-style="width: 70%;height:50%;border-radius: 20px;"
			@close="onClose">
			<view>
				<image
					src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
					mode=""></image>
				<view class="">
					1111111111111111111111111
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import vanStepper from "@/wxcomponents/@vant/weapp/stepper/index"
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	export default {
		props: {
			tabslist: {
				type: Array,
				default: []
			},
			contlist: {
				type: Array,
				default: []
			}
		},
		components: {
			vanStepper,
			vanPopup
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
				// this.$emit("showDetail", this.show)
				// 	if (this.current !== 2) {
				// 		uni.navigateTo({
				// 			url: '/pages/index/chuanglian?id=' + id + '&title=' + name
				// 		})
				// 	} else {
				// 		console.log(item.isHaveSeries);
				// 		if (item.isHaveSeries == 0) {
				// 			uni.navigateTo({
				// 				url: '/pages/index/chuanglian?id=' + id + '&title=' + name
				// 			})
				// 		} else {
				// 			uni.navigateTo({
				// 				url: '/pages/class/class2?id=' + id + '&title=' + name
				// 			})
				// 		}

				// 	}

			}
		}
	}
</script>

<style>
	.stepper {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.sub-tabs {
		position: fixed;
		height: 100%;
		width: 23%;
		background: #f2f2f2;
		left: 0px;
		overflow-y: scroll;
		padding-left: 20px;
	}

	.sub-tab {
		width: 100%;
		height: 80rpx;
	}

	.conts {
		/* padding-left: 30%; */
		min-height: 600px;
		padding: 26rpx 26rpx 26rpx 30%;
		font-size: 14px;
	}

	.active {
		background: #fff;
	}

	.cont {
		display: flex;
		height: 200rpx;
		margin: 0 0rpx 60rpx 0;
		border: 1px solid #ccc;
		position: relative;
	}

	.cont image {
		width: 150rpx;
		height: 160rpx;
	}

	.classbox {
		display: flex;
	}

	.name {
		font-size: 26rpx;
		text-align: center;
	}
</style>