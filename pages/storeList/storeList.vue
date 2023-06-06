<template>
	<div class="container">
		<view class="">
			Please choose the store：
		</view>
		<view class="list">
			<view v-for="(item,index) in storeList" :key="index" @click="goback(item)">
				{{item.name}}
			</view>
		</view>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				storeList: [{
						id: 1,
						name: "广州太古汇"
					},
					{
						id: 2,
						name: "上海凯德晶萃"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			goback(item) {
				uni.$emit('returnData', item)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 20px;

		.list {
			margin-left: 20px;
		}
	}
</style>