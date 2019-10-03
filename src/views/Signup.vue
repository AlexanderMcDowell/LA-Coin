<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Login</ion-title>
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
				<ion-button type="submit" expand="block">Continue</ion-button>
				<ion-button expand="block">Sign up with Google</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script>
	export default {
		name: "login",

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
</style>
