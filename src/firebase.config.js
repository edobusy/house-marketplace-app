// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCf19KdXTew1juEJmqiBtUOU3i0n2jEUo',
  authDomain: 'house-marketplace-app-57273.firebaseapp.com',
  projectId: 'house-marketplace-app-57273',
  storageBucket: 'house-marketplace-app-57273.appspot.com',
  messagingSenderId: '787699060688',
  appId: '1:787699060688:web:a18850082b6bbd9490f3d5',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()
