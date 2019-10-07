<template>
  <div class="ion-page">
	  <ion-header>
      <ion-toolbar>
        <Navbar />
        <ion-title>Welcome!</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
			<h1>LACoin</h1>
			<div>
				<img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
			</div>
		</ion-content>
		<ion-footer class="ion-padding">
			<ion-list>
				<ion-button expand="block" color="dark" fill="outline" onclick="location.href='/#/signup'">Get Started</ion-button>
				<ion-button expand="block" color="dark" onclick="location.href='/#/login'">Login</ion-button>
			</ion-list>
		</ion-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class Home extends Vue{
}
</script>

<style scoped>
h1 {
	font-style: italic;
	font-size: 48px;
	font-weight: bold;
	text-align: center;
}
ion-footer {
	--padding-top: 0;
	--padding-bottom: 0;
}
@media screen and (orientation:portrait) {
	img {
		border: 2px solid;
		border-radius: 50%;
		border-color: navy;
		position: absolute;
		top: 50%;
		left: 50%;
		height: 50%;
		width: auto;
		/* bring your own prefixes */
		transform: translate(-50%, -50%);
	}
}
 @media screen and (orientation:landscape) { 
	 img {
		border: 2px solid;
		border-radius: 50%;
		border-color: navy;
		position: absolute;
		top: 50%;
		left: 50%;
		height: 50%;
		width: auto;
		/* bring your own prefixes */
		transform: translate(-50%, -50%);
	}
	ion-button {
		display: inline-block;
	}
}
</style>
