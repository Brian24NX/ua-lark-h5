<template>
	<view class="container">
		<div class="language" @click="changeLanguage">English</div>
		<image mode="center" class="bg" src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"></image>
		<div class="tab">
			<div class="tabItem" v-for="(item ,index) in tab" :key="index">
				<div class="num">1</div>
				<image class="iconImage" :src="item.icon" mode=""></image>
				<text>{{item.text}}</text>
			</div>
		</div>
		<div class="mask" v-if="languageShow">
			<div class="langItem" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
				<image class="iconActive"
					src="https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg"
					mode="" v-if="item.code == applicationLocale"></image>
				<text>{{item.text}}</text>
			</div>
		</div>

		<!--    <view class="locale-setting">{{$t('index.language-info')}}</view>
    <view class="list-item">
      <text class="k">{{$t('index.system-language')}}:</text>
      <text class="v">{{systemLocale}}</text>
    </view>
    <view class="list-item">
      <text class="k">{{$t('index.application-language')}}:</text>
      <text class="v">{{applicationLocale}}</text>
    </view>
    <view class="locale-setting">{{$t('index.language')}}</view>
    <view class="locale-list">
      <view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
        <text class="text">{{item.text}}</text>
        <text class="icon-check" v-if="item.code == applicationLocale"></text>
      </view>
    </view>
	<view style="word-break: break-all;" v-if="token">token：{{token}}</view>
	<uni-link href="https://uniapp.dcloud.io/" text="https://uniapp.dcloud.io/"></uni-link> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemLocale: '',
				applicationLocale: '',
				token: '',
				languageShow:false,
				tab: [{
						icon: "https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg",
						text: "My Approval"
					},
					{
						icon: "https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg",
						text: "My Application"
					},
					{
						icon: "https://picnew12.photophoto.cn/20180412/xiaoqingxindongwushouhuikeaixiaolupng-32400140_1.jpg",
						text: "New Application"
					}
				]
			}
		},
		computed: {
			locales() {
				return [{
						text: this.$t('locale.auto'),
						code: 'auto'
					}, {
						text: this.$t('locale.en'),
						code: 'en'
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans'
					},
					{
						text: this.$t('locale.zh-hant'),
						code: 'zh-Hant'
					},
					{
						text: this.$t('locale.ja'),
						code: 'ja'
					}
				]
			}
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			console.log(systemInfo)
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				console.log(e)
				this.applicationLocale = e.locale;
			})
			this.token = this.$store.state.token
			if (this.$store.state.token) {
				console.log(this.$store.state.token)
			}

		},
		mounted() {

		},
		methods: {
			changeLanguage(){
				uni.n
				this.languageShow = true
			},
			onLocaleChange(e) {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
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
		margin: 0 10px;
	}

	.bg {
		width: 100%;
	}

	.language {
		padding: 10px;
		border: 1px solid #000;
		width: fit-content;
		border-radius: 30px;
		float: right;
		margin-bottom: 20px;
	}

	.tab {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;

		.tabItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.num {
				width: 18px;
				height: 18px;
				background-color: red;
				color: white;
				text-align: center;
				line-height: 18px;
				font-size: 12px;
				border-radius: 50%;
				position: absolute;
				right: 0;
			}

			.iconImage {
				width: 60px;
				height: 60px;
			}

			text {
				width: 90px;
				word-break: break-word;
				font-size: 18px;
				text-align: center;
				display: inline-block;
			}
		}

	}

	.mask {
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

	.title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.description {
		font-size: 14px;
		opacity: 0.6;
		margin-bottom: 15px;
	}

	.detail-link {
		font-size: 14px;
		word-break: break-all;
	}

	.link {
		color: #007AFF;
		margin-left: 10px;
	}

	.locale-setting {
		font-size: 16px;
		font-weight: bold;
		margin-top: 25px;
		margin-bottom: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #f0f0f0;
	}

	.list-item {
		font-size: 14px;
		padding: 10px 0;
	}

	.list-item .v {
		margin-left: 5px;
	}

	.locale-item {
		display: flex;
		flex-direction: row;
		padding: 10px 0;
	}

	.locale-item .text {
		flex: 1;
	}

	.icon-check {
		margin-right: 5px;
		border: 2px solid #007aff;
		border-left: 0;
		border-top: 0;
		height: 12px;
		width: 6px;
		transform-origin: center;
		/* #ifndef APP-NVUE */
		transition: all 0.3s;
		/* #endif */
		transform: rotate(45deg);
	}
</style>