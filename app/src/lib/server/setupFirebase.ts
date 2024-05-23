import { env } from '$env/dynamic/private'
import { createUser } from '$lib/domain/entities/user'
import { createFirebaseAdmin } from './firebaseAdmin'

const {
	PRIVATE_SVELTA_ADMIN_NAME,
	PRIVATE_SVELTA_ADMIN_EMAIL,
	PRIVATE_SVELTA_ADMIN_PASSWORD,
	PRIVATE_SVELTA_SITE_CANONICAL,
	PRIVATE_SVELTA_SITE_NAME
} = env

const source = `
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {  
    match /site/{document=**} {
      allow read: if true;            
      allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.permissions.updateSite == true;
    }
    
    match /pages/{document=**} {
      allow read: if true;      
      allow create: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.permissions.createPage == true;
      allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.permissions.updatePage == true;      
      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.permissions.deletePage == true;
    }
    
    match /users/{document=**} {
      allow read: if request.auth != null;                  
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`

export async function setupFirebase() {
	const { firestore, auth, securityRules } = createFirebaseAdmin()

	async function initUser() {
		const usersRef = firestore.collection('users')

		try {
			const users = await usersRef.get()

			if (users.size > 0) {
				console.info('Usuario ja inicializado')
				return
			}

			console.info('Criando usuario...')

			let name = PRIVATE_SVELTA_ADMIN_NAME
			let email = PRIVATE_SVELTA_ADMIN_EMAIL
			let password = PRIVATE_SVELTA_ADMIN_PASSWORD

			if (!name) {
				name = 'Admin'
				console.info(`Nome do usuario nao definido. O nome '${name}' foi definido por padrao`)
			}

			if (!email) {
				email = 'admin@svelta.com'
				console.info(`E-mail do usuario nao definido. O e-mail '${email}' foi definido por padrao`)
			}

			if (!password) {
				password = '12345678'
				console.info(`Senha do usuario nao definido. A senha '${password}' foi definida por padrao`)
			}

			const user = await auth.createUser({
				displayName: name,
				email: email,
				password: password
			})

			await usersRef.doc(user.uid).set(
				createUser({
					id: user.uid,
					email: email,
					name: name,
					enable: true,
					created: new Date(),
					updated: new Date(),
					permissions: {
						createPage: true,
						updatePage: true,
						deletePage: true,
						createPost: true,
						updatePost: true,
						deletePost: true,
						updateSite: true,
						isAdmin: true
					}
				})
			)

			console.info('Usuario criado')
		} catch (error) {
			console.error(error)
		}
	}

	async function initSite() {
		const siteRef = firestore.collection('site')

		try {
			const site = await siteRef.get()

			if (site.size > 0) {
				console.info('Site ja inicializado')
				return
			}

			console.info('Criando site...')

			await siteRef.add({
				created: new Date(),
				updated: new Date(),
				host: PRIVATE_SVELTA_SITE_CANONICAL,
				seo: {
					siteName: PRIVATE_SVELTA_SITE_NAME,
					description: '',
					canonical: PRIVATE_SVELTA_SITE_CANONICAL,
					image: ''
				},
				socialNetworks: [],
				domains: [],
				favicon: '',
				theme: '',
				layoutComponents: {
					navbar: {
						name: 'NavbarLeftAligned',
						group: 'navbar',
						fields: {}
					},
					footer: {
						name: 'FooterSocialNetworks',
						group: 'footer',
						fields: {}
					}
				}
			})

			console.info('Site criado')
		} catch (error) {
			console.error(error)
		}
	}

	async function initPage() {
		const pagesRef = firestore.collection('pages')

		try {
			const page = await pagesRef.get()

			if (page.size > 0) {
				console.info('Home ja inicializada')
				return
			}

			console.info('Criando home...')

			pagesRef.add({
				created: new Date(),
				updated: new Date(),
				path: '/',
				index: 0,
				props: {
					title: 'Home',
					description: 'Svelta home page',
					sections: [
						{
							name: "HeroSplitWithImage",
							group: "Hero",    
							fields: {},  
						}
					]
				}
			})

			console.info('Home criada')
		} catch (error) {
			console.error(error)
		}
	}

	async function initRules() {
		try {
			console.info('Verificando regras...')
			
			const currentRules = await securityRules.getFirestoreRuleset()

			if (currentRules.source[0].content !== source) {
				console.info('Aplicando regras...')
			
				await securityRules.releaseFirestoreRulesetFromSource(source)
			
				console.info('Regras atualizadas')
			}else{
				console.info('Regras ja aplicadas')
			}
		} catch (error) {
			console.error("error - initRules:", error)
		}
	}

	await initUser()
	await initSite()
	await initPage()
	await initRules()
}
