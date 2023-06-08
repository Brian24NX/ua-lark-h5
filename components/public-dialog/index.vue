<template>
	<van-popup :show="show" position="center" custom-style="width: 75%;border-radius: 20px;" @close="onClose">
		<view class="dialog">
			<h3 class="title">提示</h3>
			<view class="massage">
				Are you sure to clean up all materials？
			</view>
			<view class="btn">
				<view class="cancle" @click="onClose">
					{{this.$t('index.cancle')}}
				</view>
				<view class="confirm" @click="confirm">
					{{this.$t('index.sure')}}
				</view>
			</view>
		</view>
	</van-popup>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	export default {
		components: {
			vanPopup
		},
		data() {
			return {
				current: 1,
				show: true
			}
		},
		methods: {
			onClose() {
				this.show = false
				this.$emit('hideDialog', false)
			},
			confirm() {
				this.show = false
				this.$emit('hideDialog', false)
			}
		}
	}
</script>

<style lang="scss">
	.dialog {
		.title {
			text-align: center;
			margin-top: 20px;
		}

		.massage {
			font-size: 14px;
			text-align: center;
			margin: 20px 0;

		}

		.btn {
			display: flex;
			justify-content: space-between;
			margin: 0 20px 20px;

		}
	}
</style>