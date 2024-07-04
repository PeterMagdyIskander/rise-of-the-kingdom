<template>
    <div>
        <div class="header-container">
            <p class="logo">Level Up</p>
            <p class="title">My QR Code</p>
        </div>
        <div id="qrcode"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import QRCode from 'qrcode';
export default {
    name: "LoginPage",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        const url = `http://192.168.255.48:8080/attendance/${this.getUser.uid}`;
        const qrCodeContainer = document.getElementById('qrcode');

        QRCode.toCanvas(url, { errorCorrectionLevel: 'H' }, function (error, canvas) {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);
            console.log('QR code generated!');
        });
    }
};
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 150px;
    background-color: #162041;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;

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
#qrcode{
    text-align: center;
   padding-top: 150px;
}
</style>