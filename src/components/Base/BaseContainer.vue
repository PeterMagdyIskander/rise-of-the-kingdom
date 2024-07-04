<template>
    <div class="base-container" :class="{ selected: selected }">
        <img class="planet-img" v-if="teamId === 'Dynamis'" src="@/assets/dynamis-planet-small.svg" alt="dynamis planet">
        <img class="planet-img" v-if="teamId === 'Lumos'" src="@/assets/lumos-planet-small.svg" alt="lumos planet">
        <img class="planet-img" v-if="teamId === 'Kalos'" src="@/assets/kalos-planet-small.svg" alt="kalos planet">
        <img class="planet-img" v-if="teamId === 'Astro'" src="@/assets/astro-planet-small.svg" alt="astro planet">
        <h4 class="planet-title" :class="teamId">{{ teamId }}</h4>
        <div class="health-section">
            <div class="health-section-container">
                <div class="health-section-container-health"
                    :style="{ width: (myTeamData.health / myTeamData.maxHealth) * 100 + '%' }">
                </div>
            </div>
            <p>{{ Math.ceil(myTeamData.health) + " / " + Math.ceil(myTeamData.maxHealth) }}</p>
            <p><span>✋</span> {{ Math.ceil(myTeamData.dmgBlock) }}</p>
             </div>
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
}

.planet-title {
    margin-top: 12px;
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

.health-section {
    &-container {
        width: 90%;
        height: 15px;
        border: 2px solid #3F8898;
        border-radius: 6px;
        padding: 2px;
        margin: 15px auto;

        &-health {
            height: 100%;
            background-color: #3F8898;
            border: 2px solid #3F8898;
            border-radius: 6px;
        }
    }

    p {
        font-family: 'pressstart2p';
        font-size: 11px;

        span {
            font-size: 18px;
        }
    }
}
.selected{
    background-color: #162041;
    border: 1px solid #E5E5E5;
    border-radius: 6px;
}
</style>