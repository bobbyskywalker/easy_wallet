import BottomNavBar from '../components/BottomNavBar'
import { useEffect, useState } from 'react'
import { getAvailableTokens } from '../utils/getAvailableTokens'
import type { Token } from './Home'
import { TokenBar } from '../components/TokenBar'

const Market = () => {
	const [loading, setLoading] = useState(false)
	const [availableTokens, setAvailableTokens] = useState<Token[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const availableTokens = await getAvailableTokens()
				if (availableTokens) {
					setAvailableTokens(availableTokens)
					console.log('Available Tokens:', availableTokens)
				} else {
					console.error('Failed to fetch tokens')
				}
			} catch (error) {
				console.error('Error fetching wallet balance:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen px-4 pt-8'>
			{loading ? (
				<p>Loading tokens...</p>
			) : (
				<div className='space-y-4 w-full max-w-xl mb-30'>
					{availableTokens.length === 0 ? (
						<p className='text-gray-500'>No tokens available.</p>
					) : (
						availableTokens.map((token) => (
							<TokenBar
								key={token.address}
								logoUrl={token.logoURI}
								symbol={token.symbol}
								name={token.name}
								price={2431.21}
							/>
						))
					)}
				</div>
			)}

			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='market' />
			</div>
		</div>
	)
}

export default Market
