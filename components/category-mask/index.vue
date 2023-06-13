<template>
	<van-popup :show="true" :close-on-click-overlay="false" position="right"
		custom-style="height: 100%;width:90%; border-radius: 40rpx 0rpx 0rpx 40rpx;z-index:201">
		<view class="category">
			<view class="instructions">Main Category</view>
			<view class="category-main">
				<view v-for="(item,index) in categoryList" :key='index' @tap='searchProd(item,index,1)'
					:class="['category-item',item.cid==current?'active' :'']">
					{{item.categoryName}}
				</view>
			</view>
			<view>
				<view class="instructions" style="margin-top: 40rpx;">Sub Category</view>
				<view class="category-main">
					<view v-for="(item,index) in tabslist" :key='index' @tap='searchProd(item,index,2)'
						:class="['category-item',item.cid==subcurrent?'active' :'']">
						{{item.categoryName}}
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
		props: {
			tabslist: {
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
			current: {
				type: Number,
				default: 1
			},
			subcurrent: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {}
		},
		methods: {
			stopMp(type) {
				if (type == 1) {
					this.$emit('closeSearch', false)
				}
			},
			searchProd(item, i, type) {
				console.log(item, i, type)
				if (type == 1) {
					this.$emit('searchSubMaterial', item)
				}
			},
			resert() {
				this.categoryIds = []
				this.prodIds = [
					[],
					[]
				]
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
				this.$emit('closeSearch', false)
			},
		}

	}
</script>
<style>
	@import "./index.css";
</style>