<template>
    <div class="attack-container">

        <div class="planets-battlefield">
            <div id="NW" @click="handleClick('Uchiha')">
                <BaseContainer :teamId="'Uchiha'" :selected="selectedTeamId === 'Uchiha'"></BaseContainer>
            </div>
            <div id="NE" @click="handleClick('Uzumaki')">
                <BaseContainer :teamId="'Uzumaki'" :selected="selectedTeamId === 'Uzumaki'"></BaseContainer>
            </div>
            <div id="SW" @click="handleClick('Akamichi')">
                <BaseContainer :teamId="'Akamichi'" :selected="selectedTeamId === 'Akamichi'"></BaseContainer>
            </div>
            <div id="SE" @click="handleClick('Aburame')">
                <BaseContainer :teamId="'Aburame'" :selected="selectedTeamId === 'Aburame'"></BaseContainer>
            </div>
        </div>

        <div class="button-container">
            <input type="number" :placeholder="`Your team has ${myTeamData.gold} gold`" :min="1" :max="myTeamData.gold"
                v-model="giveBackGold">
            <button @click="giveBack" :disabled="selectedTeamId === ''">Give Back</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment, serverTimestamp ,arrayUnion} from 'firebase/firestore';
import BaseContainer from '@/components/Feature/Base/BaseContainer.vue';

export default {
    name: "transfer-points-view",
    computed: {
        ...mapGetters(['getUser', 'getTeamData']),
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
            giveBackGold: '',
        }
    },
    created() {
    },
    mounted() {
        if (!this.correctTime()||!this.getUser.isTeamLead)
            this.$router.push("/");
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
        giveBack() {
            const firestore = getFirestore();
            const teamCollectionReference = collection(firestore, 'teams');
            const myTeamDoc = doc(teamCollectionReference, this.getUser.teamId);
            const selectedTeamDoc = doc(teamCollectionReference, this.selectedTeamId);

            if (this.giveBackGold >= 1 && this.giveBackGold <= this.myTeamData.gold) {
                if (this.giveBackGold >= (this.myTeamData.gold / 2)) {
                    updateDoc(myTeamDoc, {
                        giveBackGold: increment(this.giveBackGold),
                        gold: increment((this.giveBackGold * -1)),
                        showGrace: true,
                    })
                    updateDoc(selectedTeamDoc, {
                        gold: increment(this.giveBackGold),
                    })
                    alert("Lost Grace Discovereed!")
                } else {
                    updateDoc(myTeamDoc, {
                        giveBackGold: increment(this.giveBackGold),
                        gold: increment(this.giveBackGold * -1),
                    })
                    updateDoc(selectedTeamDoc, {
                        gold: increment(this.giveBackGold),
                    })
                    alert("Gave Back Successfuly!")
                }
            }
        },
        correctTime() {
            const date = new Date();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            return hour === 21 && minutes <= 30;
        }
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
    background-color: #000000;
    position: absolute;
    width: 50%;
    height: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-top: 3px solid #0A6E78;
    border-left: 3px solid #0A6E78;
    border-radius: 12px 0 0 0;
}

#NE {
    background-color: #000000;
    position: absolute;
    width: 50%;
    height: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-top: 3px solid #0A6E78;
    border-right: 3px solid #0A6E78;
    border-radius: 0 12px 0 0;

}

#SW {
    background-color: #000000;
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-bottom: 3px solid #0A6E78;
    border-left: 3px solid #0A6E78;
    border-radius: 0 0 0 12px;
}

#SE {
    background-color: #000000;
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-bottom: 3px solid #0A6E78;
    border-right: 3px solid #0A6E78;
    border-radius: 0 0 12px 0;

}

#SE,
#SW {
    border-top: 1px solid #3E8898;
}

#NE,
#SE {
    border-left: 1px solid #3E8898;
}

.button-container {
    position: absolute;
    bottom: -60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    justify-content: center;

    input {
        height: 45px;
        width: 80%;
        background-color: #E5E5E5;
        border-radius: 6px;
        border: 1px solid #3E8898;
        text-align: center;
    }

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