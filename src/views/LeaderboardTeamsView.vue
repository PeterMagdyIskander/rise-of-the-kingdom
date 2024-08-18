<template>
    <div>
        <app-header></app-header>

        <div class="main">
            <h1>Leaderboard</h1>
            <div v-if="!isShowingGrace" class="button-container">
                <button @click="isShowingGrace = true">Show Grace Gold</button>
            </div>
            <div v-if="isShowingGrace" class="button-container">
                <button @click="calculateWinner()">Show Winner</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Gold</th>
                        <th v-if="isShowingGrace">Grace Gold</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(team, index) in leaderboard" :key="team.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ team.id }}</td>
                        <td>{{ team.gold }}</td>
                        <td v-if="isShowingGrace">{{ team.giveBackGold }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

import AppHeader from '@/components/Shared/AppHeader.vue';
export default {
    name: "leaderboard",
    components: {
        AppHeader,
    },
    data() {
        return {
            leaderboard: [],
            isShowingGrace: false,
        };
    },
    created() {
        const db = getFirestore();
        const usersCollection = collection(db, 'teams');
        const q = query(usersCollection, orderBy('gold', 'desc'));

        onSnapshot(q, (querySnapshot) => {
            const leaderboard = [];
            querySnapshot.forEach((doc) => {
                leaderboard.push({ id: doc.id, ...doc.data() });
            });
            this.leaderboard = leaderboard;
        });
    },
    methods: {
        calculateWinner() {
            this.leaderboard = [
                {
                    id: "Uchiha",
                    gold: 20946,
                    giveBackGold: 8098
                },
                {
                    id: "Uzumaki",
                    gold: 14924,
                    giveBackGold: 2207
                },
                {
                    id: "Aburame",
                    gold: 13763,
                    giveBackGold: 2229
                },
                {
                    id: "Akamichi",
                    gold: 8435,
                    giveBackGold: 550
                },
            ]
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    width: fit-content;
    margin: 0 auto;
    text-align: center;
}

table {
    border-collapse: separate;
    border-spacing: 25px;
    font-size: 36px;

    text-align: left;
}

.button-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    justify-content: center;

    button {
        padding: 15px;
        background-color: #3E8898;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #E5E5E5;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
        margin-bottom: 10px;
    }
}
</style>