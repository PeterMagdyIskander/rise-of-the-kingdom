<template>
    <div class="info">
        <div class="title">
            <p class="main">{{ regionInfo.name }} Land</p>
            <div class="humanity-points">
                <img src="@/assets/humanityPoints-icon.svg" alt="humanity points icon">
                <p>{{ regionInfo.gold }}</p>
            </div>
        </div>

        <div class="" v-if="getTeamData.conqueredRegions.includes(regionInfo.id)">
            <ConquererCard v-for="(team, index) in regionInfo.conquerer" :title="team" :order="index + 1">
            </ConquererCard>
        </div>
        <div v-else>
            <div class="quest" v-if="getUser.assignedRegionId !== regionInfo.id">
                <p class="quest-title">Quest</p>
                <p>{{ quests[getQuest(regionInfo.name, getUser.teamId)] }}</p>
            </div>
            <div class="button-container" v-if="getUser.assignedRegionId === '' && getUser.isTeamLead">
                <button @click="accept">ENTER</button>
            </div>

            <div class="quest-submission" v-else-if="getUser.assignedRegionId === regionInfo.id">
                <div class="quest">
                    <p class="quest-title">Quest</p>
                    <p>{{ quests[getQuest(regionInfo.name, getUser.teamId)] }}</p>
                </div>
                <div id="qrcode"></div>
            </div>
        </div>

        <button class="done" @click="decline">Close</button>
    </div>
</template>
<script>

import { collection, doc, getFirestore, updateDoc, arrayUnion, orderBy } from 'firebase/firestore';
import { mapGetters, mapActions } from 'vuex';
import QRCode from 'qrcode';
import ConquererCard from './ConquererCard.vue';
export default {
    name: 'region-more-info',
    components: {

        ConquererCard
    },
    props: {
        regionInfo: {
            type: Object,
        }
    },
    data() {
        return {
            myTeamData: {},
            quests: {
                q1: "Bible verses",
                q2: "Film Scene",
                q3: "Bracelet",
                q4: "Puzzle",
                q5: "Sketch",
                q6: "Volley with Leaders",
            }
        }
    },
    computed: mapGetters(['getUser', 'getTeamData']),
    methods: {

        ...mapActions(['updateUser']),
        decline() {
            this.$emit('close')
        },
        accept() {
            if (this.getUser.assignedRegionId != '')
                return alert("Another Region quest is assigned")
            if (this.getTeamData.humanityPoints >= this.regionInfo.gold) {
                const firestore = getFirestore();
                const userCollectionReference = collection(firestore, 'users');
                const userDoc = doc(userCollectionReference, this.getUser.uid);
                updateDoc(userDoc, { assignedRegionId: this.regionInfo.id })
                let updatedUser = this.getUser;
                updatedUser.assignedRegionId = this.regionInfo.id;
                this.updateUser(updatedUser);
                alert("Land quest started successfuly!")
            } else {
                alert("Your team doesn't have enough humanity points!")
            }
        },
        generateQRCode() {
            const url = `secyouth.com/#/RegionSubmission/${this.getUser.uid}`;
            const qrCodeContainer = document.getElementById('qrcode');

            QRCode.toCanvas(url, { errorCorrectionLevel: 'H' }, function (error, canvas) {
                if (error) console.error(error);
                if (qrCodeContainer.childNodes.length == 0) {
                    qrCodeContainer.appendChild(canvas);
                    canvas.style.width = "142px"
                    canvas.style.height = "142px"
                    console.log('QR code generated!');
                }
            });
        },
        getQuest(regionName, teamName) {
            if (regionName === "Love") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q1';
                    case 'Akamichi':
                        return 'q2';
                    case 'Uchiha':
                        return 'q3';
                    case 'Uzumaki':
                        return 'q5';
                }
            }
            if (regionName === "Kind") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q5';
                    case 'Akamichi':
                        return 'q3';
                    case 'Uchiha':
                        return 'q4';
                    case 'Uzumaki':
                        return 'q6';
                }
            }
            if (regionName === "Joy") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q2';
                    case 'Akamichi':
                        return 'q1';
                    case 'Uchiha':
                        return 'q6';
                    case 'Uzumaki':
                        return 'q4';
                }
            }
            if (regionName === "Patience") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q3';
                    case 'Akamichi':
                        return 'q6';
                    case 'Uchiha':
                        return 'q2';
                    case 'Uzumaki':
                        return 'q1';
                }
            }
            if (regionName === "Holy") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q6';
                    case 'Akamichi':
                        return 'q4';
                    case 'Uchiha':
                        return 'q5';
                    case 'Uzumaki':
                        return 'q2';
                }
            }
            if (regionName === "Peace") {
                switch (teamName) {
                    case 'Aburame':
                        return 'q4';
                    case 'Akamichi':
                        return 'q5';
                    case 'Uchiha':
                        return 'q1';
                    case 'Uzumaki':
                        return 'q3';
                }
            }
        }
    },
    mounted() {
        if (this.getUser.assignedRegionId === this.regionInfo.id&&!this.getTeamData.conqueredRegions.includes(this.regionInfo.id)) {
            this.generateQRCode()
        }
        
    },
    updated() {
        if (this.getUser.assignedRegionId === this.regionInfo.id&&!this.getTeamData.conqueredRegions.includes(this.regionInfo.id)) {
            this.generateQRCode()
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

.info {
    width: 90%;
    height: 233px;
    margin: 0 auto;
    background-image: radial-gradient(#A8A568 1px, transparent 0);
    background-size: 2em 2em;
    background-color: #1C464E;
    padding: 0 15px;
    position: fixed;
    bottom: 0;
    border-radius: 5px 5px 0 0;
    border-top: 5px solid #fff;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    z-index: 1000;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .main {
            font-family: 'pressstart2p';
        }

        .humanity-points {
            display: flex;
            align-items: center;
            column-gap: 5px;

            p {
                font-size: 23px;
            }
        }
    }

    .quest {
        &-title {
            font-weight: bold;
        }
    }

    .button-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 30px;
        margin-top: 25px;
        margin-bottom: 35px;

        button {
            width: 150px;
            padding: 15px;
            background-color: #3E8898;
            border-radius: 6px;
            border: 3px solid #E5E5E5;
            color: #E5E5E5;
            font-size: 13px;
            font-family: 'pressstart2p';
        }
    }
}

.quest-submission {
    display: flex;
    justify-content: space-between;
}

.done {
    background-color: #1C464E;
    box-shadow: 0px -3px 6px #0000005C;
    border: 3px solid #FFFFFF;
    color: #FFFFFF;
    border-radius: 6px;
    padding: 5px;
    font-size: 10px;

    font-family: 'pressstart2p';
    position: absolute;
    bottom: 5px;
    left: 5px;
}
</style>
