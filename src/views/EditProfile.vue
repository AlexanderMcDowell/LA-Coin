<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
        <Navbar />
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card id="profile-photo-change" v-if="change_photo == true">
        <ion-card-header @click="set_change_photo(false)">Photos ❌</ion-card-header>
        <ion-card-content>
          <div v-for="link in profileLinks">
            <img id="image-choice" v-bind:src="link" @click="setNewPhoto(link)">
          </div>
        </ion-card-content>
      </ion-card>
      <img id="current-profile-photo" @click="set_change_photo(true)" v-bind:src="old_profile_photo" alt="User">
			<form @submit="change_profile">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="new_name" @input="new_name = $event.target.value" type="text" name="new_name" placeholder="Enter a New Name" maxlength=12>
					</ion-input>
          <ion-label position="floating">Description</ion-label>
					<ion-input :value="new_bio" @input="new_bio = $event.target.value" type="text" name="new_bio" placeholder="Enter a brief description (50 Character Max)" maxlength=50>
					</ion-input>
				</ion-item>
        <ion-button color="dark" type="submit" expand="block">Continue</ion-button>
			</form>
    </ion-content>
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
export default class EditProfile extends Vue {
  old_name: string = ""
  new_name: string = ""

  old_bio: string = ""
  new_bio: string = ""

  old_profile_photo: string = ""
  new_profile_photo: string = ""

  change_photo: boolean = false

  profileLinks: string[] = ["https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileOne.jpg?alt=media&token=d0e7524d-9e7b-43e5-b4ca-e0150a8a0544",
                            "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileTwo.jpg?alt=media&token=f58c01a6-68dc-42ad-9a2f-f7da1aafa3a5",
                            "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileThree.jpg?alt=media&token=967d4034-126d-44d1-b604-29930fe14e6d",
                            "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileFour.jpg?alt=media&token=102b0ce2-69f0-4bd8-ac3f-ce15479277c1"
  ]

  created() {
    this.getUserInfo()
  }

  set_change_photo(set_change_photo: boolean) {
    this.change_photo = set_change_photo;
  }

  getUserInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);
    user.get().then(doc => {
        this.old_name = doc.data().name;
        this.old_bio = doc.data().bio;
        this.old_profile_photo = doc.data().profile_photo;
      });
  }

  change_profile(e: Event) {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);
    if (this.new_name.length > 1 && this.new_bio.length > 1) {
      user.update({
        name: this.new_name,
        bio: this.new_bio
      });
      this.$router.push('/account')
      e.preventDefault();
    }
    else {
      this.$router.push('/account')
      e.preventDefault();
    }
  }
  setNewPhoto(link: string) {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);
    this.new_profile_photo = link
    this.old_profile_photo = this.new_profile_photo
    user.update({
        profile_photo: this.new_profile_photo
      });
    this.change_photo = false;
    //e.preventDefault();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-card-header {
  text-transform: uppercase;
  color: black;
  text-align: center;
}
#current-profile-photo, #image-choice {
  border: 2px solid;
  border-color: lightgray;
  border-radius: 50%;
  width: 50%;
  height: auto;
  margin-left: 25%;
}
</style>
