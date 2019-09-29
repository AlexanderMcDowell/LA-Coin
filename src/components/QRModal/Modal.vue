<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Payment</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header text-center>
                    <ion-card-subtitle>Transfer Wuffee</ion-card-subtitle>
                    <ion-card-title>Your Wuffee ID</ion-card-title>
                    <ion-row>
                        <ion-col text-center>
                            <qrcode :value="this.getWuffeeId()" :options="{ width: 200 }"></qrcode>
                        </ion-col>
                    </ion-row>
                </ion-card-header>
            </ion-card>
            <ion-button @click="closeModal" expand="block">Close</ion-button>
        </ion-content>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import VueQrcode from '@chenfengyuan/vue-qrcode'
    import firebase from '@/firebase.config'

    Vue.component(VueQrcode.name, VueQrcode);

    @Component({
        components: {
            VueQrcode
        }
    })
    export default class Modal extends Vue {
        getWuffeeId() {
            return firebase.auth.currentUser.uid
        }

        closeModal() {
			this.$ionic.modalController.dismiss()
		}
    }
</script>