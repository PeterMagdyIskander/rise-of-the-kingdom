<template>
    <div class="base-container" :class="{ selected: selected }">
        <img class="planet-img" v-if="teamId === 'Aburame'" src="@/assets/Aburame-planet-ship.svg" alt="Aburame planet">
        <img class="planet-img" v-if="teamId === 'Akamichi'" src="@/assets/Akamichi-planet-ship.svg"
            alt="Akamichi planet">
        <img class="planet-img" v-if="teamId === 'Uzumaki'" src="@/assets/Uzumaki-planet-ship.svg" alt="Uzumaki planet">
        <img class="planet-img" v-if="teamId === 'Uchiha'" src="@/assets/Uchiha-planet-ship.svg" alt="Uchiha planet">
        <h4 class="planet-title" :class="teamId">{{ teamId }}</h4>
        <div class="health-section">
            <div class="health-section-container" :style="{
                'border': `2px solid ${getColor()}`,
                'background-color': getBEColor(),
            }">
                <div class="health-section-container-health" :style="{
                    width: (myTeamData?.conqueredRegions.length / 6) * 100 + '%',
                    'border': `2px solid ${getColor()}`,
                    'background-color': getColor(),
                }">
                </div>
            </div>
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
            myTeamData: { conqueredRegions: 0 }
        }
    },
    created() {
        const firestore = getFirestore();
        const teamCollectionReference = collection(firestore, 'teams');
        const myTeam = doc(teamCollectionReference, this.teamId)
        onSnapshot(myTeam, snapshot => {
            this.myTeamData = { ...snapshot.data() };
        })
    },
    methods: {
        getColor() {
            switch (this.teamId) {
                case 'Uzumaki':
                    return '#B62E4D'
                case 'Akamichi':
                    return '#FEC802'
                case 'Aburame':
                    return '#BC2FFF'
                case 'Uchiha':
                    return '#56E0FF'
            }
        },
        getBEColor() {
            switch (this.teamId) {
                case 'Uzumaki':
                    return '#44111C'
                case 'Akamichi':
                    return '#5F4B02'
                case 'Aburame':
                    return '#4C1866'
                case 'Uchiha':
                    return '#162041'
            }
        }, navigateTo(to) {
            this.$router.push(to);
        }
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

    .planet-img {
        width: 150px;
        height: 150px;
    }
}

.planet-title {
    font-family: 'pressstart2p';

    &.Aburame {
        color: #BC2FFF;
        text-shadow: 0 3px #4C1866;
    }

    &.Akamichi {
        color: #FEC802;
        text-shadow: 3px 3px #5F4B02;
    }

    &.Uzumaki {
        color: #B62E4D;
        text-shadow: 0 3px #44111C;
    }

    &.Uchiha {
        color: #56E0FF;
        text-shadow: 0 3px #162041;
    }
}

.selected {
    border: 2px solid #E5E5E5;
    border-radius: 6px;
}

.health-section {
    width: 80%;

    &-container {
        width: 100%;
        height: 30px;
        border-radius: 6px;
        padding: 2px;
        margin: 15px auto;

        &-health {
            height: 100%;
            border-radius: 6px;
        }
    }
}
</style>