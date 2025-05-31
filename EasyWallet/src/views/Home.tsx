import { useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router'
import FeatureButton from '../components/FeatureButton'
import { ReactComponent as Send } from '../assets/send.svg'
import { ReactComponent as Receive } from '../assets/receive.svg'
import { ReactComponent as Swap } from '../assets/swap.svg'

const Home = () => {
	const { disconnect } = useDisconnect()
	const navigate = useNavigate()
	const { address } = useAppKitAccount()

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='bg-black1 border-1 border-black2 px-3 py-1 rounded-3xl max-w-40'>
				<p className='text-white truncate'>{address}</p>
			</div>
			<h1 className='text-3xl text-white font-bold'>$3012318.29</h1>
			<div className='flex gap-8'>
				<FeatureButton
					Icon={Send}
					title={'Send'}
					onClick={() => console.log('Send Pressed')}
				/>
				<FeatureButton
					Icon={Receive}
					title={'Receive'}
					onClick={() => console.log('Receive Pressed')}
				/>
				<FeatureButton
					Icon={Swap}
					title={'Swap'}
					onClick={() => console.log('Swap Pressed')}
				/>
			</div>
			<PrimaryButton
				label='Disconnect Wallet'
				onClick={() => {
					disconnect()
					navigate('/connect-wallet', { replace: true })
				}}
			/>
		</div>
	)
}

export default Home
