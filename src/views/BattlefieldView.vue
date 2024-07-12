<template>
    <div class="battlefield">
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Battlefield'"></app-header>
        <Map></Map>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';
import Region from '@/components/Shared/Region.vue'
import Map from '@/components/Feature/Map.vue'
export default {
    name: "battlefield-view",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        AppHeader,
        Region,
        Map
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

</style>