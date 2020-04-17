import Firebase from 'firebase';
let config = {
    apiKey: 'AIzaSyCoEUF96b0plCcGYsHNAg5BCKFg4TTZHuM',
    authDomain: 'first-project-268111.firebaseapp.com',
    databaseURL: 'https://first-project-268111.firebaseio.com',
    projectId: 'first-project-268111',
    storageBucket: 'first-project-268111.appspot.com',
    messagingSenderId: '38615372561'
};
//if (!Firebase.app.length)
Firebase.initializeApp(firebaseConfig);

export default Firebase;
//let app = Firebase.initializeApp(config);
//export const db = app.database();