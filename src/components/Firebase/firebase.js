import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.savedContent = [];
  }

  // *** Auth API ***

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => {
    console.log("Signing out... ");
    this.auth.signOut();
  }

  // *** User API ***

  setUID = user => {

    if(user == null)
    {
      console.log("User does not exist");
      this.currentUserUID = null;
      this.savedContent = [];
    }
    else
    {
      console.log("User exists, setting user... ");
      this.currentUserUID = user.uid;
      //this.getSavedContentFromFirebase();
    }
  }

  user = uid => this.db.collection("users").doc("" + uid);

  user = () => this.db.collection("users").doc("" + this.currentUserUID);

  users = () => this.db.collection("users");


  getMinDate = () => { console.log("minDate = " + this.minDate); return this.minDate; }
  getMaxDate = () => { console.log("maxDate = " + this.maxDate); return this.maxDate; }

  /* Returns array of saved content */
  getSavedContent = () => {

    console.log("in getSavedContent()")

    if(this.savedContent == null || this.savedContent.length == 0)
    {
      return this.getSavedContentFromFirebase();
    }
    else {
      //console.log(this.savedContent);
      return this.savedContent;
    }

  }

  getSavedContentForTimeline = (callback) => {

    console.log("in getSavedContentForTimeline()")

    if(this.savedContent == null || this.savedContent.length == 0)
    {
      var minDate = new Date(0);
      var maxDate = new Date(0);

      console.log("loading data... current uid = " + this.currentUserUID);
      var data = [];
      this.db.collection("users").doc("" + this.currentUserUID).collection("savedContent")
      .get().then(querySnapshot => {

        console.log("in db");
        var idNumber = 0;

        querySnapshot.forEach(function(doc)
        {

            var dataPoint = {
              start: doc.data().dateTime,
              title: doc.data().title,
              imageURL: doc.data().imgURL,
              notes: doc.data().notes,
              summary: doc.data().summary,
              link: doc.data().url,
              format: doc.data().type,
              //style: 'background-color: rgba(255, 255, 255);  padding: 0px;',
              tags: doc.data().tags,
              id: idNumber
            };

            var tempDate = new Date(doc.data().dateTime);

            if(tempDate.getTime() < minDate.getTime())
              minDate = tempDate;

            if(tempDate.getTime() > maxDate.getTime())
              maxDate = tempDate;

            data.push(dataPoint);
            idNumber++;
          });

          console.log(data);
          this.minDate = minDate;
          this.maxDate = maxDate;
          this.savedContent = data;
          callback(this.savedContent, this.minDate, this.maxDate);
      });
    }
    else {
      //console.log(this.savedContent);
      callback(this.savedContent, this.minDate, this.maxDate);
    }

  };

  getSavedContentFromFirebase = () => {

    var minDate = new Date(0);
    var maxDate = new Date(0);

    console.log("in getSavedContentFromFirebase() current uid = " + this.currentUserUID);
    var data = [];
    this.db.collection("users").doc("" + this.currentUserUID).collection("savedContent")
    .get().then(querySnapshot => {

      console.log("in db");

      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots

          var template = 0;
          if (doc.data().type == "note") {
            template = 1;
          }

          var dataPoint = {
            start: doc.data().dateTime,
            title: doc.data().title,
            imageURL: doc.data().imgURL,
            notes: doc.data().notes,
            summary: doc.data().summary,
            link: doc.data().url,
            format: doc.data().type,
            style: 'background-color: rgba(255, 255, 255);  padding: 0px;',
            tags: doc.data().tags,
            template: template
          };

          var tempDate = new Date(doc.data().dateTime);

          if(tempDate.getTime() < minDate.getTime())
            minDate = tempDate;

          if(tempDate.getTime() > maxDate.getTime())
            maxDate = tempDate;

          data.push(dataPoint);
        });

        console.log(data);
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.savedContent = data;
        return this.savedContent;
    });
  };


}

export default Firebase;
