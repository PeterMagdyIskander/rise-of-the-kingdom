<template>
    <div class="battlefield">
        <app-header :title="'rise of the kingdom'" :subtitle="'Battlefield'"></app-header>
        <Map @selectRegion="select"></Map>
        <div class="navigation-section">
            <div class="navigation-section-item" @click="navigateTo('/')">
                <img src="@/assets/home-icon.svg" alt="attack-icon">

            </div>
            <div class="navigation-section-item" @click="navigateTo('/QuestCenter')">
                <img src="@/assets/quest-center-icon.svg" alt="quest-center-icon">

            </div>
            <div class="navigation-section-item" @click="navigateTo('/MyQuest')">
                <img src="@/assets/my-quest-icon.svg" alt="my-quest-icon">
            </div>
        </div>
        <img class="levelup-img" src="@/assets/levelup-icon.svg" alt="logo icon">
        <RegionMoreInfo v-if="regionSelected" :regionInfo="regionSelected" @close="regionSelected = null">
        </RegionMoreInfo>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/Shared/AppHeader.vue';
import Region from '@/components/Feature/Region/Region.vue'
import RegionMoreInfo from '@/components/Feature/Region/RegionMoreInfo.vue'
import Map from '@/components/Feature/Region/Map.vue'
export default {
    name: "battlefield-view",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        AppHeader,
        Region,
        RegionMoreInfo,
        Map
    },
    data() {
        return {
            regionSelected: null,
        }
    },
    mounted() { },
    methods: {
        select(regionInfo) {
            this.regionSelected = regionInfo
        }, navigateTo(to) {
            this.$router.push(to);
        }
    }
}
</script>
<style lang="scss" scoped>
.battlefield {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.navigation-section {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 25px;
    margin-bottom: 45px;

    &-item {
        width: 70px;
        height: 45px;
        border: 2px solid #F5F5F5;
        background-color: #3F8898;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.75rem;
    }
}
</style>