<template>
		<van-popup :show="true"  position="right" z-index="201"
			custom-style="height: 100%;width:80%; border-radius: 40rpx 0rpx 0rpx 40rpx;background-color: #F0F0F0"  @close="onClose">
			<view class="category">
				<view class="instructions">{{$t('index.main-category')}}</view>
				<view class="category-main">
					<view v-for="(item,index) in categoryLists" :key='index' @tap='searchProd(item,index,1)'
						:class="['category-item',item.cid==currentObj.current?'active' :'']">
						{{item.categoryName}}
					</view>
				</view>
				<view v-if="tabslists.length>0">
					<view class="instructions" style="margin-top: 40rpx;">{{$t('index.sub-category')}}</view>
					<view class="category-main">
						<view v-for="(item,index) in tabslists" :key='index' @tap='searchProd(item,index,2)'
							:class="['category-item',item.cid==currentObj.subcurrent?'active' :'']">
							{{item.categoryName}}
						</view>
					</view>
				</view>
				<view v-if="supplierLists.length>0">
					<view class="instructions" style="margin-top: 40rpx;">{{$t('index.supplier')}}</view>
					<view class="category-main">
						<view v-for="(item,index) in supplierLists" :key='index' @tap='searchProd(item,index,3)'
							:class="['category-item',item.employeeNo==currentObj.suppliercurrent?'active' :'']">
							{{item.nickName}}
						</view>
					</view>
				</view>
				<view class="btns_bottom">
					<van-divider customStyle="margin:0;color: #ddd; border-color: #ddd; padding:0 30rpx" />
					<view class="btns">
						<view class="cancel" @tap="resert">
							{{$t('index.reset')}}
						</view>
						<view class="complate" @tap="complate">
							{{$t('index.confirm')}}
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
		props: {
			currntObject: {
				type: Object,
				default: {}
			},
			categoryList:{
				type:Array,
				default:[]
			},
			tabslist:{
				type:Array,
				default:[]
			},
			supplierList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				tabslists: this.tabslist,
				categoryLists: this.categoryList,
				supplierLists: this.supplierList,
				subdefault: [{
					cid: 0,
					categoryName: this.$t('index.all')
				}],
				supplierdefault: [{
					employeeNo: 0,
					nickName: this.$t('index.all')
				}],
				currentObj: {
					current: 0,
					subcurrent: 0,
					suppliercurrent: 0
				}
			}
		},
		mounted() {
			this.currentObj.current = this.currntObject.current
			this.currentObj.subcurrent = this.currntObject.subcurrent
			this.currentObj.suppliercurrent = this.currntObject.suppliercurrent
		},
		methods: {
			getAllMaterial2() {
				this.$api.getAllMaterialCategory2().then(res => {
					if(res.data.supplier){
						this.supplierLists = this.supplierdefault.concat(res.data.supplier)
					}
					if(res.data.category2){
					   this.tabslists = this.subdefault.concat(res.data.category2)
					}
					this.categoryLists = this.subdefault.concat(res.data.category1)
					
				})
			},
			// 获取二级分类列表
			getSubCategory(id) {
				this.currentObj.current = id
				this.$api.getMaterialCategory3({
					id: id
				}).then(res => {
					if (res.code == '200') {
						if(res.data.supplier){
							res.data.supplier.forEach((item, index) => {
								item.isChoose = false
							})
							this.supplierLists = this.supplierdefault.concat(res.data.supplier)
						}else{
							this.supplierLists=[]
						}
						if(res.data.category2){
							res.data.category2.forEach((item, index) => {
								item.isChoose = false
							})
							this.tabslists = this.subdefault.concat(res.data.category2)
						}else{
							this.tabslists=[]
						}
					
					}

				})
			},
			// 获取供应商分类列表
			getSupplier(id) {
				this.$api.getMaterialCategory3({
					id: id
				}).then(res => {
					if (res.code == '200') {
						if(res.data.supplier){
							res.data.supplier.forEach((item, index) => {
								item.isChoose = false
							})
							this.supplierLists = this.supplierdefault.concat(res.data.supplier)
						}else{
							this.supplierLists=[]
						}
						
					}

				})
			},
			searchProd(item, i, type) {
				if (type == 1) {
					this.getSubCategory(item.cid)
					if (item.cid == 0) {
						this.getAllMaterial2()
					}
					this.currentObj.subcurrent = 0
					this.currentObj.suppliercurrent = 0
				} else if (type == 2) {
					if(this.currentObj.current==0 && item.cid==0){
					this.currentObj.subcurrent = 0
					this.currentObj.suppliercurrent = 0
						this.getAllMaterial2()
						return
					}
					if(this.currentObj.current!=0 &&item.cid==0){
						this.getSubCategory(this.currentObj.current)
						this.currentObj.subcurrent = 0
						this.currentObj.suppliercurrent = 0
						return
					}
					this.currentObj.subcurrent = item.cid
					this.getSupplier(item.cid)
				} else if (type == 3) {
					this.currentObj.suppliercurrent = item.employeeNo
				}
			},
			resert() {
				this.getAllMaterial2()
				this.currentObj.current = 0
				this.currentObj.subcurrent = 0
				this.currentObj.suppliercurrent = 0
				this.$emit("updateCurrent", this.currentObj)
			},
			// 筛选完成
			complate() {
				let data = {
					categoryId: 0,
					supplierCode: "",
				}
				if (this.currentObj.subcurrent) {
					data.categoryId = this.currentObj.subcurrent
				} else {
					data.categoryId = this.currentObj.current
				}
				if (this.currentObj.suppliercurrent) {
					data.supplierCode = this.currentObj.suppliercurrent
				}
				this.$emit("updateCurrent",this.currentObj)
				this.$emit('getSearchProd', data)
			},
			onClose(){
				this.$emit('closeSearch', false)
			}
		}
	}
</script>
<style>
	@import "./index.css";
</style>