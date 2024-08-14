<template>
    <div>
        <button @click="submitQuest()" :disabled="pointsReflectedSuccessfuly">
            {{ pointsReflectedSuccessfuly ? "SUCCESS" : "REFRESH" }}
        </button>
    </div>
</template>
<script>
import { collection, getFirestore, getDoc, doc, updateDoc, increment } from 'firebase/firestore';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: "quest-submission-view",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        this.submitQuest()
    },

    data() {
        return {
            pointsReflectedSuccessfuly: false
        }
    },
    methods: {
        async submitQuest() {
            const uid = this.$route.path.split('/')[2]
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const teamCollectionReference = collection(firestore, 'teams');
            const userDoc = doc(userCollectionReference, uid);

            try {
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    let user = {
                        ...data
                    }
                    console.log(user)
                    let quest = this.getQuests.filter(quest => quest.id === user.assignedQuestId)[0];
                    const teamDoc = doc(teamCollectionReference, user.teamId);

                    updateDoc(userDoc, {
                        assignedQuestId: "",
                        humanityPoints: increment(quest.reward),
                    })
                    updateDoc(teamDoc, {
                        humanityPoints: increment(quest.reward),
                    })
                    this.pointsReflectedSuccessfuly = true;

                    alert("Quest points reflected successfuly!")
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                alert("ERROR DATA NOT REFLECTED")
                console.error(error);
            }
        }

    }
}
</script>

<style lang="scss" scoped>
div {
    text-align: center;
    padding: 250px 0;

    button {
        all: unset;
        font-family: 'pressstart2p';
        color: #f4ee80;
        font-size: 3rem;
        text-shadow: 0 5px #a14759;
    }
}</style>