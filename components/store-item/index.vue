<template>
	<div class="item" @click="selectItem(store)">
		<view class="item_list">
			<view class="list-l">
				<view class="title">
				{{store.name}}
				</view>
				<view class="desc">
				{{store.address}}
				</view>
			</view>
		   <image class="list-r" src="../../static/arrow-right.png" mode=""></image>
		</view>
	<van-divider customStyle="background-color: #DDDDDD; border-color:#DDDDDD; height:1px;margin:0" />
	</div>

</template>

<script>
	import vanDivider from "@/wxcomponents/@vant/weapp/divider/index"
	export default {
		components: {
			vanDivider
		},
		props: {
			store:{}
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			selectItem(item) {
				// uni.$emit('returnData', item)
				uni.navigateTo({
					// url:"/pages/selectMaterial/selectMaterial?pageFrom=store"
					url:"/pages/selectMaterial/selectMaterial?store="+JSON.stringify(item)+'&page=store'
				})
				// uni.navigateBack({
				// 	delta: 1
				// })
			}
		}
	}
</script>

<style lang="scss">
	.item {
		.item_list {
		  position: relative;
		  margin: 60rpx 30rpx;
		  .list-l{
			  padding-left: 24rpx;
			  border-left: 6rpx solid #111;
			  .title{
				  font-size: 40rpx;
				  color: #000000;
				  line-height: 54rpx;
			  }
			  .desc{
				  font-size: 28rpx;
				  color: #666666;
				  line-height: 38rpx;
				  margin-top: 24rpx;
			  }
		  }
		  .list-r{
			  width: 60rpx;
			  height: 60rpx;
			  position: absolute;
			  right: 0;
			  bottom: 0;
		  }
		}
	}
</style>