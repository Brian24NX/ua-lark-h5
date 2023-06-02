<template>
	<div>
       <view class="search">
			<view class="search_box">
				<!-- <image src="@/static/icon/search.png"></image> -->
				<input type="text" confirm-type="search" v-model="keyword" @confirm="searchClick(key)" @input="changeInput" :placeholder="defaultKeyword" />
				<image src="@/static/icon/del_text.png" v-show="keyword" @click="delKeyword()"></image>
			</view>
			<!-- <view class="search_btn" @click="searchClick(key)">搜索</view> -->
		</view>
		<view class="classbox">
			<!-- 左侧tabs -->
			<view class="tabs">
				<view class="tab alldisplay"  :class="item.id==current?'active' :''"   @click="select(item)" v-for="item in tabslist"  :key="item.id" >{{item.name}}</view>
			</view>
			<!-- 右侧cont -->
			<scroll-view  scroll-y="true" style="height: 100vh;">
				<view class="conts">
					<view class="cont" v-for="item in contlist"  :key="item.id"  @click="tz(item.id,item.name,item)">
						<image :src="item.imgUrl" mode=""></image>
					   <view class="name">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				current:1,
				tabslist:[{
					id:1,
					name:'家具'
				},{
					id:2,
					name:'文具'
				}],
				contlist:[{
					imgUrl:"https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9C%A8%E7%BA%BF%E5%9B%BE%E7%89%87&hs=0&pn=7&spn=0&di=7214885350303334401&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=675529237%2C3463061695&os=1748749636%2C1166520889&simid=675529237%2C3463061695&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9C%A8%E7%BA%BF%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fimg.tuguaishou.com%2Fips_templ_preview%2Feb%2F97%2F52%2Flg_4456220_1627664430_6104302eacabc.jpg!w1024_w%3Fauth_key%3D2288152006-0-0-a59502876ce313d748225d27cd3693d8&fromurl=ippr_z2C%24qAzdH3FAzdH3Fb8brf_z%26e3Bv54AzdH3FrtvAzdH3F99cmdda_z%26e3Bip4s&gsm=&islist=&querylist=&dyTabStr=MCwzLDEsNiw0LDUsNyw4LDIsOQ%3D%3D",
					name:"家具"
				},{
					imgUrl:"https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9C%A8%E7%BA%BF%E5%9B%BE%E7%89%87&hs=0&pn=7&spn=0&di=7214885350303334401&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=675529237%2C3463061695&os=1748749636%2C1166520889&simid=675529237%2C3463061695&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9C%A8%E7%BA%BF%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fimg.tuguaishou.com%2Fips_templ_preview%2Feb%2F97%2F52%2Flg_4456220_1627664430_6104302eacabc.jpg!w1024_w%3Fauth_key%3D2288152006-0-0-a59502876ce313d748225d27cd3693d8&fromurl=ippr_z2C%24qAzdH3FAzdH3Fb8brf_z%26e3Bv54AzdH3FrtvAzdH3F99cmdda_z%26e3Bip4s&gsm=&islist=&querylist=&dyTabStr=MCwzLDEsNiw0LDUsNyw4LDIsOQ%3D%3D",
					name:"家具"
				}],
			}
		},
		onLoad() {
			// this.gettabslist()
			// setTimeout(()=>{
			// 	this.getcontlist(this.tabslist[0].id)
			// 	this.current =this.tabslist[0].id
			// },500)	
		},
		methods: {
			gettabslist(){
				this.$http.get('/app/goodsTypeCopy/parentList ', {}).then(res=>{
					if(res.code==200){
						console.log(res.data);
						this.tabslist = res.data
					}
				})
			},
			select(item){
				this.current  =item.id
				this.getcontlist(this.current)
				
			},
			getcontlist(id){
				this.$http.get('/app/goodsTypeCopy/moreListById',{id}).then(res=>{
					if(res.code==200){
						this.contlist = res.data
					}
				})
			},
			tz(id,name,item){
				if(this.current!==2){
					uni.navigateTo({
						url:'/pages/index/chuanglian?id=' + id +'&title=' +name
					})
				}else{
					console.log(item.isHaveSeries);
					if(item.isHaveSeries==0){
						uni.navigateTo({
							url:'/pages/index/chuanglian?id=' + id +'&title=' +name
						})
					}else{
						uni.navigateTo({
							url:'/pages/class/class2?id=' + id +'&title=' +name
						})
					}
					
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
	}
	.tabs{
		width: 30%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
	}
	.tab{
		width: 100%;
		height: 80rpx;
	}
	.conts{
		width: 100%;
		min-height: 10vh;
		padding: 26rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.active{
		background: #fff;
	}
	.cont{
		width: 150rpx;
		height: 200rpx;
		margin: 0 20rpx 60rpx 0;
	}
	.cont image{
		width: 150rpx;
		height: 160rpx;
	} 
	.classbox{
		display: flex;
	}
	.name{
		font-size: 26rpx;
		text-align: center;
	}
.search {
	display: flex;
	align-items: center;
	height: 120rpx;
	padding-bottom: 30rpx;
	background-color: #f7f7f7;
	font-size: 26rpx;
	& > image {
		width: 18rpx;
		height: 31rpx;
		margin-left: 53rpx;
	}
	.search_box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60rpx;
		background-color: #ffffff;
		// box-shadow: 2rpx 2rpx 2rpx red;
		border-radius: 30rpx;
		margin: 0 12rpx 0 25rpx;
		padding-left: 18rpx;
		image:nth-child(1) {
			margin: 0 18rpx 0 7rpx;
			width: 28rpx;
			height: 28rpx;
		}
		image:nth-child(3) {
			margin: 0 14rpx 0 auto;
			width: 31rpx;
			height: 31rpx;
		}
		input {
			height: 60rpx;
			// letter-spacing: 4rpx;
			line-height: 60rpx;
			color: #969696;
		}
	}
	.search_btn {
		width: 96rpx;
		height: 52rpx;
		background-color: #fff;
		color: pink;
		border-radius: 26rpx;
		line-height: 52rpx;
		text-align: center;
	}
}
</style>
