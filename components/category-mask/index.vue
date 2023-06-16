<template>
	<van-popup :show="true" :close-on-click-overlay="false" position="right"
		custom-style="height: 100%;width:90%; border-radius: 40rpx 0rpx 0rpx 40rpx;z-index:201">
		<view class="category">
			<view class="instructions">{{this.$t('index.main-category')}}</view>
			<view class="category-main">
				<view v-for="(item,index) in categoryList" :key='index' @tap='searchProd(item,index,1)'
					:class="['category-item',item.cid==current?'active' :'']">
					{{item.categoryName}}
				</view>
			</view>
			<view v-if="tabslist.length>0">
				<view class="instructions" style="margin-top: 40rpx;">{{this.$t('index.sub-category')}}</view>
				<view class="category-main">
					<view v-for="(item,index) in tabslist" :key='index' @tap='searchProd(item,index,2)'
						:class="['category-item',item.cid==subcurrent?'active' :'']">
						{{item.categoryName}}
					</view>
				</view>
			</view>
			<view v-if="supplierList.length>0">
				<view class="instructions" style="margin-top: 40rpx;">{{this.$t('index.sub-category')}}</view>
				<view class="category-main">
					<view v-for="(item,index) in supplierList" :key='index' @tap='searchProd(item,index,3)'
						:class="['category-item',item.employeeNo==suppliercurrent?'active' :'']">
						{{item.nickName}}
					</view>
				</view>
			</view>
			<view class="btns_bottom">
				<van-divider customStyle="margin:0;color: #ddd; border-color: #ddd; padding:0 30rpx" />
				<view class="btns">
					<view class="cancel" @tap="resert">
						{{this.$t('index.reset')}}
					</view>
					<view class="complate" @tap="complate">
						{{this.$t('index.confirm')}}
					</view>
				</view>
			</view>

		</view>

	</van-popup>
</template>

<script>
	import vanPopup from "@/wxcomponents/@vant/weapp/popup/index"
	import vanDivider from "@/wxcomponents/@vant/weapp/divider/index"
	export default {
		components: {
			vanPopup,
			vanDivider
		},
		// props: {
		// 	tabslist: {
		// 		type: Array,
		// 		default () {
		// 			return []
		// 		}
		// 	},
		// 	categoryList: {
		// 		type: Array,
		// 		default () {
		// 			return []
		// 		}
		// 	},
		// 	supplierList:{
		// 		type: Array,
		// 		default () {
		// 			return []
		// 		}
		// 	},
		// 	current: {
		// 		type: Number,
		// 		default: 1
		// 	},
		// 	subcurrent: {
		// 		type: Number,
		// 		default: 1
		// 	}
		// },
		data() {
			return {
				tabslist:[],
				categoryList:[],
				supplierList:[],
				current:0,
				subcurrent:0,
				suppliercurrent:0,
				subdefault: [{
					cid: 0,
					categoryName: this.$t('index.all')
				}],
				supplierdefault : [{
					employeeNo: 0,
					nickName: this.$t('index.all')
				}]
			}
		},
		mounted() {
			this.getAllMaterial2()
		},
		methods: {
			getAllMaterial2() {
				this.$api.getAllMaterialCategory2().then(res => {
					this.supplierList =this.supplierdefault.concat(res.data.supplier)
					this.categoryList = this.subdefault.concat(res.data.category1)
					this.tabslist = this.subdefault.concat(res.data.category2)
				})
			},
			// 获取二级分类列表
			getSubCategory(id) {
				this.current=id
				this.$api.getMaterialCategory3({
					id: id
				}).then(res => {
					if (res.code == '200') {
						res.data.category2.forEach((item, index) => {
							item.isChoose = false
						})
						res.data.supplier.forEach((item, index) => {
							item.isChoose = false
						})

						this.supplierList = this.supplierdefault.concat(res.data.supplier)
						this.tabslist = this.subdefault.concat(res.data.category2)
					}
			
				})},
				// 获取供应商分类列表
				getSupplier(id) {
					this.$api.getMaterialCategory3({
						id: id
					}).then(res => {
						if (res.code == '200') {
							res.data.supplier.forEach((item, index) => {
								item.isChoose = false
							})
							this.supplierList = this.supplierdefault.concat(res.data.supplier)
						}
				
					})
			},
			stopMp(type) {
				if (type == 1) {
					this.$emit('closeSearch', false)
				}
			},
			searchProd(item, i, type) {
				console.log(item, i, type)
				if (type == 1) {
					this.getSubCategory(item.cid)
					if(item.cid==0){
						this.getAllMaterial2()
						this.subcurrent=0
						this.suppliercurrent=0
					}
				}else if(type ==2){
					this.subcurrent=item.cid
					this.getSupplier(item.cid)
				}else if(type ==3){
					this.suppliercurrent=item.employeeNo
				}
			},
			resert() {
				this.getAllMaterial2()
				this.current =0
				this.subcurrent=0
				this.suppliercurrent=0
			},
			// 筛选完成
			complate() {
				let data={
					categoryId:0,
					supplierCode:"",
					current:this.current,
					subcurrent:this.subcurrent
				}
				if(this.subcurrent){
					data.categoryId =this.subcurrent
				}else{
					data.categoryId = this.current
				}
				if(this.suppliercurrent){
					data.supplierCode = this.suppliercurrent
				}
				this.$emit('getSearchProd', data)
			},
		}

	}
</script>
<style>
	@import "./index.css";
</style>