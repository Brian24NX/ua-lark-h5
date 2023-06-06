<template>
	<view class="container">
		<view class="header">
			<!-- <view class="arrow-down" @tap="back()"></view> -->
			<image class="arrow-down" src="../../static/down-arrow.png" mode=""></image>
			<view class="barTitle">{{this.$t('index.select-language')}}</view>
		</view>
		<div class="langItem" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
			<image class="iconActive"
				src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
				mode="" v-if="item.code == applicationLocale"></image>
			<text>{{item.text}}</text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applicationLocale: '',
			}
		},
		computed: {
			locales() {
				return [{
						text: this.$t('locale.en'),
						code: 'en'
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans'
					}
				]
			}
		},
		onLoad() {
			uni.hideHomeButton()
			let systemInfo = uni.getSystemInfoSync();
			console.log(systemInfo)
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				console.log(e)
				this.applicationLocale = e.locale;
			})
			// this.token = this.$store.state.token
			// if (this.$store.state.token) {
			// 	console.log(this.$store.state.token)
			// }

		},
		methods: {
			back() {
				uni.navigateBack()
			},
			onLocaleChange(e) {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
				this.back()
				// this.token = this.$store.state.token
				// console.log(this.$store.state.token)
				// if (this.isAndroid) {
				//   uni.showModal({
				//     content: this.$t('index.language-change-confirm'),
				//     success: (res) => {
				//       if (res.confirm) {
				//         uni.setLocale(e.code);
				//       }
				//     }
				//   })
				// } else {
				//   uni.setLocale(e.code);
				//   this.$i18n.locale = e.code;
				// }
			}

		}
	}
</script>

<style lang="scss">
	.header {
		height: 73px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.arrow-down {
			height: 25px;
			width: 28px;
			display: inline-block;
			position: absolute;
			left: 18px;
		}

		.arrow-down::after {
			content: "";
			height: 18px;
			width: 18px;
			border-width: 2px 2px 0 0;
			border-color: #000;
			border-style: solid;
			-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			position: absolute;
			transform: rotate(136deg);
		}

	}

	.container {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		position: absolute;
		top: 0;

		.langItem {
			padding: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.iconActive {
			width: 60px;
			height: 60px;
			position: absolute;
			left: 20%;
		}
	}
</style>