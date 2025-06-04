importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const fireBaseConfig = {
  apiKey: "AIzaSyADDQ2c6HmeEozWX5Vz78i7ZD-AshCGxPo",
  authDomain: "make-green-firestore.firebaseapp.com",
  projectId: "make-green-firestore",
  storageBucket: "make-green-firestore.appspot.com",
  messagingSenderId: "732178830336",
  appId: "1:732178830336:web:0c1b3a8fef188b516e34e5",
  measurementId: "2YNV2L6C9Z",
};

firebase.initializeApp(fireBaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/plant-sprout.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
