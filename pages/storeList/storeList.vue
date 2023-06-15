<template>
	<div class="container">
		<store-item v-for="(item,index) in storeList" :key="index" :store="item"> </store-item>
	</div>

</template>

<script>
	import storeItem from "../../components/store-item/index.vue"
	export default {
		components: {
			storeItem
		},
		data() {
			return {
				storeList: []
			}
		},
		onLoad() {
			this.getStoreList()
		},
		methods: {
			getStoreList() {
				this.$api.searchStoreList().then(res => {
					console.log(res)
					if (res.code == '200') {
						this.storeList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>