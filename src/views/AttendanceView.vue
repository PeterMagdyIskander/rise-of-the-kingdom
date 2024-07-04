<template>
    <div class="attendance-container">
        ADDING ATTENDANCE
    </div>
</template>
<script>
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: "attendance-view",
    data() {
        return {

        }
    },
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {

        if (this.getUser !== null && this.getUser.role === "ADMIN")
            this.addAttendance(this.$route.params.uid)
        else
            console.error("Das")

    },
    methods: {
        ...mapActions(['login', 'setQuests']),
        selectUser(user) {
            this.selectedUser = user;
            this.selectedUserName = this.users.filter(user => user.id === this.selectedUser)[0].name;
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const userDoc = doc(userCollectionReference, this.selectedUser);
            onSnapshot(userDoc, snapshot => {
                this.selectedUserObject = { ...snapshot.data() };
                const teamCollectionReference = collection(firestore, 'teams');
                const myTeam = doc(teamCollectionReference, this.selectedUserObject.teamId)
                onSnapshot(myTeam, snapshot => {
                    this.myTeamData = { ...snapshot.data() };
                })
            })


        },
        addAttendance(uid) {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const userDoc = doc(userCollectionReference, uid);
            updateDoc(userDoc, {
                humanityPoints: increment(25),
            })
            alert("Attendance points reflected successfuly!")
        }

    }
}
</script>

<style lang="scss" scoped>
.attendance-container {
    text-align: center;
    padding: 50px;
}

.drop-down {
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 30px;

    &-item {
        width: 100%;
        padding: 5px;
        margin: 5px;
        font-size: 14px;
        font-family: 'ptmono';
    }
}
</style>