<template>
    <div>
        <app-header></app-header>
        <input class="upload-button" type="file" @change="handleFileUpload" />
    </div>
</template>

<script>
import AppHeader from '@/components/Shared/AppHeader.vue';

import { getFirestore, writeBatch, doc, collection ,getDocs} from 'firebase/firestore';

import * as XLSX from 'xlsx';
export default {
    name: "assign-players-to-teams",
    components: {
        AppHeader,
    },
    methods: {
        async handleFileUpload(event) {
            const file = event.target.files[0];
            const data = await this.readExcelFile(file);
            const formattedData = this.formatData(data);
            await this.saveToFirebase(formattedData);
        },
        readExcelFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    resolve(sheet);
                };
                reader.onerror = (error) => reject(error);
                reader.readAsArrayBuffer(file);
            });
        },
        formatData(data) {
            return data.map(row => ({
                playerMail: row.mail,
                teamId: row.teamId,
                isTeamLead: row.isLeader,
                isAdmin: row.isAdmin
            }));
        },
        // Function to delete all documents in a collection
        async deleteCollection(collectionRef) {
            const querySnapshot = await getDocs(collectionRef);
            const batch = writeBatch(getFirestore());
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        },

        // Function to save new data to Firestore
        async saveToFirebase(data) {
            const db = getFirestore();
            const assignationCollectionRef = collection(db, "assignation");

            try {
                // Delete old collection data
                await this.deleteCollection(assignationCollectionRef);

                // Add new data
                const batch = writeBatch(db);
                data.forEach(item => {
                    const docRef = doc(assignationCollectionRef);
                    batch.set(docRef, item);
                });

                await batch.commit();
                alert('Data successfully written to Firebase!');
            } catch (error) {
                alert('Error writing document: ' + error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-button {
    width: fit-content;
    padding: 10px;
    background-color: #76bbca;
    border-radius: 6px;
    border: 1px solid #E5E5E5;
    color: #fff;
    font-size: 1.2rem;
    font-family: 'pressstart2p';
    cursor: pointer;
    margin: 50px;
}
</style>