import React, { useEffect, useState } from 'react'
import { ReactComponent as SendIcon } from '../assets/send.svg'
import { ReactComponent as ReceiveIcon } from '../assets/receive.svg'
import { ReactComponent as SwapIcon } from '../assets/reverse.svg'
import CircularIconContainer from '../components/CircularIconContainer'
import { useNavigate, useParams } from 'react-router'
import { getTokenStats } from '../utils/getTokenData'

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
	if (!symbol || !name || !address || !price) {
		return <div className='text-white'>Invalid token details</div>
	}
	const [tokenStats, setTokenStats] = useState<any>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const tokenStatsData = await getTokenStats(name)
				setTokenStats(tokenStatsData)
				console.log('Token Stats:', tokenStats)
			} catch (error) {
				console.error('Error fetching token details:', error)
			}
		}
		fetchData()
	}, [])

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
								alt='BTC'
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

			{/* Risk Assessment */}
			<div className='mb-6'>
				<h2 className='text-sm font-semibold mb-2'>Risk Assessment</h2>
				<div className='flex items-center gap-4 bg-[#1A1A1A] p-3 rounded-xl'>
					<div className='w-10 h-10 bg-[#2B2B2B] rounded-xl flex items-center justify-center'>
						<span className='text-xl'>📶</span>
					</div>
					<div>
						<p className='text-white text-sm font-medium'>
							Liquidity
						</p>
						<p className='text-gray-500 text-sm'>
							The liquidity is &lt; 10.000
						</p>
					</div>
				</div>
			</div>

			{/* Token Stats */}
			<div className='mb-6'>
				<h2 className='text-sm font-semibold mb-2'>Token Stats</h2>
				<div className='text-sm text-white/80 space-y-2'>
					<div className='flex justify-between'>
						<span>Market Cap</span>
						<span>$250M</span>
					</div>
					<div className='flex justify-between'>
						<span>Circulating Supply</span>
						<span>$10M</span>
					</div>
					<div className='flex justify-between'>
						<span>Max Supply</span>
						<span>5M</span>
					</div>
					<div className='flex justify-between'>
						<span>Total Supply</span>
						<span>9M</span>
					</div>
					<div className='flex justify-between'>
						<span>All Time High</span>
						<span>$40</span>
					</div>
					<div className='flex justify-between'>
						<span>All Time Low</span>
						<span>$4</span>
					</div>
				</div>
			</div>

			{/* About Section */}
			<div>
				<h2 className='text-sm font-semibold mb-2'>About Bitcoin</h2>
				<p className='text-sm text-gray-400'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Tellus nullam vitae nec vitae, volutpat orci dolor odio dui.
					Tellus euismod leo erat purus vitae phasellus volutpat amet.
				</p>
			</div>
		</div>
	)
}

export default TokenDetails
