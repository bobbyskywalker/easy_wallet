import { useAppKitAccount } from '@reown/appkit/react'
import { useNavigate } from 'react-router'
import FeatureButton from '../components/FeatureButton'
import { ReactComponent as Send } from '../assets/send.svg'
import { ReactComponent as Receive } from '../assets/receive.svg'
import { ReactComponent as Swap } from '../assets/swap.svg'
import BottomNavBar from '../components/BottomNavBar'
import TokenCard from '../components/TokenCard'
import { useEffect, useState } from 'react'
import { getWalletBalance } from '../utils/getWalletBalance'
import { getAvailableTokens } from '../utils/getAvailableTokens'

function Spinner() {
	return (
		<div
			style={{
				border: '4px solid #f3f3f3',
				borderTop: '4px solid #3498db',
				borderRadius: '50%',
				width: '24px',
				height: '24px',
				animation: 'spin 2s linear infinite',
			}}
		/>
	)
}

export interface Token {
	address: string
	symbol: string
	decimals: number
	name: string
	logoURI: string
	eip2612: boolean
	tags: string[]
}

const Home = () => {
	const navigate = useNavigate()
	const { address } = useAppKitAccount()
	const [walletBalance, setWalletBalance] = useState<string | null>(null)
	const [availableTokens, setAvailableTokens] = useState<Token[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const balance = await getWalletBalance(address!)
				const availableTokens = await getAvailableTokens()
				if (balance && availableTokens) {
					setWalletBalance(balance.toFixed(2))
					setAvailableTokens(availableTokens)
					console.log('Available Tokens:', availableTokens)
				} else {
					console.log(balance)
					console.error('Failed to fetch wallet balance')
				}
			} catch (error) {
				console.error('Error fetching wallet balance:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center h-screen'>
				<h1 className='text-white mb-4'>Loading Data...</h1>
				<Spinner />
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center mb-30'>
			<div className='bg-black1 border-1 border-black2 px-3 py-1 rounded-3xl max-w-40 mt-4'>
				<p className='text-white truncate'>{address}</p>
			</div>
			<h1 className='text-3xl text-white font-bold mt-15'>
				${walletBalance}
			</h1>
			<div className='flex gap-8 mt-15'>
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
			<div className='flex w-full justify-between px-4 mt-8'>
				<p className='text-white'>Your Tokens</p>
				<button className='text-white'>View All</button>
			</div>
			<div className='grid grid-cols-2 gap-4 mt-6'>
				{availableTokens.map((token) => (
					<TokenCard
						key={token.address}
						name={token.name}
						symbol={token.symbol}
						amount={'0'}
						value={0}
						imageUrl={token.logoURI}
					/>
				))}
			</div>

			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='home' />
			</div>
		</div>
	)
}

export default Home
