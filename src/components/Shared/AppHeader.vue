<template>
    <div class="header-container">
        <p class="logo">Level Up</p>
        <p class="title">RISE OF THE KINGDOM</p>
    </div>
</template>

<script>
export default {
    name: "app-header",
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 150px;
    background-color: #0A6E78;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .logo {
        font-family: 'pressstart2p';
        color: #F7C970;
        text-shadow: 1px 2px #C86730;
        font-size: 34px;
        margin: 0
    }

    & .title {
        font-family: 'pressstart2p';
        color: #F7C970;
        text-shadow: 1px 2px #C86730;
        font-size: 12px;

    }
}
</style>