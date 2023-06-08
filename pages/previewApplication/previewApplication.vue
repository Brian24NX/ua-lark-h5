<template>
	<view class="container">
		<!-- 	<view class="address">
			<image src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
				mode=""></image>广州太古汇
		</view> -->
		<!-- 区域 -->
		<van-cell title="广州太古汇"
			icon="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg" />
		<!-- 商品详情 -->
		<view class="product">
			<view class="">
				Material
			</view>

			<div id="article" class="article" :class="[status == 1 && 'extended']">
				<view class="info" v-for="item in 5">
					<image
						src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
						mode=""></image>
					<view class="info_r">
						<view class="info_r_l">
							<view>
								定制明兴 M17
							</view>
							<view>
								上海齐心共赢
							</view>
						</view>
						<view class="info_r_r">
							<view>
								1
							</view>
							<view>
								32.00CNY
							</view>
						</view>
					</view>
				</view>
			</div>
			<view class="btn" @click="openOrClose">{{btnTxt}}</view>
		</view>
		<!-- 备注 -->
		<view class="common">
			<view class="">
				Comment
			</view>
			<van-cell-group>
				<van-field :value="message" type="textarea" :autosize="{maxHeight: 100, minHeight: 50 }"
					placeholder="Expect to be delivered as soon as possible" autosize :border="true"
					custom-style="height:100px" />
			</van-cell-group>

		</view>
		<!-- 提交 -->
		<van-submit-bar :price="3050" label=" " custom-class="submit" :button-text="this.$t('index.submit')"
			suffix-label="CNY" @submit="onSubmit">
			<text>Quantity: 3</text>
		</van-submit-bar>
		<!-- 弹窗 -->
		<public-dialog v-if="dialogShow" @hideDialog="dialogHide" />
	</view>
</template>

<script>
	import publicDialog from "../../components/public-dialog/index.vue"
	export default {
		components: {
			publicDialog
		},
		data() {
			return {
				status: 0, // 状态值
				btnTxt: "查看更多", // 按钮文案
				message: "",
				dialogShow: false
			}
		},
		methods: {
			openOrClose() {
				this.status = this.status == 1 ? 0 : 1;
				this.btnTxt = this.status == 1 ? "收起内容" : "查看更多";
			},
			onSubmit() {
				this.dialogShow = true
			},
			dialogHide(val) {
				this.dialogShow = val
			}
		}
	}
</script>

<style lang="scss">
	.article {
		max-width: 800px;
		max-height: 300px;
		overflow-y: hidden;

		/* 增加过渡时间以适应高度 */
		transition: max-height 0.7s linear;
	}

	.extended {
		max-height: 1000px !important;
	}

	.btn {
		text-align: center;
		padding: 10px;
	}

	.container {
		padding: 0 20px 60px 20px;

		.address {
			display: flex;
			align-items: center;

			image {
				width: 20px;
				height: 20px;
			}
		}
	}

	.info {
		display: flex;

		image {
			width: 100px;
			height: 100px;
		}

		.info_r {
			display: flex;
			flex: 1;
			justify-content: space-between;

			.info_r_l,
			.info_r_r {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
	}
</style>