<template>
    <div class="map">
        <region :color-left="'#43260f'" :color-right="'#5d3618'" :color-top="'#7c502b'" class="love"
            :region-info="regions[0]" @clickRegion="selectRegion"></region>
        <region :color-left="'#422a2a'" :color-right="'#523132'" :color-top="'#633c3d'" class="mercy"
            :region-info="regions[1]" @clickRegion="selectRegion"></region>
        <region :color-left="'#192a34'" :color-right="'#253c4a'" :color-top="'#3d5a6c'" class="compassion"
            :region-info="regions[2]" @clickRegion="selectRegion"></region>
        <region :color-left="'#34213a'" :color-right="'#492f51'" :color-top="'#60406b'" class="peace"
            :region-info="regions[3]" @clickRegion="selectRegion"></region>
        <region :color-left="'#3b3c22'" :color-right="'#5b5d35'" :color-top="'#686d44'" class="holy"
            :region-info="regions[4]" @clickRegion="selectRegion"></region>
        <region :color-left="'#233c37'" :color-right="'#2d5149'" :color-top="'#3b6d62'" class="joy"
            :region-info="regions[5]" @clickRegion="selectRegion"></region>
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
            regions: [
                {
                    "name": "Aria",
                    "humanityPoints": 85,
                    "quest": "Rescue the Lost Villagers"
                },
                {
                    "name": "Bryn",
                    "humanityPoints": 92,
                    "quest": "Retrieve the Sacred Artifact"
                },
                {
                    "name": "Cassian",
                    "humanityPoints": 78,
                    "quest": "Defeat the Shadow Beast"
                },
                {
                    "name": "Dara",
                    "humanityPoints": 95,
                    "quest": "Protect the Enchanted Forest"
                },
                {
                    "name": "Elys",
                    "humanityPoints": 88,
                    "quest": "Find the Ancient Library"
                },
                {
                    "name": "Finn",
                    "humanityPoints": 83,
                    "quest": "Unite the Warring Clans"
                },
                {
                    "name": "Galen",
                    "humanityPoints": 90,
                    "quest": "Cure the Plague"
                }
            ]
        }
    },
    mounted() { },
    methods: {
        selectRegion(region) {
            this.$emit('selectRegion', region)
        }
    }
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
        top: 398px;
        left: 174px;
    }
}
</style>