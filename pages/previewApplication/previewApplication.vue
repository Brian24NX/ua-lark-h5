<template>
	<view class="container">
	<view class="address">
		<image src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg" mode=""></image>广州太古汇
	</view>
	<view class="product">
		<view class="">
			Material
		</view>
		<view class="info">
			<image src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg" mode=""></image>
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
	</view>
	</view>
</template>

<script>
   // import navHeader from "../../components/header/index.vue"
	export default {
		// components: { navHeader },
		data() {
			return {
			
			}
		},
	

		methods: {
	

		}
	}
</script>

<style lang="scss">
.container{
	.address{
		display: flex;
		align-items: center;
		image{
			width: 20px;
			height: 20px;
		}
	}
}
.info{
	display: flex;
	image{
		width: 100px;
		height: 100px;
	}
	.info_r{
		    display: flex;
		    flex: 1;
		    justify-content: space-between;
			.info_r_l,.info_r_r{
				    display: flex;
				    flex-direction: column;
				    justify-content: space-around;
			}
	}
}
</style>