<template>
    <div class="info">
        <div class="title">
            <p class="main">{{ regionInfo.name }}</p>
            <div class="humanity-points">
                <img src="@/assets/humanityPoints-icon.svg" alt="humanity points icon">
                <p>{{ regionInfo.gold }}</p>
            </div>
        </div>
        <div v-if="getUser.assignedRegionId === ''">
            <div class="quest">
                <p class="quest-title">Quest</p>
                <p>{{ regionInfo.quest }}</p>
            </div>
            <div class="button-container">
                <button @click="accept">ENTER</button>
                <button class="reject" @click="decline">DISMISS</button>
            </div>
        </div>
        <div class="quest-submission" v-else-if="getUser.assignedRegionId === regionInfo.name">
            <div class="quest">
                <p class="quest-title">Quest</p>
                <p>{{ regionInfo.quest }}</p>
                <button class="done" @click="decline">Done</button>
            </div>
            <div id="qrcode"></div>
        </div>


    </div>
</template>
<script>

import { collection, doc, getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';
import { mapGetters, mapActions } from 'vuex';
import QRCode from 'qrcode';
export default {
    name: 'region-more-info',
    props: {
        regionInfo: {
            type: Object,
        }
    },
    data() {
        return {
            myTeamData: {},
        }
    },
    computed: mapGetters(['getUser', 'getTeamData']),
    methods: {
        decline() {
            this.$emit('close')
        },
        accept() {
            if (this.getTeamData.gold >= this.regionInfo.gold) {
                const firestore = getFirestore();
                const userCollectionReference = collection(firestore, 'users');
                const userDoc = doc(userCollectionReference, this.getUser.uid);
                updateDoc(userDoc, { assignedRegionId: this.regionInfo.name })
                alert("Land quest started successfuly!")
            } else {
                alert("Your team doesn't have enough humanity points!")
            }
        },
        generateQRCode() {
            const url = `secyouth.com/RegionSubmission/${this.getUser.uid}`;
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
        }
    },
    mounted() {
        if (this.getUser.assignedRegionId === this.regionInfo.name) {
            this.generateQRCode()
        }
    },
    updated() {
        if (this.getUser.assignedRegionId === this.regionInfo.name) {
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
    position: absolute;
    bottom: 0;
    border-radius: 5px 5px 0 0;
    border-top: 5px solid #fff;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;

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

        .reject {
            background-color: #1C464E;
            box-shadow: 0px -3px 6px #0000005C;
            border: 3px solid #FFFFFF;
            border-radius: 6px;

            font-family: 'pressstart2p';
            font-size: 13px;
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
    padding: 5px 10px;
    font-size: 16px;

    font-family: 'pressstart2p';
    margin-top: 10px;
}
</style>