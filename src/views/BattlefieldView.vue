<template>
    <div class="battlefield">
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Battlefield'"></app-header>
        <Map @selectRegion="select"></Map>
        <RegionMoreInfo v-if="regionSelected" :regionInfo="regionSelected"></RegionMoreInfo>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/Shared/AppHeader.vue';
import Region from '@/components/Shared/Region.vue'
import RegionMoreInfo from '@/components/Shared/RegionMoreInfo.vue'
import Map from '@/components/Feature/Map.vue'
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
        select(regionInfo){
            this.regionSelected=regionInfo
        }
    }
}
</script>
<style lang="scss" scoped>
.battlefield{
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
</style>