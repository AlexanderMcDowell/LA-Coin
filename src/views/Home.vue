<template>
  <div class="ion-page">
	  <ion-header>
      <ion-toolbar>
        <Navbar />
        <ion-title>Welcome!</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
			<div class="logo-set">
				<h1>LaCoin</h1>
				<div class="logo-img"><img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/></div>
				<div class="info-p"><h2>Greed is Good. <br> Get Started Below</h2></div>
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

ion-footer {
	--padding-top: 0;
	--padding-bottom: 0;
}
.logo-set {
	margin:0;
}
.logo-img img {
	margin-top: 20vh;
	border: 2px solid;
	border-radius: 50%;
	border-color: navy;
	position: absolute;
	left: 50%;
	height: 50%;
	width: auto;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
}
h1 {
	margin: 0;
	padding: 0;
	font-style: italic;
	font-size: 6vh;
	font-weight: bold;
	text-align: center;
	}
.info-p h2 {
		padding-top: 90%;
		color: gray;
		text-align: center;
		font-size: 3vh;
	}
</style>
