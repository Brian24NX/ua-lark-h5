<template>
	<view class="container">
		<view class="navbar">
			<view class="userInfo" :style="{'width':barWith+'px','height':barHeight +'px','padding-top':barTop +'px'}">
				<view class="info" v-if="userInfo">
					<image :src="userInfo.avatarUrl" mode=""></image>
					<view class="name">
						<view class="">Hi</view>
						<view class="">{{userInfo.nickName}} !</view>
					</view>
				</view>
				<div class="language" @click="changeLanguage">
					<view class="">
						{{this.$t('index.language')}}
					</view>
				</div>
			</view>
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
			<region-nav-arrow :newApplication="myApproval" :haveBtn="true" @tap="choosePage(1)"
				:havepending="true"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="myApplication" :haveBtn="true" @tap="choosePage(2)"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="newApplication" :haveBtn="false" @tap="choosePage(3)"></region-nav-arrow>
		</view>

	</view>
</template>

<script>
	import navArrow from "../../components/nav-arrow/index"
	import regionNavArrow from "../../components/nav-arrow/index2"
	import api from '../../fetch/api.js'
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
				edit: "../../static/edit.png",
				userInfo: null,
				system: {},
				barHeight: 0,
				barTop: 0,
				barWith: 0,
				url: "/pages/selectMaterial/selectMaterial",
				storeList: []
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
		onShow() {
			let that = this
			uni.getUserInfo({
				success(res) {
					that.userInfo = res.userInfo
				},
				fail(res) {

				}
			});
			console.log('当前语言', uni.getLocale())
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.barHeight = res.navigationBarSafeArea.height
					this.barTop = res.navigationBarSafeArea.top
					this.barWith = res.navigationBarSafeArea.width
				}
			})
			this.getStoreList()
		},

		methods: {
			getStoreList() {
				this.$api.searchStoreList().then(res => {
					console.log(res)
					if (res.code == '200') {
						this.storeList = res.data
						if (this.storeList.length == 1) {
							this.url = "/pages/selectMaterial/selectMaterial?store=" + JSON.stringify(this
								.storeList[0])
						} else {

							this.url = "/pages/storeList/storeList"
						}
					}
				})
			},
			choosePage(index) {
				console.log(index)
				if (index == 3) {
					uni.navigateTo({
						url: this.url
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
		padding-bottom: 40rpx;

		.navbar {
			position: sticky;
			top: 0;
			z-index: 2;
			background-color: #F0F0F0;
			padding-bottom: 20rpx;
		}

		.userInfo {
			height: 55px;
			display: flex;
			align-items: center;
			position: relative;

			.info {
				display: flex;
				margin-left: 30rpx;

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
		width: 44rpx;
		height: 44rpx;
		color: #333333;
		position: absolute;
		right: 0px;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1.6px solid #333333;
		font-weight: bold;
		border-radius: 3px;
	}
</style>