import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import PrimaryButton from '../components/PrimaryButton'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const ConnectWallet = () => {
	const { open } = useAppKit()
	const { isConnected } = useAppKitAccount()
	const navigate = useNavigate()

	useEffect(() => {
		if (isConnected) {
			navigate('/home', { replace: true })
		}
	}, [])

	useEffect(() => {
		if (isConnected) {
			navigate('/home', { replace: true })
		}
	}, [isConnected, navigate])

	return (
		<div className='min-h-[80vh] px-4 flex flex-col justify-between'>
			<img
				src='https://i.imgur.com/kzjfgFa.png'
				className='w-full object-cover mb-4'
				alt='Onboarding Background'
			/>
			<div>
				<h1 className='text-white text-3xl font-bold'>EasyWallet</h1>
				<p className='text-black2 text-sm'>
					Easily link your crypto wallet using WalletConnect to
					explore all features of EasyWallet. Your connection is safe,
					private, and only you control your assets.
				</p>
			</div>
			<PrimaryButton
				label='Connect a Wallet'
				onClick={() => {
					console.log('Connecting wallet...')
					open()
				}}
			/>
		</div>
	)
}

export default ConnectWallet
