<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Sign Up</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<form @submit="signup">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="name" @input="name = $event.target.value" type="text" name="name">
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-label position="floating">Email</ion-label>
					<ion-input :value="email" @input="email = $event.target.value" type="email" name="email">
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-label position="floating">Password</ion-label>
					<ion-input :value="password" @input="password = $event.target.value" type="password"
						name="password"></ion-input>
				</ion-item>
				<ion-button color="medium" type="submit" expand="block">Continue</ion-button>
				<ion-button color="medium" expand="block">Sign up with Google</ion-button>
				<ion-button color="medium" expand="block" fill="outline" onclick="location.href='/#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script>
	import firebase from '@/firebase.config'

	export default {
		name: "signup",

		data() {
			return {
                name: "",
				email: "",
				password: ""
			};
		},

		methods: {
			signup(event) {
				this.$firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
					user.user.updateProfile({displayName: this.name});

					var user = firebase.usersCollection.doc(user.user.uid)
					user.set({
						name: this.name
					})

					this.$router.push('/account')
				})



				event.preventDefault();
            },
            
            googleSignup() {

            }
		}
	};
</script>

<style scoped>
@media screen and (orientation:landscape) {
	ion-button {
		display: inline-block;
	}
}
</style>
