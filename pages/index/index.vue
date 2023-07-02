<template>
	<view class="container">
		<view class="navbar" v-if="storeRole">
			<view class="userInfo" :style="{'width':barWith+'px','height':barHeight +'px','padding-top':barTop +'px'}">
				<view class="info" v-if="userInfo">
					<image :src="userInfo.avatarUrl" mode=""></image>
					<view class="name">
						<view class="">{{this.$t('index.hi')}}</view>
						<view class="">{{userInfo.name}} !</view>
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
			style="height: 940rpx;" duration="500" v-if="storeRole">
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 940rpx;!important">
				</image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 940rpx;!important">
				</image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner.png" mode="aspectFill" style="width: 100vw;height: 940rpx;!important">
				</image>
			</swiper-item>
		</swiper>
		<van-divider customStyle="background-color: #000;; border-color: #000; height:2px;margin:0" v-if="storeRole" />
		<van-divider customStyle="background-color: #000;; border-color: #000; height:6px;margin:0;margin-top:10rpx"
			v-if="storeRole" />
		<!-- sa -->
		<view class="" v-if="storeRole==3">
			<sa-nav-arrow :newApplication="newApplication" :img="addimg" :haveIcon="true" :myApplication="myApplication"
				@tap.native="choosePage(3)"></sa-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<sa-nav-arrow :haveIcon="false" :myApplication="myApplication" @tap.native="choosePage(2)"></sa-nav-arrow>
		</view>
		<!-- ops -->
		<view class="" v-if="storeRole==10">
			<nav-arrow :newApplication="myApproval" :img="ticket" :haveIcon="true" :myApplication="myApplication"
				@tap.native="choosePage(1)"></nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<nav-arrow :newApplication="myApplication" :img="edit" :haveIcon="true" :myApplication="myApplication"
				@tap.native="choosePage(2)"></nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<nav-arrow :haveIcon="false" :myApplication="newApplication" @tap.native="choosePage(3)"></nav-arrow>
		</view>
		<!-- 区域经理 -->
		<view class="" v-if="storeRole==1 ||storeRole==2">
			<region-nav-arrow :newApplication="myApproval" :haveBtn="true" @tap.native="choosePage(1)"
				:havepending="true"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="myApplication" :haveBtn="true"
				@tap.native="choosePage(2)"></region-nav-arrow>
			<van-divider customStyle="background-color: #DEDEDE; border-color:#DEDEDE; height:1px;margin:0" />
			<region-nav-arrow :newApplication="newApplication" :haveBtn="false"
				@tap.native="choosePage(3)"></region-nav-arrow>
		</view>
	</view>
</template>

<script>
	import navArrow from "../../components/nav-arrow/index"
	import regionNavArrow from "../../components/nav-arrow/index2"
	import saNavArrow from "../../components/nav-arrow/index3"
	export default {
		components: {
			navArrow,
			regionNavArrow,
			saNavArrow
		},
		data() {
			return {
				indicatorDots: true,
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
				storeList: [],
				// 1:大区经 2:小区经 3:店长 4:店员 10:OPS',
				storeRole: 0,
				permissionErr: false
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
			}
		},
		onLoad() {
			if (uni.getSystemInfoSync().uniPlatform == "mp-lark") {
				uni.getSystemInfo({
					success: res => {
						this.barHeight = res.navigationBarSafeArea.height
						this.barTop = res.navigationBarSafeArea.top
						this.barWith = res.navigationBarSafeArea.width
					}
				})
			}
			if (uni.getStorageSync('token')) {
				if (uni.getStorageSync('user') && uni.getStorageSync('user').storeRole) {
					this.storeRole = uni.getStorageSync('user').storeRole
					this.userInfo = uni.getStorageSync('user')
					this.getStoreList(uni.getStorageSync('user'))
				}
			} else {
				this.userLogins()
			}
			// this.userLogins()
		},
		methods: {
			// 店长 刘亚娟  091267
			// 小区经 Joyce Li  310746
			userLogins() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this
				if (uni.getSystemInfoSync().uniPlatform != "mp-lark") {
					uni.login({
						success(res) {
							that.$api
								.userLogin({
									code: res.code
								})
								.then(resp => {
									if (resp.code == '200') {
										uni.hideLoading();
										uni.setStorageSync('token', resp.data.token)
										// if(!resp.data.user){
										// 	resp.data.user={"id":17613,"larkUserId":"1f46edd5","larkUnionId":"on_0f3f22f1ca64ed20738df7ca268f286f","larkOpenId":"ou_620337f0a39b5b9d7b419094e396624a","employeeNo":"1f46edd5","employeeType":5,"name":"Jiaodi Wang","enName":"","email":"jiaodi.wang@underarmour.com","mobile":"+8615337165851","avatarUrl":"https://pan16.larksuitecdn.com/static-resource/v1/v2_855215c3-fa6c-43ad-88af-6bbfcbc77cch~?image_size=noop&cut_type=&quality=&format=png&sticker_format=.webp","gender":"0","status":"{\"isActivated\":true,\"isExited\":false,\"isFrozen\":false,\"isResigned\":false,\"isUnjoin\":false}","deptId":1404,"larkDeptId":"398f96d8ed1a9e46","country":"","city":"","workStation":"","joinTime":"1970-01-20T12:18:43.000+00:00","isTenantManager":0,"jobTitle":"","storeRole":2,"isFrozen":1,"tenantCode":"1"}
										// }
										if ((resp.data.user && resp.data.user.systemRole) || (resp.data.user &&
												resp.data.user.storeRole)) {
											that.storeRole = resp.data.user.systemRole || resp.data.user
												.storeRole
											that.userInfo = resp.data.user
											if (resp.data.user.systemRole) {
												resp.data.user.storeRole = resp.data.user.systemRole
											}
											uni.setStorageSync('user', resp.data.user)
											that.getStoreList(resp.data.user)
										} else {
											// 无权限
											uni.redirectTo({
												url: "/pages/pageErr/pageErr?type=1"
											})
										}
									} else {
										uni.hideLoading();
										// 网络异常
										uni.redirectTo({
											url: "/pages/pageErr/pageErr?type=2"
										})
									}

								}).catch(err => {
									uni.hideLoading();
									// 网络异常
									uni.redirectTo({
										url: "/pages/pageErr/pageErr?type=2"
									})
								});
						}
					});
				} else {
					that.$api
						.userLogin2({
							code: 'c2e2c441' //location.href.split('=')[1]
						})
						.then(resp => {
							if (resp.code == '200') {
								uni.hideLoading();
								uni.setStorageSync('token', resp.data.token)
								if ((resp.data.user && resp.data.user.systemRole) || (resp.data.user && resp.data.user
										.storeRole)) {
									that.storeRole = resp.data.user.systemRole || resp.data.user.storeRole
									that.userInfo = resp.data.user
									if (resp.data.user.systemRole) {
										resp.data.user.storeRole = resp.data.user.systemRole
									}
									uni.setStorageSync('user', resp.data.user)
									that.getStoreList(resp.data.user)
								} else {
									// 无权限
									uni.redirectTo({
										url: "/pages/pageErr/pageErr?type=1"
									})
								}
							} else {
								uni.hideLoading();
								// 网络异常
								uni.redirectTo({
									url: "/pages/pageErr/pageErr?type=2"
								})
							}

						}).catch(err => {
							uni.hideLoading();
							// 网络异常
							uni.redirectTo({
								url: "/pages/pageErr/pageErr?type=2"
							})
						});
				}
			},
			getStoreList(user) {
				let data = {
					employeeNo: user.employeeNo,
					gender: user.gender,
					id: user.id,
					mobile: user.mobile,
					name: user.name,
					nickname: user.nickname,
					tenantCode: user.tenantCode
				}
				this.$api.searchStoreList(data).then(res => {
					console.log(res)
					if (res.code == '200') {
						this.storeList = res.data
						if (this.storeList.length <= 1) {
							this.url = "/pages/selectMaterial/selectMaterial?store=" + JSON.stringify(this
								.storeList[0])
						} else {

							this.url = "/pages/storeList/storeList"
						}
					}
				})
			},
			choosePage(index) {
				if (index == 3) {
					uni.navigateTo({
						url: this.url
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/myApplication/myApplication"
					})
				} else {
					if (this.storeRole == 10) {
						uni.navigateTo({
							url: "/pages/myApproval/opsMyApproval"
						})
					} else {
						uni.navigateTo({
							url: "/pages/myApproval/myApproval"
						})
					}

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

<style lang="scss" scoped>
	.container {
		background-color: #F0F0F0;
		padding-bottom: 30rpx;

		.navbar {
			position: sticky;
			top: 0;
			z-index: 2;
			background-color: #ffffff;
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