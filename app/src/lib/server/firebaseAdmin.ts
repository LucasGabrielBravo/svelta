import { env } from '$env/dynamic/private'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getSecurityRules } from 'firebase-admin/security-rules'

const { PRIVATE_SVELTA_FIREBASE_ADMIN } = env

export function createFirebaseAdmin() {
  function createApp() {
    const apps = getApps()
  
    if(apps?.length){    
      return apps[0]
    }  
  
    const credential = JSON.parse(PRIVATE_SVELTA_FIREBASE_ADMIN)	
  
    const app = initializeApp({
      credential: cert(credential)
    })

    return app
  }

  const app = createApp()

  const auth = getAuth(app)

  const firestore = getFirestore(app)

  const securityRules = getSecurityRules(app)

	return { ...app, auth, firestore, securityRules }
}
