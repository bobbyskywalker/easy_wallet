import type { UserToken } from '../views/Home'

// Fetch user tokens (existing)
export const getUsersTokens = async (address: string): Promise<UserToken[]> => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/token-balance/${address}`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const jsonData: UserToken[] = await response.json()
		return jsonData
	} catch (error) {
		console.error('Error fetching available tokens:', error)
		return []
	}
}

export const convertWeiToUsd = async (wei: string): Promise<number> => {
	const ethPriceRes = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
	)
	const priceJson = await ethPriceRes.json()
	const ethPrice = priceJson.ethereum.usd // Current ETH price in USD

	const ethBalance = parseFloat(wei) / 1e18 // Convert WEI to ETH

	return ethBalance * ethPrice
}
