<template>
    <div class="base-container" :class="{ selected: selected }">
        <img class="planet-img" v-if="teamId === 'Dynamis'" src="@/assets/dynamis-planet-ship.svg"
            alt="dynamis planet">
        <img class="planet-img" v-if="teamId === 'Lumos'" src="@/assets/lumos-planet-ship.svg" alt="lumos planet">
        <img class="planet-img" v-if="teamId === 'Kalos'" src="@/assets/kalos-planet-ship.svg" alt="kalos planet">
        <img class="planet-img" v-if="teamId === 'Astro'" src="@/assets/astro-planet-ship.svg" alt="astro planet">
        <h4 class="planet-title" :class="teamId">{{ teamId }}</h4>
    </div>
</template>

<script>

import { collection, getFirestore, onSnapshot, doc } from 'firebase/firestore';
export default {
    name: "base-container",
    props: {
        teamId: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            required: true,
        },

    }, data() {
        return {
            myTeamData: {}
        }
    },
    mounted() {
        const firestore = getFirestore();
        const teamCollectionReference = collection(firestore, 'teams');
        const myTeam = doc(teamCollectionReference, this.teamId)
        onSnapshot(myTeam, snapshot => {
            this.myTeamData = { ...snapshot.data() };
        })
    }
}
</script>

<style lang="scss" scoped>
p {
    padding: 0;
    margin: 2px;
    text-align: center;
}

.base-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .planet-img{
        width: 150px;
    }
}

.planet-title {
        font-family: 'pressstart2p';

        &.Dynamis {
            color: #BC2FFF;
            text-shadow: 0 3px #4C1866;
        }

        &.Lumos {
            color: #FEC802;
            text-shadow: 3px 3px #5F4B02;
        }

        &.Kalos {
            color: #B62E4D;
            text-shadow: 0 3px #44111C;
        }

        &.Astro {
            color: #56E0FF;
            text-shadow: 0 3px #162041;
        }
    }

.selected {
    background-color: #162041;
    border: 1px solid #E5E5E5;
    border-radius: 6px;
}
</style>