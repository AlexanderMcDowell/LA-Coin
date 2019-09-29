<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>
				Transactions
			</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item v-for="item in transactions">
					<ion-label>
						${{ item.amount }}
					</ion-label>
					{{ item.description }}
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import Component from "vue-class-component";
	import firebase from "@/firebase.config";

	@Component
	export default class Transactions extends Vue {

		transactions: Object[] = []

		created() {
			const currentUser = firebase.auth.currentUser.uid;
			const transactionsDoc = firebase.usersCollection.doc(currentUser).collection("transactions");

			transactionsDoc.get().then(snapshot => {

				snapshot.forEach(doc => {
					this.transactions.push(doc.data());
				});
			});
		}
	}
</script>

<style scoped>
</style>