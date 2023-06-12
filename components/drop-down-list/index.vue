<template>
	<view class="container">
		<view class="zq-drop-list" @mouseover="onDplOver($event)" @mouseout="onDplOut($event)"
			v-for="(item, index) in dataList" :key="index">
			<view class="title">{{item.name}}</view>
			<ul :style="show?'display:block':'display:none'">
				<li @click="onLiClick(index, $event)">{{item[labelProperty]}}</li>
			</ul>
		</view>
	</view>

</template>

<script>
	export default {
		name: "DropDownList",
		data() {
			return {
				activeIndex: 0,
				show: false
			}
		},
		props: {
			dataList: {
				type: Array,
				default: []
			},
			labelProperty: {
				type: String,
				default () {
					return "name"
				}
			}
		},

		//    directive:{
		//        dpl:{
		//    //         bind(el,binding){
		// 			// console.log(el,binding)
		//    //             el.style.display = "none";
		//    //         }
		// bind:function(el){
		// 	console.log('11111111111111',el)
		// }
		//        }
		//    },
		methods: {
			onDplOver(event) {
				// let ul = event.currentTarget.childNodes[1];
				// ul.style.display = "block";
				this.show = true
			},
			onDplOut(event) {
				// let ul = event.currentTarget.childNodes[1];
				// ul.style.display = "none";
				this.show = false
			},
			onLiClick(index) {
				// let path = event.path || (event.composedPath && event.composedPath()) //兼容火狐和safari
				// path[1].style.display = "none";
				this.activeIndex = index;
				this.$emit("change", {
					index: index,
					value: this.dataList[index]
				})
			}
		},
		computed: {
			dplLable() {
				return this.dataList[this.activeIndex][this.labelProperty]
			}
		}
	}
</script>


<style lang="scss">
	.zq-drop-list {
		display: inline-block;
		min-width: 100px;
		position: relative;
margin-right: 32rpx;
		.title {
			font-size: 28rpx;
			color: #111111;
			line-height: 38rpx;
			padding: 14rpx 52rpx 14rpx 34rpx;
			border-radius: 35rpx;
			border: 2rpx solid #111111;
			position: relative;

			&::after {
				display: inline-block;
				content: "";
				width: 10rpx;
				height: 10rpx;
				background-color: transparent;
				/* 模块背景为透明 */
				border-color: #111111;
				border-style: solid;
				border-width: 2rpx 2rpx 0 0;
				transform: rotate(132deg);
				position: absolute;
				right: 34rpx;
				top: 24rpx;
			}
		}

		ul {
			position: absolute;
			top: 30px;
			left: 0;
			width: 100%;
			margin: 0;
			padding: 0;
			border: solid 1px #f1f1f1;
			border-radius: 4px;
			overflow: hidden;

			li {
				list-style: none;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				border-bottom: solid 1px #f1f1f1;
				background: #ffffff;
			}

			li:last-child {
				border-bottom: none;
			}

			li:hover {
				background: #f6f6f6;
			}
		}
	}
</style>