<template>
	<ion-button @click="openModal" expand="block">Payment</ion-button>
</template>

<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import Modal from './Modal.vue'

	@Component({
		components: {
			Modal
		}
	})
	export default class QRModal extends Vue {
		openModal() {
			return this.$ionic.modalController
				.create({
					component: Modal
				}).then(
					m => m.present()
				)
		}
	}
</script>

<style scoped>

</style>