// DS.FirebaseConfig - Initialize Firebase and expose DS.db
DS.FirebaseConfig = (function() {
  // TODO: Replace with your Firebase project config
  var firebaseConfig = {
    apiKey: "AIzaSyCnHITn_apzQY6G43rKcMc031J6hjJbN78",
    authDomain: "draw-steel-character-creator.firebaseapp.com",
    projectId: "draw-steel-character-creator",
    storageBucket: "draw-steel-character-creator.firebasestorage.app",
    messagingSenderId: "729012765899",
    appId: "1:729012765899:web:6e95e8221c2e2d7ffc474e"
  };

  firebase.initializeApp(firebaseConfig);
  DS.db = firebase.firestore();

  // Enable offline persistence so the app works offline
  DS.db.enablePersistence().catch(function(err) {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence unavailable: multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not supported in this browser');
    }
  });

  return {};
})();
