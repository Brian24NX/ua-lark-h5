<template>
	<view class="container">
		<van-search :value="value" placeholder=" Please enter material name/code" />
		<view class="select-down">
			<drop-down-list v-for="item in 3" :dataList="dataList" :labelProperty="labelProperty"></drop-down-list>
		</view>
		<!--        <view class="goods-info">
        	<view class="title">
        		  上海太古汇
        	</view>
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
        </view> -->
		<!-- <ul class="newslist">
		
     	</u1> -->
		<ul class="newslist">
			<li v-for="(items, index) in proLists" :key="index">
			<p @click="openFunc(index)">
				<span>{{items.name}}</span>
			</p>
			<div class="p liCon">
				<div>
					测试111
				</div>
			</div>
			</li>
		</ul>
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
				activeNames: ['1'],
				liConHeight:0 ,// 折叠面板内容初始高度prolists: [
				proLists:[
					{
						name:"ceshi1"
					},
					{
						name:"cesjo2"
					}
				]
			}
		},
		methods: {
			onChange(event) {
				console.log(event)
				// this.activeNames= event.detail,
			},
			openFunc (i) {
			const query = uni.createSelectorQuery().in(this);
			const liCon = query.selectAll('.liCon')
           console.log(liCon)
			
		// 			return
		// 	const liCon = this.$refs.liCon[i]
		
		// 	let height = liCon.offsetHeight
		// 	if (height === this.liConHeight) { // 展开
		// 	liCon.style.height = "auto"
		// 	height = liCon.offsetHeight
		// 	liCon.style.height = this.liConHeight + 'px'
		// 	// eslint-disable-next-line no-unused-vars
		// 	let f = document.body.offsetHeight // 必加
		// 	liCon.style.height = height + 'px'
		// 	}
		// 	else{
		// 		// 收缩
		// 		liCon.style.height = this.liConHeight + 'px'
		// 	} 

		}
		}
	}
</script>

<style lang="scss">
	.newslist>li>div{
	height: Opx;
	overflow: hidden;
	transition: height .3s; // 动画效果
	}
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