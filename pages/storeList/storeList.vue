<template>
	<div class="container">
	<!-- <nav-header :lang="this.$t('index.select-store')"></nav-header> -->
	<store-item v-for="(item,index) in storeList" :key="index" :store="item"> </store-item>
	</div>

</template>

<script>
	// import navHeader from "../../components/header/index.vue"
	import storeItem from "../../components/store-item/index.vue"
	export default {
		components: {
			// navHeader,
			storeItem
		},
		data() {
			return {
				storeList: [{
					id:1,
					title:"Shenzhen KingKey 100 Tower",
					desc:"No. 5016 Shennan East Road, Luohu District, Shenzhen City, Guangdong Province"
				},{
					id:2,
					title:"Guangzhou TaiKoo Hui",
					desc:"No. 383 Tianhe Road, Huaxin Community, Linhe Subdistrict, Tianhe District, Guangzhou"
				}]
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

</style>