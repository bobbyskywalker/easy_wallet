import { useDisconnect } from '@reown/appkit/react'
import BottomNavBar from '../components/BottomNavBar'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router'

const Menu = () => {
	const { disconnect } = useDisconnect()
	const navigate = useNavigate()

	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<h1 className='text-2xl font-bold mb-4'>Menu</h1>
			<p className='text-gray-500'>This is the menu page.</p>
			<PrimaryButton
				label='Disconnect Wallet'
				onClick={() => {
					disconnect()
					navigate('/connect-wallet', { replace: true })
				}}
			/>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='menu' />
			</div>
		</div>
	)
}

export default Menu
