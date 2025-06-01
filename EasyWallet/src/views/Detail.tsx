import { useEffect, useState } from 'react'
import { ReactComponent as SendIcon } from '../assets/send.svg'
import { ReactComponent as ReceiveIcon } from '../assets/receive.svg'
import { ReactComponent as SwapIcon } from '../assets/reverse.svg'
import CircularIconContainer from '../components/CircularIconContainer'
import { useNavigate, useParams } from 'react-router'
import { getTokenData, getTokenStats } from '../utils/getTokenData'
import RiskContainer from './RiskContainer'
import { Ban, Calendar, User, WalletMinimal } from 'lucide-react'

interface CryptoInfo {
	market_cap: number
	circulating_supply: number
	max_supply: number
	total_supply: number
	all_time_high: number
	all_time_low: number
	short_description: string
}

const formatNumber = (value: number): string => {
	if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
	if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`
	return value.toString()
}

const TokenDetails = () => {
	const navigate = useNavigate()
	const { symbol, name, address, price, logoURI } = useParams<{
		symbol: string
		name: string
		address: string
		price: string
		logoURI: string
	}>()

	const encodedLogoURI = logoURI ? decodeURIComponent(logoURI) : ''
	const [tokenStats, setTokenStats] = useState<CryptoInfo | null>(null)
	const [tokenRisk, setTokenRisk] = useState<any>(null)

	useEffect(() => {
		const fetchData = async () => {
			if (tokenStats && tokenRisk) return
			try {
				if (!tokenStats) {
					const tokenStatsData: CryptoInfo = await getTokenStats(
						name!
					)
					setTokenStats(tokenStatsData)
				}
				if (!tokenRisk) {
					const tokenData = await getTokenData(address!)
					console.log('Token Data:', tokenData)
					setTokenRisk(tokenData)
				}
			} catch (error) {
				console.error('Error fetching token details:', error)
			}
		}
		fetchData()
	}, [name])

	if (!symbol || !name || !address || !price) {
		return <div className='text-white'>Invalid token details</div>
	}

	return (
		<div className='min-h-screen bg-black text-white px-6 pt-6 pb-24'>
			{/* Header */}
			<div className='text-center mb-6'>
				<button
					className='absolute left-4 top-6 text-2xl'
					onClick={() => navigate(-1)}
				>
					←
				</button>
				<h1 className='text-lg font-semibold'>{symbol}</h1>
				<div className='mt-4 flex justify-center'>
					<CircularIconContainer
						icon={
							<img
								src={encodedLogoURI}
								alt={symbol}
								className='w-6 h-6 object-contain rounded-full'
							/>
						}
					/>
				</div>
				<div className='mt-4 text-3xl font-semibold'>${price}</div>
			</div>

			{/* Action Buttons */}
			<div className='flex justify-around mb-6'>
				{[
					{ icon: <SendIcon />, label: 'Send' },
					{ icon: <ReceiveIcon />, label: 'Receive' },
					{ icon: <SwapIcon />, label: 'Swap' },
				].map((action, i) => (
					<div key={i} className='flex flex-col items-center gap-2'>
						<div className='w-14 h-14 rounded-full bg-[#1F1F1F] flex items-center justify-center'>
							{action.icon}
						</div>
						<span className='text-sm text-white/80'>
							{action.label}
						</span>
					</div>
				))}
			</div>

			<p className='text-white font-semibold mb-5'>
				Risk Score: {tokenRisk?.risk?.score.toFixed(0)}/100
			</p>
			<div className='flex flex-col gap-7 mb-5'>
				<RiskContainer
					icon={<User />}
					title={`${
						tokenRisk?.holders_count?.score ?? 'N/A'
					} holders`}
					description={
						tokenRisk?.holders_count?.score_description ??
						'No description available.'
					}
				/>

				<RiskContainer
					icon={<WalletMinimal />}
					title={`${
						tokenRisk?.liquidity?.score
							? formatNumber(tokenRisk.liquidity.score)
							: 'N/A'
					} liquidity`}
					description={
						tokenRisk?.liquidity?.score_description ??
						'No description available.'
					}
				/>

				<RiskContainer
					icon={<Calendar />}
					title={`${
						tokenRisk?.token_age?.score
							? formatNumber(tokenRisk.token_age.score)
							: 'N/A'
					}`}
					description={
						tokenRisk?.token_age?.score_description ??
						'No description available.'
					}
				/>

				<RiskContainer
					icon={<Ban />}
					title={`${
						tokenRisk?.scam_report?.score
							? 'Token is flagged'
							: 'No scam report'
					}`}
					description={
						tokenRisk?.scam_report?.score_description ??
						'No description available.'
					}
				/>
			</div>

			{/* Token Stats */}
			<div className='mb-6'>
				<h2 className='text-sm font-semibold mb-2'>Token Stats</h2>
				{tokenStats ? (
					<div className='text-sm text-white/80 space-y-2'>
						<div className='flex justify-between'>
							<span>Market Cap</span>
							<span>${formatNumber(tokenStats.market_cap)}</span>
						</div>
						<div className='flex justify-between'>
							<span>Circulating Supply</span>
							<span>
								{formatNumber(tokenStats.circulating_supply)}
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Max Supply</span>
							<span>
								{tokenStats.max_supply
									? formatNumber(tokenStats.max_supply)
									: 'Unlimited'}
							</span>
						</div>
						<div className='flex justify-between'>
							<span>Total Supply</span>
							<span>{formatNumber(tokenStats.total_supply)}</span>
						</div>
						<div className='flex justify-between'>
							<span>All Time High</span>
							<span>${tokenStats.all_time_high}</span>
						</div>
						<div className='flex justify-between'>
							<span>All Time Low</span>
							<span>${tokenStats.all_time_low}</span>
						</div>
					</div>
				) : (
					<p className='text-gray-500 text-sm'>Loading stats...</p>
				)}
			</div>

			{/* About Section */}
			<div>
				<h2 className='text-sm font-semibold mb-2'>About {name}</h2>
				<p className='text-sm text-gray-400'>
					{tokenStats?.short_description ??
						'No description available.'}
				</p>
			</div>
		</div>
	)
}

export default TokenDetails
