<template>
	<view class="category-mask" @click.stop="stopMp(1)">
		<view class="category" @click.stop="stopMp(2)">
			<image src="/static/images/icon/close.png" mode="" class="close" @click="closeClass"></image>
			<view class="instructions">产品类别</view>
			<view class="category-main">
				<view class="category-item" v-for="(item,index) in categoryLists" :key='index'
					@tap='searchProd(item,index,1)' :class="[item.isChoose==true?'active':'']">
					{{item.categoryName,item.isChoose}}
				</view>
			</view>
			<view v-for="(item,index) in skuTitles" :key="index">
				<view class="instructions" style="margin-top: 40rpx;">{{item.title}}</view>
				<view class="category-main">
					<view class="category-item" v-for="(val,indexs) in item.children" :key='indexs'
						@tap='searchProd(val,index,2)' :class="[val.isChoose==true?'active':'']">
						{{val.name}}
					</view>
				</view>
			</view>
			<view class="btns">
				<view class="cancel" @tap="resert">
					重置
				</view>
				<view class="complate" @tap="complate">
					完成
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			skuTitle: {
				type: Array,
				default () {
					return []
				}
			},
			categoryList: {
				type: Array,
				default () {
					return []
				}
			},
			skuList: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				categoryIds: [],
				prodIds: [
					[],
					[]
				],
				categoryLists: [],
				skuTitles: []
			}
		},
		mounted() {

			this.categoryLists = this.categoryList
			this.skuTitles = this.skuTitle
			console.log(this.categoryLists,this.skuTitles)
		},
		methods: {
			stopMp(type) {
				if (type == 1) {
					this.$emit('closeSearch', false)
				}
			},
			closeClass() {
				this.$emit('closeSearch', false)
			},
			searchProd(item, i, type) {
					this.prodIds = [[],[]]
				if (item.isChoose) {
					this.$set(item, "isChoose", false);
				} else {
					this.$set(item, "isChoose", true)
				}
			},
			resert() {
				this.categoryIds = []
				this.prodIds = [[],[]]
				this.skuTitles.forEach((item, index) => {
					this.$set(item, "isChoose", false);
				})
				for (let row of this.categoryLists) {
					this.$set(row, "isChoose", false);
				}
				this.skuTitles.forEach((item, index) => {
					item.children.forEach((val, i) => {
						this.$set(val, "isChoose", false);
					})
				})
			},
			// 筛选完成
			complate() {
				this.categoryList.forEach((item, index) => {
					if (item.isChoose) {
						this.categoryIds.push(item.categoryId)
					}
				})

				//       this.skuTitle.forEach((item,index)=>{
				// 	   item.children.forEach((val,i)=>{
				// 				for (let key in this.skuList) {
				// 					if (val.isChoose && key.indexOf(item.title+":"+val.name) != -1) {
				// 						this.prodIds.push(this.skuList[key])
				// 					}
				// 				}
				// 	}
				// 	)
				// })
				this.skuTitle.forEach((item, index) => {
					item.children.forEach((val, i) => {
						for (let key in this.skuList) {
							if (val.isChoose && key.indexOf(item.title + ":" + val.name) != -1) {
								this.prodIds[index].push(this.skuList[key])
								// if (item.title == "颜色") {
								// 	this.prodIds[index].push(this.skuList[key])
								// } else {
								// 	this.prodIds[1].push(this.skuList[key])
								// }
							}
						}
					})
				})
				this.prodIds.forEach((item, index) => {
					if (item.length) {
						let arr = item.join(',').split(',').map(val => {
							return Number(val);
						})
						this.prodIds[index] = Array.from(new Set(arr))
					}
				})
				this.prodIds =this.prodIds.filter(function(s){
					if(s.length){
						return s
					}
				})
				this.$emit('getSearchProd', this.categoryIds, this.prodIds, this.categoryLists, this.skuTitles)
			},
		}

	}
</script>
<style>
	@import "./index.css";
</style>
