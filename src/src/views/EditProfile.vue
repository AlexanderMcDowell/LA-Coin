<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- Card to change photo of user-->
      <ion-card id="profile-photo-change" v-if="changePhoto == true">
        <ion-card-header @click="set_changePhoto(false)">Photos ❌</ion-card-header>
        <ion-card-content>
          <div v-for="link in profileLinks" v-bind:key="link">
            <img id="image-choice" v-bind:src="link" @click="setNewPhoto(link)">
          </div>
        </ion-card-content>
      </ion-card>
      <img id="current-profile-photo" @click="set_changePhoto(true)" v-bind:src="oldProfilePhoto" alt="User">

      <!--Form to change name, bio, graph settings-->
			<form @submit="change_profile">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="newName" @input="newName = $event.target.value" type="text" name="newName" placeholder="Enter a New Name" maxlength=12>
					</ion-input>
          <ion-label position="floating">Description</ion-label>
					<ion-input :value="newBio" @input="newBio = $event.target.value" type="text" name="newBio" placeholder="Enter a brief description (50 Char Max)" maxlength=50>
					</ion-input>
          <ion-label position="floating">Balance Graph Data Points</ion-label>
          <ion-input :value="graphSpec" @input="graphSpec = $event.target.value" type="text" name="graphSpec" placeholder="Data pts in Balance Record? (Deft. 10)" maxlength=50>
					</ion-input>
				</ion-item>
        <ion-button color="dark" type="submit" expand="block">Continue</ion-button>
			</form>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
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
export default class EditProfile extends Vue {
  // Old username and new username vars
  oldName: string = "";
  newName: string = "";

  // Old bio and new bio vars
  oldBio: string = "";
  newBio: string = "";

  // New graph specifications
  graphSpec: number;

  // Old ppf and new ppf vars
  oldProfilePhoto: string = "";
  newProfilePhoto: string = "";

  // Check if photo changes
  changePhoto: boolean = false;

  //Links generated for prettier saves in firebase (attach ppf vars to urls here)
  profileLinks: string[] = ["https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileOne.jpg?alt=media&token=d0e7524d-9e7b-43e5-b4ca-e0150a8a0544",
                "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileTwo.jpg?alt=media&token=f58c01a6-68dc-42ad-9a2f-f7da1aafa3a5",
                "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileThree.jpg?alt=media&token=967d4034-126d-44d1-b604-29930fe14e6d",
                "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileFour.jpg?alt=media&token=102b0ce2-69f0-4bd8-ac3f-ce15479277c1"
                ]

  created() {
    this.getUserInfo()
  }

  set_changePhoto(set_changePhoto: boolean) {
    this.changePhoto = set_changePhoto;
  }

  getUserInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
        this.oldName = doc.data().name;
        this.oldBio = doc.data().bio;
        this.oldProfilePhoto = doc.data().profilePhoto;
      });
  }

  change_profile(e: Event) {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    // Check how many user attributes have been changed
    if (this.newName.length > 0) {
      user.update({
        name: this.newName
      });
    }

    if (this.newBio.length > 0) {
      user.update({
        bio: this.newBio
      });
    }

    if (this.graphSpec > 0) {
      user.update({
        graphSpec: this.graphSpec
      });
    }

    this.$router.push('/account')
    e.preventDefault();
  }

  setNewPhoto(link: string) {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    // Reset ppf
    this.newProfilePhoto = link
    this.oldProfilePhoto = this.newProfilePhoto
    user.update({
        profilePhoto: this.newProfilePhoto
      });
    this.changePhoto = false;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-title {
  font-family: 'Roboto', serif;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-card-header {
  text-transform: uppercase;
  color: black;
  text-align: center;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
#current-profile-photo, #image-choice {
  border: 2px solid;
  border-color: lightgray;
  border-radius: 50%;
  width: 50%;
  height: auto;
  margin-left: 25%;
  background-color: aquamarine;
}
</style>