import { initializeApp } from "firebase/app";
import { readable } from 'svelte/store';

function createFirebaseStore() {
  const firebaseConfig = {
    apiKey: "AIzaSyDnpuqI-VWyBVAHL7qfObCTfzTSaj5v5_E",
    authDomain: "svelta-f1630.firebaseapp.com",
    projectId: "svelta-f1630",
    storageBucket: "svelta-f1630.appspot.com",
    messagingSenderId: "223901240444",
    appId: "1:223901240444:web:d304018ac293a5970ccdf9"
  };    

  return readable(initializeApp(firebaseConfig))
}

function createFirebaseAdmin() {

}

export const firebase = createFirebaseStore()