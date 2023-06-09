<template>
	<view class="container">
		<view class="userInfo">
			<view class="info">
				<image src="../../static/defaultUser.png" mode=""></image>
				<view class="name">
					<view class="">Hi</view>
					<view class="">Mark !</view>
				</view>
			</view>
			<div class="language" @click="changeLanguage">
				<view class="">
					{{this.$t('index.language')}}
				</view>
			</div>
		</view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" indicator-dots="true"
			style="height: 1124rpx;" duration="500">
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 1124rpx;!important">
				</image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 1124rpx;!important">
				</image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 1124rpx;!important">
				</image>
			</swiper-item>
		</swiper>
		<van-divider customStyle="background-color: #000;; border-color: #000; height:2px;margin:0" />
		<van-divider customStyle="background-color: #000;; border-color: #000; height:6px;margin:0;margin-top:10rpx" />
		<!-- sa -->
		<!-- 		<view class="">
			<nav-arrow :newApplication="newApplication" :img="addimg" :haveIcon="true" :myApplication="myApplication" @tap="choosePage(3)" ></nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<nav-arrow  :haveIcon="false" :myApplication="myApplication" :check="check"  @tap="choosePage(2)" ></nav-arrow>
		</view> -->

		<!-- ops -->
		<!-- 		<view class="">
				<nav-arrow :newApplication="myApproval" :img="ticket" :haveIcon="true" :myApplication="myApplication"  @tap="choosePage(1)" ></nav-arrow>
				<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
				<nav-arrow :newApplication="myApplication" :img="edit" :haveIcon="true" :myApplication="myApplication"  @tap="choosePage(2)" ></nav-arrow>
				<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
				<nav-arrow :haveIcon="false" :myApplication="newApplication" :check="now"  @tap="choosePage(3)" ></nav-arrow>
		</view> -->

		<!-- 区域经理 -->
		<view class="">
			<region-nav-arrow :newApplication="myApproval" :haveBtn="true" @tap="choosePage(1)"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="myApplication" :haveBtn="true" :haveRefused="true"
				@tap="choosePage(2)"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="newApplication" :haveBtn="false" @tap="choosePage(3)"></region-nav-arrow>
		</view>

	</view>
</template>

<script>
	import navArrow from "../../components/nav-arrow/index"
	import regionNavArrow from "../../components/nav-arrow/index2"
	export default {
		components: {
			navArrow,
			regionNavArrow
		},
		data() {
			return {
				systemLocale: '',
				applicationLocale: '',
				addimg: '../../static/add.png',
				ticket: "../../static/ticket.png",
				edit: "../../static/edit.png"
			}
		},
		computed: {
			newApplication() {
				return this.$t('index.new-application')
			},
			myApplication() {
				return this.$t('index.my-application')
			},
			myApproval() {
				return this.$t('index.my-approval')
			},
			check() {
				return this.$t('index.check')
			},
			now() {
				return this.$t('index.now')
			}
		},
		onLoad() {
			tt.getSystemInfo({
				success: (res) => {
					// 调用this.setData可以进行状态管理
					console.log(res)
				},
			})
			// let systemInfo = uni.getSystemInfoSync();
			// console.log(systemInfo)
			// this.systemLocale = systemInfo.language;
			// this.applicationLocale = uni.getLocale();
			// this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			// uni.onLocaleChange((e) => {
			// 	console.log(e)
			// 	this.applicationLocale = e.locale;
			// })
			// this.token = this.$store.state.token
			// if (this.$store.state.token) {
			// 	console.log(this.$store.state.token)
			// }

		},
		mounted() {

		},
		methods: {
			choosePage(index) {
				console.log(index)
				if (index == 3) {
					uni.navigateTo({
						url: "/pages/selectMaterial/selectMaterial"
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/myApplication/myApplication"
					})
				} else {
					uni.navigateTo({
						url: "/pages/myApproval/myApproval"
					})
				}
			},
			changeLanguage() {
				uni.navigateTo({
					url: "/pages/chooseLanguage/chooseLanguage"
				})
			},
			onLocaleChange(e) {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;

			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F0F0F0;
		padding-bottom: 20rpx;

		.userInfo {
			display: flex;
			padding: 14px 14px 10px 14px;
			position: sticky;
			top: 0;
			z-index: 2;
			background-color: #F0F0F0;

			.info {
				display: flex;

				image {
					width: 104rpx;
					height: 104rpx;
					border-radius: 50%;
				}

				.name {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 40rpx;

					view:last-child {
						font-weight: bold;
					}
				}
			}
		}
	}

	.bg {
		width: 100%;
	}

	.language {
		padding: 14px;
		border: 1px solid #000;
		width: fit-content;
		border-radius: 30px;
		background-color: #000;
		color: #fff;
		position: absolute;
		right: 80px;

		view {
			font-size: 12px;
			padding: 1px;
			border: 1px solid #fff;
		}
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
</style>