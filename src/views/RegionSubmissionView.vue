<template>
    <div>
    </div>
</template>
<script>
import { collection, getFirestore, getDoc, doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: "region-submission-view",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        const uid = this.$route.path.split('/')[2]
        this.submitQuest(uid)
    },
    methods: {
        async submitQuest(uid) {
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
                    const teamDoc = doc(teamCollectionReference, user.teamId);

                    updateDoc(userDoc, {
                        assignedRegionId: "",
                    })
                    updateDoc(teamDoc, {
                        conqueredRegions: arrayUnion(user.assignedRegionId),
                    })
                    alert("Region conquered successfuly!")
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error(error);
            }
        }

    }
}
</script>

<style lang="scss" scoped></style>