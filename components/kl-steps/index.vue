<template>
    <div class="kl-steps flex-wrap">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Number,
            require: true,
        },
    },
    watch: {
        active() {
            this.InitData()
        },
    },
    mounted() {
        this.InitData()
    },
    methods: {
        InitData() {
            this.$nextTick(() => {
                let childrens = this.$slots.default
                for (let i = 0; i < childrens.length; i++) {
                    this.$slots.default[i].child.index = i + 1
                    this.$slots.default[i].child.activeIndex = this.active
                    this.$slots.default[i].child.maxIndex = childrens.length
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
	.kl-steps{
		padding: 0 0 0 20rpx;
		margin-top: 50rpx;
	}
</style>
