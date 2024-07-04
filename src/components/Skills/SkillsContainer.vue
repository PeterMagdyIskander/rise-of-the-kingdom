<template>
    <div class="skills-container">
        <skill-container v-for="(skill, index) in skills" :key="index" :skillName="skill.name" :skillOrder="index"
            :skillPoints="skill.points" :skillCooldown="skill.cooldown" @dealPoints="dealPoints" :active="isSkillActive(skill.neededLevel,skill.cooldown,index)">
        </skill-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import skillContainer from './skillContainer.vue';
export default {
    name: "skills",
    components: {
        skillContainer
    },
    data() {
        return {
            attackerSkills: [
                {

                    name: "Skill 1",
                    points: 50,
                    neededLevel: 1,
                    cooldown:2
                },
                {
                    name: "Skill 2",
                    points: 10,
                    neededLevel: 3,
                    cooldown:2
                },
                {
                    name: "Skill 3",
                    points: 100,
                    neededLevel: 9,
                    cooldown:5
                },
            ],
            otherSkills: [
                {

                    name: "Skill 1",
                    points: 10,
                    neededLevel: 1,
                    cooldown:1
                },
                {
                    name: "Skill 2",
                    points: 10,
                    neededLevel: 3,
                    cooldown:2
                },
                {
                    name: "Skill 3",
                    points: 50,
                    neededLevel: 9,
                    cooldown:5
                },
            ],
        }
    },
    computed: {
        ...mapGetters(['getUser']),
        skills(){
            if(this.getUser.role.toUpperCase()==="ATTACKER")
                return this.attackerSkills
            else
                return this.otherSkills
        }
    },
    methods: {
        dealPoints(points,cooldown,order) {
            this.$emit('dealPoints', points,cooldown,order)
        },
        addHours(date, hours) {
            date.setHours(date.getHours() + hours);

            return date;
        },
        isSkillActive(neededLevel,cooldown,index) {
            let dateNow = new Date();
            let userTimeStamp = this.getUser.timeStamp[index];
            return this.getUser.level >= neededLevel && dateNow > this.addHours(new Date(userTimeStamp), cooldown);
        }
    }
}
</script>

<style lang="scss">
.skills-container {
    background-color: #162041;
    width: 100%;
    padding: 11px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    position: absolute;
    bottom: -175px;
}
</style>