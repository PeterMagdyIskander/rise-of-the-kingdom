<template>
    <div>
        <div class="header-container">
            <p class="logo">Level Up</p>
            <p class="title">RISE OF THE KINGDOM</p>
        </div>
        <div class="home-container">
            <h1 class="profile-name">{{ `Hi ${getUser.name.split(" ")[0]}!` }}</h1>
            <div class="more-info">
                <div class="more-info-info">
                    <p class="title">Team's HP</p>
                    <p class="info">{{ myTeamData.gold }}</p>
                </div>
                <div class="more-info-separator"></div>
                <div class="more-info-info">
                    <p class="title">Your HP</p>
                    <p class="info">{{ getUser.gold }}</p>
                </div>
            </div>
            <div class="ship-container">
                <img class="planet-img" v-if="getUser.teamId === 'Dynamis'" src="@/assets/dynamis-planet-ship.svg"
                    alt="dynamis planet">
                <img class="planet-img" v-if="getUser.teamId === 'Lumos'" src="@/assets/lumos-planet-ship.svg"
                    alt="lumos planet">
                <img class="planet-img" v-if="getUser.teamId === 'Kalos'" src="@/assets/kalos-planet-ship.svg"
                    alt="kalos planet">
                <img class="planet-img" v-if="getUser.teamId === 'Astro'" src="@/assets/astro-planet-ship.svg"
                    alt="astro planet">
                <h1 class="planet-title" :class="getUser.teamId">{{ getUser.teamId }}</h1>
            </div>
            <div class="navigation-section">
                <div class="navigation-section-item" @click="navigateTo('/Battlefield')">
                    <img src="@/assets/attack-icon.svg" alt="attack-icon">

                </div>
                <div class="navigation-section-item" @click="navigateTo('/QuestCenter')">
                    <img src="@/assets/quest-center-icon.svg" alt="quest-center-icon">

                </div>
                <div class="navigation-section-item" @click="navigateTo('/MyQuest')">
                    <img src="@/assets/my-quest-icon.svg" alt="my-quest-icon">
                </div>
            </div>

            <img class="levelup-img" src="@/assets/levelup-icon.svg" alt="dynamis planet">
        </div>
    </div>
</template>

<script>
import AppHeader from '../Shared/AppHeader.vue';

import { collection, getFirestore, onSnapshot, doc } from 'firebase/firestore';
import { mapGetters } from 'vuex';
export default {
    name: "profile-page",
    components: { AppHeader },
    computed: mapGetters(['getUser']),
    data() {
        return {
            myTeamData: {},
        }
    },
    mounted() {
        const firestore = getFirestore();
        const teamCollectionReference = collection(firestore, 'teams');
        const myTeam = doc(teamCollectionReference, this.getUser.teamId)
        onSnapshot(myTeam, snapshot => {
            this.myTeamData = { ...snapshot.data() };
        })
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 150px;
    background-color: #0A6E78;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & .logo {
        font-family: 'pressstart2p';
        color: #F7C970;
        text-shadow: 1px 2px #C86730;
        font-size: 34px;
        margin: 0
    }

    & .title {
        font-family: 'pressstart2p';
        color: #F7C970;
        text-shadow: 1px 2px #C86730;
        font-size: 12px;

    }
}

.home-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-name {

    width: 80%;
    font-family: 'pressstart2p';
    font-size: 16px;
    color: #F5F5F5;
    margin: 30px auto 25px auto;
}

.more-info {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    background-color: #064349;
    border: 1px solid #F5F5F5;
    border-radius: 6px;
    z-index: 0;
    position: relative;
    margin-bottom: 30px;

    &-separator {
        z-index: 3;
        border-left: 1px solid #fff;
        height: 40px;
    }

    &-info {
        z-index: 3;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        text-align: center;

        & .title {
            font-family: 'ptmono';
            font-size: 14px;
            color: #E5E5E5;
        }

        & .info {
            font-family: 'pressstart2p';
            font-size: 17px;
            color: #E5E5E5;
        }
    }
}

.ship-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    background-color: #000000;
    border-radius: 12px;
    padding: 15px 0;
    margin-bottom: 45px;

    .planet-title {
        font-family: 'pressstart2p';

        &.Dynamis {
            color: #b56ba1;
            text-shadow: 0 3px #222951;
        }

        &.Lumos {
            color: #ffb11c;
            text-shadow: 3px 3px #e85629;
        }

        &.Kalos {
            color: #6aae64;
            text-shadow: 0 3px #125b85;
        }

        &.Astro {
            color: #327cc1;
            text-shadow: 0 3px #4a3584;
        }
    }
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

.levelup-img {
    width: 70px;
}
</style>