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
import { convertWeiToUsd, getUsersTokens } from '../utils/getUsersTokens'

export function Spinner() {
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

export interface UserToken {
	address: string
	symbol: string
	decimals: number
	name: string
	logoURI: string
	eip2612: boolean
	tags: string[]
	isFoT: boolean
	isCustom: boolean
	type: string
	tracked: boolean
	wallets: {
		[walletAddress: string]: {
			balance: string // in WEI
			allowance: string
		}
	}
}

const Home = () => {
	const navigate = useNavigate()
	const { address } = useAppKitAccount()
	const [walletBalance, setWalletBalance] = useState<string | null>(null)
	const [availableTokens, setAvailableTokens] = useState<UserToken[]>([])
	const [tokenValuesInUsd, setTokenValuesInUsd] = useState<
		Record<string, number>
	>({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const balance = await getWalletBalance(address!)
				const tokens = await getUsersTokens(address!)
				if (balance && tokens) {
					setWalletBalance(balance.toFixed(2))
					setAvailableTokens(tokens)

					const usdMap: Record<string, number> = {}

					// Calculate USD value for each token
					for (const token of tokens) {
						const tokenBalanceWei = token.wallets[address!]?.balance
						if (tokenBalanceWei && tokenBalanceWei !== '0') {
							const usdValue = await convertWeiToUsd(
								tokenBalanceWei
							)
							usdMap[token.address] = usdValue ?? 0
						} else {
							usdMap[token.address] = 0
						}
					}
					setTokenValuesInUsd(usdMap)
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
					<button
						onClick={() =>
							navigate(
								`/details/${token.symbol}/${token.name}/${
									token.address
								}/${
									tokenValuesInUsd[token.address] || 0
								}/${encodeURIComponent(token.logoURI)}`
							)
						}
						className='w-full'
						key={token.address}
					>
						<TokenCard
							key={token.address}
							name={token.name}
							symbol={token.symbol}
							amount={(tokenValuesInUsd[token.address] || 0)
								.toFixed(2)
								.toString()}
							imageUrl={token.logoURI}
						/>
					</button>
				))}
			</div>

			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='home' />
			</div>
		</div>
	)
}

export default Home
