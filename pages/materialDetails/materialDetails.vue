<template>
	<view class="container">
		<van-cell title="Applied Quantity" value="1" />
		<van-cell title="Approved Quantity" value="1" />
		<van-cell title="Category" value="物料类/日常店铺物料" />
		<van-cell title="Specification" value="直径13mm｜高10mm｜100个/包" />
		<van-cell title="Total Price" value="64.00CNY" />
		<van-cell title="Total Cost" value="70.00CNY" />
		<van-cell title="Comment" label="Expect to be delivered as soon as possible" />

		<van-cell title="Reference" label="Store" value="广州太古里" />
		<van-cell title="PO" value="NHGJ7890" />
		<van-cell title="Tracking Number" value="YTRY9009" />

		<van-steps :steps="steps" :active="active" direction="vertical" active-color="#ee0a24" />
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


		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>