<template>
    <div class="attack-container">

        <div class="planets-battlefield">
            <div id="NW" @click="handleClick('Astro')">
                <BaseContainer :teamId="'Astro'" :selected="selectedTeamId === 'Astro'"></BaseContainer>
            </div>
            <div id="NE" @click="handleClick('Kalos')">
                <BaseContainer :teamId="'Kalos'" :selected="selectedTeamId === 'Kalos'"></BaseContainer>
            </div>
            <div id="SW" @click="handleClick('Lumos')">
                <BaseContainer :teamId="'Lumos'" :selected="selectedTeamId === 'Lumos'"></BaseContainer>
            </div>
            <div id="SE" @click="handleClick('Dynamis')">
                <BaseContainer :teamId="'Dynamis'" :selected="selectedTeamId === 'Dynamis'"></BaseContainer>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import BaseContainer from '@/components/Feature/Base/BaseContainer.vue';

export default {
    name: "transfer-points-view",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        BaseContainer,
    },
    data() {
        return {
            allOtherTeams: [],
            enemyTeamData: {},
            myTeamData: {},
            isAttacker: true,
            selectedTeamId: "",
        }
    },
    created() {
    },
    mounted() {
        const firestore = getFirestore();
        const teamCollectionReference = collection(firestore, 'teams');
        onSnapshot(teamCollectionReference, snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.allOtherTeams = [...data.filter(team => team.id != this.getUser.teamId)]
        })
        const myTeam = doc(teamCollectionReference, this.getUser.teamId)
        onSnapshot(myTeam, snapshot => {
            this.myTeamData = { ...snapshot.data() };
        })

    }, methods: {
        handleClick(planetName) {
            if (planetName === this.getUser.teamId) {

                alert("You can't transfer points to your team!")
            } else {

                this.selectedTeamId = planetName;
            }

        },
    }
}
</script>
<style lang="scss" scoped>
.attack-container {
    height: 100%;
    width: 100%;
    position: relative;
}

.planets-battlefield {
    height: inherit;
    position: relative;
}

#NW {
    position: absolute;
    width: 50%;
    height: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#NE {
    position: absolute;
    width: 50%;
    height: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#SW {
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

#SE {
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#SE,
#SW {
    border-top: 1px solid #3E8898;
}

#NE,
#SE {
    border-left: 1px solid #3E8898;
}
</style>