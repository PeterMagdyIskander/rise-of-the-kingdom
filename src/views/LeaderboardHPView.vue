<template>
    <div>
        <app-header></app-header>

        <div class="main">
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User ID</th>
                        <th>HP</th>
                        <th>Team </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in leaderboard" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.humanityPoints }}</td>
                        <td>{{ user.teamId }}</td>
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
            leaderboard: []
        };
    },
    created() {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('humanityPoints', 'desc'));

        onSnapshot(q, (querySnapshot) => {
            const leaderboard = [];
            querySnapshot.forEach((doc) => {
                leaderboard.push({ id: doc.id, ...doc.data() });
            });
            this.leaderboard = leaderboard.filter(e=>e.isAdmin===false);
        });
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
    border-spacing: 10px;
    font-size: 36px;
    
    text-align: left;
}
</style>