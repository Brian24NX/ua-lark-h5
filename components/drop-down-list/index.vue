<template>
    <div class="zq-drop-list" @mouseover="onDplOver($event)" @mouseout="onDplOut($event)">
        <span>{{dplLable}}<i></i></span>
        <ul :style="show?'display:block':'display:none'">
            <li v-for="(item, index) in dataList" :key="index" @click="onLiClick(index, $event)">{{item[labelProperty]}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DropDownList",
    data(){
        return {
            activeIndex:0,
			show:false
        }
    },
    props:{
        dataList:{
            type:Array,
            default(){
                return [
                    {name: "选项一"},
                    {name: "选项二"}
                ]
            }
        },
        labelProperty:{
            type:String,
            default(){ return "name" }
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
    methods:{
        onDplOver(event){
            // let ul = event.currentTarget.childNodes[1];
            // ul.style.display = "block";
			this.show = true
        },
        onDplOut(event){
            // let ul = event.currentTarget.childNodes[1];
            // ul.style.display = "none";
				this.show = false
        },
        onLiClick(index){
            // let path = event.path || (event.composedPath && event.composedPath()) //兼容火狐和safari
            // path[1].style.display = "none";
            this.activeIndex = index;
            this.$emit("change", {
                index:index,
                value:this.dataList[index]
            })
        }
    },
    computed:{
        dplLable(){
            return this.dataList[this.activeIndex][this.labelProperty]
        }
    }
}
</script>


<style lang="scss">
    .zq-drop-list{
        display: inline-block;
        min-width: 100px;
        position: relative;
        span{
            display: block;
            height: 30px;
            line-height: 30px;
            background: #f1f1f1;
            font-size: 14px;
            text-align: center;
            color: #333333;
            border-radius: 4px;
            i{
				    width: 13px;
				    height: 14px;
				    transform: rotate(-90deg);
                background: url("../../static/down-arrow.png") no-repeat center center;
                margin-left: 6px;
                display: inline-block;
            }
        }
        ul{
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: solid 1px #f1f1f1;
            border-radius: 4px;
            overflow: hidden;
            li{
                list-style: none;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                border-bottom: solid 1px #f1f1f1;
                background: #ffffff;
            }
            li:last-child{
                border-bottom: none;
            }
            li:hover{
                background: #f6f6f6;
            }
        }
    }
</style>