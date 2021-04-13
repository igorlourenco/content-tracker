import React from 'react'
import {
	Flex,
	Container,
	Heading,
	Stack,
	Icon,
	SimpleGrid,
	Text,
	Box,
	Image
} from '@chakra-ui/react'; import { signIn, providers, useSession } from 'next-auth/client'
import Loading from '../components/loading'
import { Button } from '../components/custom'
import { useRouter } from 'next/router'
import { CgExternal } from 'react-icons/cg'
import { IoCalendarSharp } from 'react-icons/io5'
import { FcPlanner, FcOvertime, FcSurvey } from 'react-icons/fc'

interface AuthProvider {
	callbackUrl?: string
	id?: string
	name?: string
	type?: string
}

interface FeatureProps {
	title: string;
	text: string;
	icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
	return (
		<Stack>
			<Flex
				w={16}
				h={16}
				align={'center'}
				justify={'center'}
				color={'gray.700'}
				rounded={'full'}
				bg={'purple.400'}
				mb={1}>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
			<Text color={'gray.600'}>{text}</Text>
		</Stack>
	)
}

const App = ({ authProviders }: any) => {
	const router = useRouter()
	const [session, loading] = useSession()
	const googleProvider: AuthProvider = Object.values(authProviders).find((provider: AuthProvider) => provider.id === 'google')

	if (typeof window !== 'undefined' && loading) return <Loading />

	return (
		<Container maxW={'5xl'}>
			<Stack
				textAlign={'center'}
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={20}>
				<Heading
					fontWeight={600}
					fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
					lineHeight={'110%'}>
					Gerencie suas mídias sociais de forma{' '}
					<Text as={'span'} color={'purple.400'}>
						fácil e organizada
					</Text>
				</Heading>
				<Text color={'gray.700'} maxW={'3xl'}>
					Never miss a meeting. Never be late for one too. Keep track of your
					meetings and receive smart reminders in appropriate times. Read your
					smart “Daily Agenda” every morning.
				</Text>
				<Stack spacing={6} direction={'row'}>
					{!session && googleProvider && (
						<>
							<Button colorScheme="gray" px={6} onClick={() => router.push('#sobre')} >
								Ver mais
							</Button>
							<Button leftIcon={<Box as={IoCalendarSharp} />} boxShadow="lg" onClick={() => signIn(googleProvider.id)} px={6}>
								Quero começar agora!
							</Button>
						</>
					)}
					{session &&
						<Button boxShadow="lg" rightIcon={<Box as={CgExternal} />} fontWeight="700" onClick={() => router.push('/dashboard')}>
							Ir para seu quadro de gerenciamento
						</Button>
					}
				</Stack>
				<Flex w={'full'} justifyContent="center">
					<Image src="/images/landing/main.svg" width="70%" height="auto" />
				</Flex>
			</Stack>

			<Box p={4} id="sobre">
				<Heading size="sm">Por que usar XXXXXXX?</Heading>
				<SimpleGrid marginY={8} columns={{ base: 1, md: 3 }} spacing={10}>
					<Feature
						icon={<Icon as={FcPlanner} w={10} h={10} />}
						title={'Organização'}
						text={
							'Veja seus conteúdos de forma mais organizada e estruturada ' +
							'e tenha facilidade na hora de decidir qual conteúdo (e onde) produzir.'
						}
					/>
					<Feature
						icon={<Icon as={FcOvertime} w={10} h={10} />}
						title={'Economia de tempo'}
						text={
							'Poupe tempo na hora de planejar seus conteúdos. É rápido e fácil se organizar ' +
							'e fazer sua produtividade ir a mil!'
						}
					/>
					<Feature
						icon={<Icon as={FcSurvey} w={10} h={10} />}
						title={'Facilidade'}
						text={
							'Organize seu conteúdo, de diversos canais de mídia, da forma que quiser, tenha ' +
							'uma visualização da distribuição das suas publicações.'
						}
					/>
				</SimpleGrid>
				<Flex marginTop={5} w={'full'} justifyContent="center">
					<Image src="/images/landing/board.png" width="100%" height="auto" />
				</Flex>
			</Box>
		</Container >

	)
}

App.getInitialProps = async () => {
	return {
		authProviders: await providers()
	}
}

export default App
