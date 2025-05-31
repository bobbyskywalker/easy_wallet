import { useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router'
import FeatureButton from '../components/FeatureButton'
import { ReactComponent as Send } from '../assets/send.svg'
import { ReactComponent as Receive } from '../assets/receive.svg'
import { ReactComponent as Swap } from '../assets/swap.svg'
import BottomNavBar from '../components/BottomNavBar'
import TokenCard from '../components/TokenCard'

const Home = () => {
	const { disconnect } = useDisconnect()
	const navigate = useNavigate()
	const { address } = useAppKitAccount()

	return (
		<div className='flex flex-col items-center justify-center'>
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
					onClick={() => navigate('/swap')}
				/>
			</div>
			<div className='flex w-full justify-between px-4'>
				<p className='text-white'>Your Tokens</p>
				<button className='text-white'>View All</button>
			</div>
			<div className='grid grid-cols-2 gap-4 mt-4'>
				<TokenCard
					name='Ethereum'
					symbol='ETH'
					amount={'4000'}
					value={2.5}
					imageUrl='https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png'
				/>
				<TokenCard
					name='Bitcoin'
					symbol='BTC'
					amount={'5000'}
					value={0.1}
					imageUrl='https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png'
				/>
				<TokenCard
					name='Solana'
					symbol='SOL'
					amount={'200'}
					value={10}
					imageUrl='https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png'
				/>
			</div>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='home' />
			</div>
		</div>
	)
}

export default Home
