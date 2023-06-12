<template>
	<view class="search">
		<view class="search_box">
			<image src="../../static/search.png">
			</image>
			<input type="text" confirm-type="search" v-model="keyword" @confirm="searchClick(keyword)"
				:placeholder="this.$t('index.material-name') " />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		
		},
		data() {
			return {
				keyword:""
			}
		},
		onLoad() {
	
		},
		methods: {
		searchClick(key){
			this.$emit('searchClick',key)
		}
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		padding: 26rpx 22rpx;
		border-bottom: 2rpx solid #ddd;
	
		.search_box {
			display: flex;
			align-items: center;
			width: 100%;
			height: 52rpx;
	
			image:nth-child(1) {
				margin: 0 6rpx 0 0rpx;
				width: 52rpx;
				height: 52rpx;
			}
	
			input {
				width: 100%;
				color: #111;
			}
		}
	
		.search_btn {
			width: 96rpx;
			height: 52rpx;
			background-color: #fff;
			color: pink;
			border-radius: 26rpx;
			line-height: 52rpx;
			text-align: center;
		}
	}
</style>