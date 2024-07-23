<template>
    <div class="map">
        <div class="hp-container">
            <div class="hp-circle">
                <svg width="30" height="20" viewBox="0 0 25 20" fill="#042226" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M18.25 12.2L19.792 10.659C20.236 10.2296 20.8311 9.99193 21.4488 9.99713C22.0665 10.0023 22.6574 10.25 23.0941 10.6868C23.5309 11.1236 23.7786 11.7145 23.7838 12.3322C23.789 12.9499 23.5513 13.5449 23.122 13.989L18.251 18.86L13.379 13.988C12.9373 13.5463 12.6891 12.9472 12.6891 12.3225C12.6891 11.6978 12.9373 11.0987 13.379 10.657C13.8207 10.2153 14.4198 9.9671 15.0445 9.9671C15.6691 9.9671 16.2683 10.2153 16.71 10.657L18.25 12.2ZM21.25 11.06C21.1643 11.0527 21.0793 11.0797 21.0135 11.1351C20.9478 11.1905 20.9068 11.2698 20.8995 11.3555C20.8922 11.4411 20.9192 11.5262 20.9746 11.5919C21.0301 11.6577 21.1093 11.6987 21.195 11.706C21.3152 11.716 21.4315 11.7535 21.5349 11.8157C21.6382 11.8779 21.7258 11.9631 21.7909 12.0647C21.856 12.1663 21.8968 12.2815 21.9102 12.4014C21.9235 12.5213 21.9091 12.6426 21.868 12.756C21.8575 12.7988 21.8559 12.8432 21.8633 12.8867C21.8706 12.9301 21.8866 12.9715 21.9105 13.0085C21.9344 13.0455 21.9655 13.0773 22.0021 13.1018C22.0387 13.1264 22.0799 13.1432 22.1231 13.1513C22.1664 13.1594 22.2109 13.1586 22.2539 13.1489C22.2968 13.1393 22.3374 13.121 22.373 13.0951C22.4087 13.0692 22.4386 13.0364 22.4612 12.9985C22.4837 12.9607 22.4983 12.9187 22.504 12.875C22.5674 12.672 22.5837 12.4573 22.5517 12.2471C22.5198 12.0369 22.4404 11.8367 22.3195 11.6617C22.1986 11.4868 22.0395 11.3417 21.8542 11.2374C21.6688 11.1332 21.4622 11.0725 21.25 11.06Z"
                        fill="#042226" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.98298 1.509C1.50485 1.98705 1.12557 2.5546 0.866806 3.17924C0.608039 3.80389 0.474854 4.47339 0.474854 5.14951C0.474854 5.82563 0.608039 6.49512 0.866806 7.11977C1.12557 7.74441 1.50485 8.31196 1.98298 8.79001L12.632 19.439L15.271 16.801L12.918 14.448C12.3547 13.8848 12.0381 13.1209 12.038 12.3244C12.038 11.5278 12.3543 10.7638 12.9175 10.2005C13.4807 9.63718 14.2446 9.32067 15.0411 9.32057C15.8377 9.32048 16.6017 9.63681 17.165 10.2L18.248 11.283L19.331 10.201C19.7435 9.78858 20.2672 9.50514 20.8381 9.38528C21.409 9.26542 22.0024 9.31432 22.546 9.526L23.282 8.79001C24.2335 7.82157 24.7641 6.51649 24.7582 5.1588C24.7523 3.80111 24.2103 2.50071 23.2504 1.5406C22.2904 0.580499 20.9901 0.0384087 19.6324 0.0323029C18.2747 0.026197 16.9696 0.556564 16.001 1.508L12.632 4.877L9.26198 1.508C8.78417 1.02981 8.21681 0.650477 7.59232 0.391663C6.96784 0.132848 6.29848 -0.000366211 5.62248 -0.000366211C4.94649 -0.000366211 4.27712 0.132848 3.65263 0.391663C3.02815 0.650477 2.46079 1.02981 1.98298 1.508V1.509ZM6.73298 2.509C6.72098 2.509 2.63298 2.221 2.85098 6.368C2.85536 6.45419 2.82531 6.5386 2.76746 6.60265C2.7096 6.66669 2.62868 6.70513 2.54248 6.7095C2.45629 6.71388 2.37188 6.68383 2.30784 6.62598C2.24379 6.56812 2.20536 6.4872 2.20098 6.401C1.94798 1.526 6.75298 1.863 6.76698 1.864C6.80933 1.86649 6.85077 1.87732 6.88895 1.89583C6.92712 1.91434 6.96127 1.94018 6.98946 1.97189C7.01764 2.0036 7.0393 2.04056 7.0532 2.08064C7.0671 2.12073 7.07298 2.16315 7.07048 2.20551C7.06799 2.24786 7.05717 2.2893 7.03866 2.32747C7.02015 2.36564 6.9943 2.3998 6.96259 2.42798C6.93087 2.45616 6.89393 2.47783 6.85384 2.49173C6.81376 2.50563 6.77133 2.5115 6.72898 2.509H6.73298Z"
                        fill="#042226" />
                </svg>

            </div>
            <div class="hp-count">{{ getTeamData?.gold }}</div>
        </div>
        <region v-for="region in regions" :key="region.name" :color-left="region.colorLeft"
            :color-right="region.colorRight" :color-top="region.colorTop" :class="region.name.toLowerCase()"
            :region-info="region" @clickRegion="selectRegion"></region>

    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';

import Region from '@/components/Feature/Region/Region.vue'
export default {
    name: "map",
    computed: {
        ...mapGetters(['getUser', 'getTeamData']),
    },
    components: {
        Region
    },
    data() {
        return {
            regions: []
        }
    },
    mounted() {
        //              USE THIS TO UPLOAD REGIONS
        // const db = getFirestore();
        // const batch = writeBatch(db);
        // const regionsRef = collection(db, "regions");
        // this.regions.forEach(item => {
        //     const docRef = doc(regionsRef)
        //     batch.set(docRef, item);
        // });
        // await batch.commit();

        const firestore = getFirestore();
        const questsCollectionReference = collection(firestore, 'regions');
        onSnapshot(questsCollectionReference, snapshot => {
            this.regions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        })
    },
    methods: {
        selectRegion(region) {
            if (this.getUser.assignedRegionId === region.id || this.getUser.assignedRegionId === '')
                this.$emit('selectRegion', region)

        },
    }
}
</script>

<style lang="scss" scoped>
.map {
    position: relative;
    width: 80%;
    height: 60%;
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .love {
        position: absolute;
        top: 100px;
        left: 0px;
    }

    .mercy {
        position: absolute;
        top: 106px;
        left: 110px;
    }

    .compassion {
        position: absolute;
        top: 167px;
        left: 190px;
    }

    .peace {
        position: absolute;
        top: 193px;
        left: 74px;
    }

    .holy {
        position: absolute;
        top: 290px;
        left: 13px;
    }

    .joy {
        position: absolute;
        top: 265px;
        left: 127px;
    }
}

.hp-container {
    display: flex;
    align-items: center;
    height: 48px;
    position: relative;

    .hp-circle {
        width: 48px;
        height: 48px;
        background-color: #E6E6E6;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -37px;
        z-index: 2;
    }

    .hp-count {
        width: 120px;
        border: 2px solid #E6E6E6;
        border-radius: 6px;
        background-color: #1C464E;
        padding: 2px 15px;
        z-index: 1;
        font-family: 'ptmono';
        font-size: 19px;
    }

    img {
        width: 30px;
        height: 30px;
    }
}
</style>