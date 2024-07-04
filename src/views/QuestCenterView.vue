<template>
    <div>
        <div class="header-container">
            <p class="logo">Level Up</p>
            <p class="title">Quest Center</p>
        </div>
        <button @click="show('attacker')" :class="{ active: showingRole === 'attacker' }">Attacker</button>
        <button @click="show('defender')" :class="{ active: showingRole === 'defender' }">Defender</button>
        <button @click="show('healer')" :class="{ active: showingRole === 'healer' }">Healer</button>
        <quest-card v-for="quest in questList" :key="quest.id" :title="quest.title" :id="quest.id"
            :difficulty="quest.difficulty"></quest-card>
    </div>
</template>
<script>
import QuestCard from "@/components/Quest/QuestCard.vue"

import { mapGetters } from 'vuex';
export default {
    name: "quest-center-view",
    components: { QuestCard },
    computed: mapGetters(['getUser', 'getQuests']),
    data() {
        return {
            questList: [],
            showingRole: ""
        }
    },
    methods: {
        show(role) {
            this.showingRole = role;
            this.questList = this.getQuests.filter(quest => quest.role === this.showingRole && !quest.assignedTo.includes(this.getUser.uid))
        }
    },
    created() {
        this.showingRole=this.getUser.role.toLowerCase();
        this.questList = this.getQuests.filter(quest => quest.role === this.showingRole && !quest.assignedTo.includes(this.getUser.uid))
    }
}
</script> 
<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
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

button {
    all: unset;
    width: 80px;
    background-color: #444a5c;
    padding: 10px;
    font-family: 'ptmono';
}

.active {
    background-color: #162041;
}
</style>