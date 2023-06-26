<template>
	<view class="container">
		<div :class="['langItem',item.code == applicationLocale? 'active':'']" v-for="(item, index) in locales"
			:key="index" @click="onLocaleChange(item)">
			<view class="langItem_l">
				<image class="iconActive" :src="item.img" mode=""></image>
				<text>{{item.text}}</text>
			</view>
			<image class="check" src="../../static/check.png" mode="" v-if="item.code == applicationLocale"></image>
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
						code: 'en',
						img: "../../static/en.png"
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans',
						img: "../../static/zh.png"
					},
					{
						text: this.$t('locale.tai'),
						code: 'tai',
						img: "../../static/tai.png"
					},
					{
						text: this.$t('locale.han'),
						code: 'han',
						img: "../../static/han.png"
					}
				]
			}
		},
		onLoad() {
			this.applicationLocale = this.$i18n.locale;
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
			uni.setNavigationBarTitle({
				title: this.$t("index.select-language")
			});
		},
		methods: {
			onLocaleChange(e) {
				uni.setLocale(e.code);

				this.$i18n.locale = e.code;
				console.log(this.$i18n.locale)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		background-color: #f0f0f0;

		.langItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 152rpx;
			border-radius: 48rpx;
			border: 2rpx solid #DDDDDD;
			margin: 40rpx 30rpx;
			padding: 0 66rpx 0 60rpx;

			.langItem_l {
				display: flex;

				image {
					margin-right: 36rpx;
				}

				text {
					font-size: 36rpx;
					color: #000;
					line-height: 48rpx;
				}
			}

			.check {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.active {
			border: 2rpx solid #111111;

			.langItem_l {
				text {
					color: #111111;
				}
			}
		}

		.iconActive {
			width: 84rpx;
			height: 56rpx;
		}
	}
</style>