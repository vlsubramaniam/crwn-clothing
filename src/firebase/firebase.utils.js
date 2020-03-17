import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyC6ieBk2nveBD8_CWtA2EMuvUKcGxlNa-8',
  authDomain: 'crwn-db-8d88a.firebaseapp.com',
  databaseURL: 'https://crwn-db-8d88a.firebaseio.com',
  projectId: 'crwn-db-8d88a',
  storageBucket: 'crwn-db-8d88a.appspot.com',
  messagingSenderId: '709891170565',
  appId: '1:709891170565:web:fd6b894dd4c65fabdf976c',
  measurementId: 'G-XWET7NCE8E'
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
