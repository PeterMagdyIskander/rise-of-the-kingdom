<template>
    <div class="card">
        <div class="card-order">

            <p class="title">{{ order }}</p>
            <img class="planet-img" v-if="title === 'Dynamis'" src="@/assets/dynamis-planet-ship-small.svg"
                alt="dynamis planet">
            <img class="planet-img" v-if="title === 'Lumos'" src="@/assets/lumos-planet-ship-small.svg"
                alt="lumos planet">
            <img class="planet-img" v-if="title === 'Kalos'" src="@/assets/kalos-planet-ship-small.svg"
                alt="kalos planet">
            <img class="planet-img" v-if="title === 'Astro'" src="@/assets/astro-planet-ship-small.svg"
                alt="astro planet">


            <p class="logo">{{ title }}</p>
        </div>
        <div class="card-points">
            <p>{{ 1000 -  ((order-1)*250) }} pt</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "conquerer-card",
    props: {
        title: {
            type: String,
            required: false,
        },
        order: {
            type: Number,
            required: false,
        },
    }
}
</script>

<style lang="scss" scoped>
p {
    margin: 0;
    padding: 0;
}

.card {
    width: 100%;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: row;

    align-items: center;
    color: #fff;
    margin-bottom: 5px;
    &-order {
        width: 60%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 1px;

        .title {
            font-family: 'pressstart2p';
        }

        .logo {

            font-family: 'ptmono';
            font-weight: bold;
        }
    }

    &-points {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'ptmono';
        font-size: 18px;
    }
}
</style>