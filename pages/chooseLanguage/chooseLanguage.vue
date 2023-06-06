<template>
	<view class="container">
	<nav-header :lang="this.$t('index.select-language')"></nav-header>
		<div class="langItem" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
			<image class="iconActive"
				src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
				mode="" v-if="item.code == applicationLocale"></image>
			<text>{{item.text}}</text>
		</div>
	</view>
</template>

<script>
   import navHeader from "../../components/header/index.vue"
	export default {
		components: { navHeader },
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

		},
		methods: {
			onLocaleChange(e) {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
				uni.navigateBack()
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