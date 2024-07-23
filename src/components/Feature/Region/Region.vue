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
        }">
            <div class="small-square-1" :style="{
                'background-color': colorRight,
                'filter': ' brightness(80%)',
            }">

            </div>
            <div class="small-square-2" :style="{
                'background-color': colorRight,
                'filter': ' brightness(80%)',
            }">

            </div>
            <div class="small-square-3" :style="{
                'background-color': colorRight,
                'filter': ' brightness(80%)',
            }">

            </div>


        </div>
        <div v-if="!hideLeft" class="square2" :style="hover ? {
            'background-color': colorLeft,
            'filter': ' brightness(100%)',
            'border-bottom': ' 2px solid #fff',
            'border-right': '2px solid #fff',
        } : {
            'background-color': colorLeft,
            'filter': ' brightness(65%)'
        }">
            <div class="small-square2-1" :style="{
                'background-color': colorLeft,
                'filter': ' brightness(80%)',
            }">

            </div>
            <div class="small-square2-2" :style="{
                'background-color': colorLeft,
                'filter': ' brightness(80%)',
            }">

            </div>
            <div class="small-square2-3" :style="{
                'background-color': colorLeft,
                'filter': ' brightness(80%)',
            }">

            </div>
        </div>
        <div v-if="!hideTop" class="square3" :style="hover ? {
            'background-color': colorTop,
            'filter': ' brightness(100%)',
            'border-bottom': ' 2px solid #fff',
            'border-left': '2px solid #fff',
        } : {
            'background-color': colorTop,
            'filter': ' brightness(65%)'
        }">
            <svg width="10" height="9" viewBox="0 0 10 9" :fill="colorTop" class="bush-1" :style="{
                top: `${rng()}px`,
                left: `${rng()}px`,
            }" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.76807 4.23999C8.43854 5.24116 7.30952 6.48382 6.44006 7.90298C5.31761 8.09061 4.16863 8.04603 3.06409 7.77199C2.63564 5.12057 1.73826 2.56667 0.414062 0.22998C1.64506 0.89398 2.78408 2.53598 3.62408 4.74098C3.69904 3.45674 4.19572 2.23313 5.03708 1.25998C4.76983 2.37816 4.66375 3.5288 4.72208 4.67699C5.31035 2.98263 6.43342 1.52541 7.92206 0.524979C6.60689 2.67394 5.66873 5.0319 5.14807 7.49698C6.51107 5.60098 8.20607 4.38399 9.76807 4.23999Z"
                    :fill="colorTop" />
            </svg>
            <svg width="10" height="9" viewBox="0 0 10 9" :fill="colorTop" class="bush-2" :style="{
                top: `${rng()}px`,
                left: `${rng()}px`,
            }" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.76807 4.23999C8.43854 5.24116 7.30952 6.48382 6.44006 7.90298C5.31761 8.09061 4.16863 8.04603 3.06409 7.77199C2.63564 5.12057 1.73826 2.56667 0.414062 0.22998C1.64506 0.89398 2.78408 2.53598 3.62408 4.74098C3.69904 3.45674 4.19572 2.23313 5.03708 1.25998C4.76983 2.37816 4.66375 3.5288 4.72208 4.67699C5.31035 2.98263 6.43342 1.52541 7.92206 0.524979C6.60689 2.67394 5.66873 5.0319 5.14807 7.49698C6.51107 5.60098 8.20607 4.38399 9.76807 4.23999Z"
                    :fill="colorTop" />
            </svg>
            <svg width="10" height="9" viewBox="0 0 10 9" :fill="colorTop" class="bush-3" :style="{
                top: `${rng()}px`,
                left: `${rng()}px`,
            }" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.76807 4.23999C8.43854 5.24116 7.30952 6.48382 6.44006 7.90298C5.31761 8.09061 4.16863 8.04603 3.06409 7.77199C2.63564 5.12057 1.73826 2.56667 0.414062 0.22998C1.64506 0.89398 2.78408 2.53598 3.62408 4.74098C3.69904 3.45674 4.19572 2.23313 5.03708 1.25998C4.76983 2.37816 4.66375 3.5288 4.72208 4.67699C5.31035 2.98263 6.43342 1.52541 7.92206 0.524979C6.60689 2.67394 5.66873 5.0319 5.14807 7.49698C6.51107 5.60098 8.20607 4.38399 9.76807 4.23999Z"
                    :fill="colorTop" />
            </svg>
           
           
        </div>
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
    methods: {
        selectRegion() {
            this.$emit('clickRegion', this.regionInfo)
        },
        rng() {
            return Math.floor(Math.random() * 41) + 10;
        },
    
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


.small-square-1 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 10px;
    left: 5px
}

.small-square-2 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 25px;
    left: 27px;
}

.small-square-3 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 45px;
    left: 37px;
}

.small-square2-1 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 10px;
    left: 5px
}

.small-square2-2 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 25px;
    left: 27px;
}

.small-square2-3 {
    width: 10px;
    height: 10px;
    transform: skew(180deg, 180deg);
    position: absolute;
    top: 45px;
    left: 37px;
}

.bush-1 {
    filter: brightness(65%);
    transform: rotate(180deg) skew(327deg);
    position: absolute;
    top: 50px;
    left: 56px;
}

.bush-2 {
    filter: brightness(65%);
    transform: rotate(180deg) skew(327deg);
    top: 0px;
    left: 56px;
}

.bush-3 {
    filter: brightness(65%);
    transform: rotate(180deg) skew(327deg);
    position: absolute;
    top: 42px;
}

.rotate {
    transform: rotate(229deg);
    position: absolute;
}
</style>