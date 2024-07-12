<template>
    <div class="map">
            <region :color-left="'#43260f'" :color-right="'#5d3618'" :color-top="'#7c502b'" class="love"></region>
            <region :color-left="'#422a2a'" :color-right="'#523132'" :color-top="'#633c3d'" class="mercy"></region>
            <region :color-left="'#192a34'" :color-right="'#253c4a'" :color-top="'#3d5a6c'" class="compassion"></region>
            <region :color-left="'#34213a'" :color-right="'#492f51'" :color-top="'#60406b'" class="peace"></region>
            <region :color-left="'#3b3c22'" :color-right="'#5b5d35'" :color-top="'#686d44'" class="holy"></region>
            <region :color-left="'#233c37'" :color-right="'#2d5149'" :color-top="'#3b6d62'" class="joy"></region>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';

import Region from '@/components/Shared/Region.vue'
export default {
    name: "map",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        Region
    },
    data() {
        return {
        }
    },
    mounted() { },
    methods: {}
}
</script>

<style lang="scss" scoped>
.map {
    position: relative;

    .love {
        position: absolute;
    top: 140px;
    left: 38px;
    }

    .mercy {
        position: absolute;
    top: 155px;
    left: 194px;
    }

    .compassion {
        position: absolute;
    top: 254px;
    left: 224px;
    }

    .peace {
        position: absolute;
    top: 291px;
    left: 102px;
    }

    .holy {
        position: absolute;
    top: 427px;
    left: 15px;
    }

    .joy {
        position: absolute;
    top: 419px;
    left: 190px;
    }
}
</style>