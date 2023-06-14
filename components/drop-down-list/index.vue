<template>
	<view class="container">
		<view class="zq-drop-list"
			v-for="(item, index) in dataList" :key="index">
			<view :class="['title',item.show?'activemenu':'']" @click="menuShow(item,index)">{{item.name}}</view>
			<!-- :style="show?'display:block':'display:none'" -->
			<view class="mask" :style="item.show?'display:block':'display:none'" @click="hideMenu">
				<ul>
					<li @click="onLiClick(index, $event)">广州太古汇</li>
					<li @click="onLiClick(index, $event)">深圳京基一百</li>
					<li @click="onLiClick(index, $event)">上海浦东万达广场</li>
					<li @click="onLiClick(index, $event)">东莞太一城</li>
				</ul>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "DropDownList",
		data() {
			return {
				activeIndex: 0,
			}
		},
		props: {
			dataList: {
				type: Array,
				default: []
			},
		},
		methods: {
		menuShow(item,index){
			this.$emit("selectMenu",item,index)
		},
		hideMenu(){
			this.$emit('hideMenu',false)
		},
			onLiClick(index) {
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


<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.zq-drop-list {
		display: inline-block;
		min-width: 100px;

		.mask {
			width: 100vw;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			position: absolute;
			left: 0;
		}

		.title {
			font-size: 28rpx;
			color: #111111;
			line-height: 38rpx;
			padding: 14rpx 52rpx 14rpx 34rpx;
			border-radius: 35rpx;
			border: 2rpx solid #111111;
			position: relative;
			margin: 26rpx 0 28rpx 30rpx;

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
		.activemenu{
			&::after{
				transform: rotate(314deg);
			}
		}

		ul {
			position: absolute;
			width: -webkit-fill-available;
			background-color: #f8f8f8;
			z-index: 1;
			border-radius: 0px 0px 40rpx 40rpx;
			padding: 40rpx 0 0 30rpx;

			li {
				font-size: 28rpx;
				color: #111111;
				line-height: 40rpx;
				margin-bottom: 40rpx;
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