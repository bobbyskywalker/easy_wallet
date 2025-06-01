import BottomNavBar from '../components/BottomNavBar'
import { useEffect, useState } from 'react'
import { getAvailableTokens } from '../utils/getAvailableTokens'

// Define type matching what getAvailableTokens returns
type SimplifiedToken = {
	symbol: string
	name: string
	logoURI: string
	price: number | null
}

import { TokenBar } from '../components/TokenBar'
import SearchBar from '../components/SearchBar'

const Market = () => {
	const [loading, setLoading] = useState(false)
	const [availableTokens, setAvailableTokens] = useState<SimplifiedToken[]>(
		[]
	)
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const tokens = await getAvailableTokens()
				if (tokens) {
					setAvailableTokens(tokens)
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
				<p className='text-white'>Loading tokens...</p>
			) : (
				<div className='space-y-4 w-full max-w-xl mb-30'>
					<SearchBar
						value={searchValue}
						onValueChange={setSearchValue}
					/>
					{availableTokens.length === 0 ? (
						<p className='text-gray-500'>No tokens available.</p>
					) : (
						availableTokens
							.filter((token) =>
								token.name
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							)
							.map((token) => (
								<TokenBar
									key={token.symbol}
									logoUrl={token.logoURI}
									symbol={token.symbol}
									name={token.name}
									price={token.price ?? 0}
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
