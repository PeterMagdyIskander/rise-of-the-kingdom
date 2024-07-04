<template>
    <div class="attack-container">
        <!-- {{ getUser }}
        <div class="team-container" v-for="team in allOtherTeams" :key="team.id" @click="attackTeam(team.id)">
            <h1>{{ team }}</h1>
        </div> -->
        <div class="header-container">
            <p class="logo">Level Up</p>
            <p class="title">Battlefield</p>
        </div>
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
        <skills @dealPoints="dealPoints"></skills>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import BaseContainer from '@/components/Base/BaseContainer.vue';
import skills from '@/components/Skills/SkillsContainer.vue';

export default {
    name: "attack-view",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        BaseContainer,
        skills,
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
        this.isAttacker = this.getUser.role.toUpperCase() === "ATTACKER";
        if (this.isAttacker) {

            this.selectedTeamId = "";
        } else {
            this.selectedTeamId = this.getUser.teamId;
        }
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
            if (this.getUser.role.toUpperCase() === "ATTACKER") {
                if (planetName != this.getUser.teamId) {
                    this.selectedTeamId = planetName;
                    const firestore = getFirestore();
                    const teamCollectionReference = collection(firestore, 'teams');
                    const enemyTeam = doc(teamCollectionReference, planetName)
                    onSnapshot(enemyTeam, snapshot => {
                        this.enemyTeamData = { ...snapshot.data() };
                    })
                } else {
                    alert("You can't attack your base!")
                }
            } else {
                if (planetName === this.getUser.teamId) {
                    this.selectedTeamId = planetName;
                } else {
                    alert("You can't defend an enemy team's base!")
                }
            }

        },
        addHours(date, hours) {
            date.setHours(date.getHours() + hours);

            return date;
        },
        dealPoints(points, cooldown, order) {
            if (this.selectedTeamId !== "" || order == 2 || order == 3) {
                const firestore = getFirestore();
                const teamCollectionReference = collection(firestore, 'teams');
                const myTeamDoc = doc(teamCollectionReference, this.getUser.teamId)
                const userCollectionReference = collection(firestore, 'users');
                const userDoc = doc(userCollectionReference, this.getUser.uid)

                let dateNow = new Date();
                let userTimeStamp = this.getUser.timeStamp[order - 1];
                let newTimeStamp=this.getUser.timeStamp;
                if (dateNow >= this.addHours(new Date(userTimeStamp), cooldown)) {
                    switch (this.getUser.role.toUpperCase()) {
                        case "ATTACKER":
                            switch (order) {
                                case 1:
                                case 3:
                                    const enemyTeamDoc = doc(teamCollectionReference, this.selectedTeamId)
                                    let myDmg = points * this.myTeamData.dmgMultiplier * this.enemyTeamData.dmgReduction * this.getUser.attackAmp;
                                    let block = this.enemyTeamData.dmgBlock;

                                    if (myDmg > block) {
                                        myDmg = (myDmg - block) * -1;
                                        block *= -1;
                                    } else if (myDmg < block) {
                                        block = myDmg * -1;
                                        myDmg = 0;
                                    } else {
                                        block = myDmg * -1
                                        myDmg = 0;
                                    }
                                    updateDoc(enemyTeamDoc, {
                                        health: increment(myDmg),
                                        dmgBlock: increment(block),
                                    })
                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                                case 2:
                                    updateDoc(myTeamDoc, {
                                        dmgMultiplier: increment(0.1),
                                    })
                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                            }
                            break;
                        case "HEALER":
                            switch (order) {
                                case 1:
                                case 3:
                                    if (this.myTeamData.maxHealth <= this.myTeamData.health+(points * this.getUser.healAmp* this.myTeamData.healMultiplier)) {
                                        updateDoc(myTeamDoc, {
                                            health: this.myTeamData.health+(points * this.getUser.healAmp* this.myTeamData.healMultiplier),
                                            maxHealth: this.myTeamData.health+(points * this.getUser.healAmp* this.myTeamData.healMultiplier),
                                        })
                                    } else {
                                        updateDoc(myTeamDoc, {
                                            health: increment(points * this.getUser.healAmp* this.myTeamData.healMultiplier),
                                        })
                                    }

                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                                case 2:
                                    updateDoc(myTeamDoc, {
                                        healMultiplier: increment(0.1),
                                    })
                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                            }
                            break;
                        case "DEFENDER":
                            switch (order) {
                                case 1:
                                case 3:
                                    updateDoc(myTeamDoc, {
                                        dmgBlock: increment(points * this.getUser.blockAmp* this.myTeamData.blockMultiplier),
                                    })
                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                                case 2:
                                    updateDoc(myTeamDoc, {
                                        blockMultiplier: increment(0.1),
                                    })
                                    
                                    newTimeStamp[order - 1] = new Date().toISOString();
                                    updateDoc(userDoc, { timeStamp: newTimeStamp })
                                    break;
                            }
                            break;
                    }
                } else {
                    alert("not yet")
                }
            } else {
                alert("please select a team first")
            }
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

.header-container {
    width: 100%;
    height: 150px;
    background-color: #162041;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
    margin-bottom: 20px;

    & .logo {
        font-family: 'pressstart2p';
        color: #f4ee80;
        text-shadow: 1px 2px #a14759;
        font-size: 14px;
    }

    & .title {
        font-family: 'pressstart2p';
        font-size: 18px;

    }
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