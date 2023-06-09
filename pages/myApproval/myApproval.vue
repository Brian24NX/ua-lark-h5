<template>
	<view class="container">
		<van-search :value="value" placeholder=" Please enter material name/code" />
		<view class="select-down">
			<drop-down-list v-for="item in 3" :dataList="dataList" :labelProperty="labelProperty"></drop-down-list>
		</view>
		 <view class="goods-info" v-for="(item,index) in itemList" :key="index">
        	<view class="title" @click="changeContent(item,index)">
        		  上海太古汇
        	</view>
			<!-- 展开 -->
	        <view class="" v-show="item.open==true">
	        	<view class="time">
	        		<text>2023.06.03 10:54  </text>
	        		<text>Claire Wang</text>
	        	</view>
	        	<view class="info" v-for="item in 2">
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
	        </view>
        </view>
	</view>
</template>

<script>
	import dropDownList from "../../components/drop-down-list/index.vue"
	export default {
		components: {
			dropDownList
		},
		data() {
			return {
				dataList: [{
						name: "选项一"
					},
					{
						name: "选项二"
					}
				],
				labelProperty: "name",
				level: "2",
				itemList: [{
						open: true,

					},
					{
						open: true,

					}
				]
			}
		},
		methods: {
			changeContent(item, index) {
				this.itemList.forEach(i => {
					if (i.open !== this.itemList[index].open) {
						i.open = false;
					}
				})
				item.open = !item.open
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.select-down {
			display: flex;
			justify-content: space-around;
		}

		.goods-info {
			.time {
				display: flex;
				justify-content: space-between;
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
	}
</style>