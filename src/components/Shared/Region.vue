<template>
    <div class="mainDiv" @mouseover="hover = true" @mouseleave="hover = false" @click="selectRegion">
        <div v-if="!hideRight" class="square" :style="hover ? {
            'background-color': colorRight,
            'filter': ' brightness(100%)',
            'border-bottom': ' 2px solid #fff',
            'border-left': '2px solid #fff',
        } : {
            'background-color': colorRight,
            'filter': ' brightness(65%)'
        }"></div>
        <div v-if="!hideLeft" class="square2" :style="hover ? {
            'background-color': colorLeft,
            'filter': ' brightness(100%)',
            'border-bottom': ' 2px solid #fff',
            'border-right': '2px solid #fff',
        } : {
            'background-color': colorLeft,
            'filter': ' brightness(65%)'
        }"></div>
        <div v-if="!hideTop" class="square3" :style="hover ? {
            'background-color': colorTop,
            'filter': ' brightness(100%)',
            'border-bottom': ' 2px solid #fff',
            'border-left': '2px solid #fff',
        } : {
            'background-color': colorTop,
            'filter': ' brightness(65%)'
        }"></div>
    </div>
</template>

<script>
export default {
    name: 'region',
    data() {
        return {
            hover: false
        }
    },
    props: {
        hideTop: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideLeft: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideRight: {
            type: Boolean,
            required: false,
            default: false,
        },
        colorTop: {
            type: String,
            required: true,
            default: true,
        },
        colorLeft: {
            type: String,
            required: true,
            default: true,
        },
        colorRight: {
            type: String,
            required: true,
            default: true,
        },
        regionInfo: {
            type: Object,
        }
    },
    methods:{
        selectRegion(){
            this.$emit('clickRegion',this.regionInfo)
        }
    }
}
</script>

<style lang="scss" scoped>
.mainDiv {
    position: relative;
    width: 103px;
    height: 95px;
}

.square {
    width: 60px;
    height: 70px;
    background: #916647;
    transform: skew(180deg, 210deg);
    position: absolute;
    top: 4px;
    left: 15px;

}

.square2 {
    width: 60px;
    height: 70px;
    background: #6d4e33;
    transform: skew(180deg, 150deg);
    position: absolute;
    left: 75px;
    top: 4px;
}

.square3 {
    width: 70px;
    height: 60px;
    background: #d4da6c;
    transform: rotate(150deg) translate(-40px, -16px) skew(30deg, 0deg);
    position: absolute;
    left: -3px;
    top: -36px;
}
</style>