<template>
	<view class="container">
		<view class="material">
			<view class="titles">
				Material
			</view>
			<van-cell title="Applied Quantity" value="1" title-class="title" value-class="content"/>
			<van-cell title="Approved Quantity" value="1"  title-class="title" value-class="content"/>
			<van-cell title="Category" value="物料类/日常店铺物料"  title-class="title" value-class="content"/>
			<van-cell title="Specification" value="直径13mm｜高10mm｜100个/包" title-class="title" value-class="content" />
			<van-cell title="Total Price" value="64.00CNY"  title-class="title" value-class="content"/>
			<van-cell title="Total Cost" value="70.00CNY" title-class="title" value-class="content" />
			<van-cell title="Comment" label="Expect to be delivered as soon as possible" title-class="title" value-class="content" />
		</view>
		<view class="reference">
			<view class="titles">
				Material
			</view>
			<van-cell title="Applied Quantity" value="1" title-class="title" value-class="content" />
			<van-cell title="Approved Quantity" value="1" title-class="title" value-class="content" />
			<van-cell title="Category" value="物料类/日常店铺物料"  title-class="title" value-class="content"/>
			<van-cell title="Specification" value="直径13mm｜高10mm｜100个/包"  title-class="title" value-class="content"/>
			<van-cell title="Total Price" value="64.00CNY"  title-class="title" value-class="content"/>
			<van-cell title="Total Cost" value="70.00CNY"  title-class="title" value-class="content"/>
			<van-cell title="Comment" label="Expect to be delivered as soon as possible"  title-class="title" value-class="content"/>
			
			<van-cell title="Reference" label="Store" value="广州太古里"  title-class="title" value-class="content"/>
			<van-cell title="PO" value="NHGJ7890" title-class="title" value-class="content" />
			<van-cell title="Tracking Number" value="YTRY9009"  title-class="title" value-class="content"/>
			<van-steps :steps="steps" :active="active" direction="vertical" active-color="#ee0a24" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				steps: [{
					text: "Cici Wang (092081)",
					desc: "store"
				}, {
					text: "Cici Wang (092081)",
					desc: "store"
				}, {
					text: "Cici Wang (092081)",
					desc: "store"
				}]
			}
		},

		onLoad() {
uni.setNavigationBarTitle({
			    title:this.$t("index.itemDetails")
			});

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
 .container{
	 margin: 0 30rpx;
	
	 .material ,
	 .reference{
		 background: #F8F8F8;
		 border-radius: 40rpx;
		 margin-bottom: 28rpx;
		 overflow: hidden;
	 }
 }
 .titles{
	 font-size: 32rpx;
	 font-weight: bold;
	 color: #111111;
	 line-height: 42rpx;
 }
 .title{
	 font-size: 28rpx;
	 color: #999999;
	 line-height: 38rpx;
 }
 .content{
	 font-size: 28rpx;
	 color: #111111 !important;
	 line-height: 38rpx;
 }
</style>