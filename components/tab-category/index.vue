<template>
	<view class="classbox">
		<!-- 左侧tabs -->
		<view class="sub-tabs">
			<view class="sub—tab alldisplay" :class="item.id==current?'active' :''" @click="select(item)"
				v-for="item in tabslist" :key="item.id">{{item.name}}</view>
		</view>
		<!-- 右侧cont -->
		<scroll-view scroll-y="true" style="height: 100vh;">
			<view class="conts">
				<view class="cont" v-for="item in contlist" :key="item.id" @click="tz(item.id,item.name,item)">
					<image :src="item.imgUrl" mode=""></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabslist: {
				type:Array,
				default:[]
			},
			contlist: {
				type:Array,
				default:[]
			}
		},
		data() {
			return {
	current:1
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
	select(item) {
		this.current = item.id
		// this.getcontlist(this.current)
		this.$emit('getMaterial',item.id)
	
	},
		}
	}
</script>

<style>
	.sub-tabs {
		width: 30%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
	}
	
	.sub-tab {
		width: 100%;
		height: 80rpx;
	}
	
	.conts {
		width: 100%;
		min-height: 10vh;
		padding: 26rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		display: flex;
		flex-wrap: wrap;
	}
	
	.active {
		background: #fff;
	}
	
	.cont {
		width: 150rpx;
		height: 200rpx;
		margin: 0 20rpx 60rpx 0;
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