import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async session (session: any, user: any) {
			session.id = user.id
			return session
		}
	},
	database: process.env.DATABASE_URI
})
