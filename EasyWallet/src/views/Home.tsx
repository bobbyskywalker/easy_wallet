import { useDisconnect } from '@reown/appkit/react'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router'

const Home = () => {
	const { disconnect } = useDisconnect()
	const navigate = useNavigate()

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<p className='text-white'>HELLO WORLD!</p>
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
