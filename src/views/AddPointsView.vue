<template>
    <div>
        <app-header></app-header>

        <form class="home-container" @submit.prevent="handleSubmit">
            <div class="input-container">
                <h3 class="title">Selected</h3>
                <h3 class="title">{{ selectedUser ? selectedUser.name : "Please search and select a user" }}</h3>
            </div>
            <div class="input-container">
                <h3 class="title">Username</h3>
                <input type="text" v-model="form.name">
            </div>
            <div v-if="filteredNames.length > 0" class="dropdown">
                <div v-for="item in filteredNames" :key="item.id" class="dropdown-item" @click="select(item)">
                    {{ item.name }}
                </div>
            </div>

            <div v-else class="dropdown">
                No results found.
            </div>

            <div class="input-container">
                <h3 class="title">Points</h3>
                <input type="text" v-model="form.points">
            </div>

            <div class="submit-container">
                <button type="submit" :disabled="!isFormValid" :class="{ 'disabled': !isFormValid }">SUBMIT</button>
            </div>

        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, getDoc, doc, updateDoc, increment, addDoc } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';

export default {
    name: "add-quest-view",
    computed: {
        ...mapGetters(['getUser']),
        isFormValid() {
            return (
                this.selectedUser != null &&
                this.form.points>0
            );
        },
        filteredNames() {
            if (this.form.name.trim() === '') {
                return [];
            }
            return this.allUsers.filter(item =>
                item.name.toLowerCase().includes(this.form.name.toLowerCase())
            );
        }
    },
    components: {
        AppHeader,
    },
    data() {
        return {
            form: {
                name: '',
                points: 0,
            },
            allUsers: [],
            selectedUser: null
        };
    },
    mounted() {
        const firestore = getFirestore();
        const users = collection(firestore, 'users');
        onSnapshot(users, snapshot => {
            this.allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        })
    },
    methods: {
        async handleSubmit() {
            try {
                const firestore = getFirestore();
                const userCollectionReference = collection(firestore, 'users');
                const teamCollectionReference = collection(firestore, 'teams');
                const userDoc = doc(userCollectionReference, this.selectedUser.uid);

                const teamDoc = doc(teamCollectionReference, this.selectedUser.teamId);

                updateDoc(userDoc, {
                    assignedQuestId: "",
                    humanityPoints: increment(this.form.points),
                })
                updateDoc(teamDoc, {
                    humanityPoints: increment(this.form.points),
                })
                alert('Quest submitted and points added successfully!');
                this.resetForm();
            } catch (error) {
                console.error('Error adding quest: ', error);
            }
        }, resetForm() {
            this.form.name = ''
            this.form.points = 0
            this.selectedUser=null
        },
        select(user) {
            this.selectedUser = user;
        }
    },
}
</script>
<style lang="scss" scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    margin-top: 50px;
}

.input-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    & .title {
        font-family: 'ptmono';
        font-size: 18px;
        color: #E5E5E5;
    }

    input {
        width: 100%;
        height: 50px;
        border: 2px solid #17182d;
        color: #E5E5E5;
        background-color: #0A6E78;
        border-radius: 6px;
        padding-left: 10px;
        font-family: "ptmono";
        font-size: 32px;

        @media only screen and (max-width: 767px) {
            font-size: 18px;
        }
    }

    & .difficulty {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-item {
            padding: 13px;
            cursor: pointer;

            img {
                width: 68px;
            }
        }

        & .selected {
            border: 2px solid #3E8898;
            border-radius: 6px;
        }
    }
}

.submit-container {
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 15px;

    button {
        width: 170px;
        padding: 10px;
        background-color: #76bbca;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #fff;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
        cursor: pointer;
    }

    & .disabled {
        background-color: #3E8898;
        color: #eee;
        cursor: unset;
    }
}
</style>