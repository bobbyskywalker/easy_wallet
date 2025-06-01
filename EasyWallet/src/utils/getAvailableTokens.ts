import type { Token } from '../views/Market'

type SimplifiedToken = {
	symbol: string
	name: string
	logoURI: string
	price: number | null
	address: string
}

const coingeckoIdMap: Record<string, string> = {
	TRYB: 'bilira',
	cUSDCv3: 'compound-usd-coin',
	LTO: 'lto-network',
	BNB: 'binancecoin',
	RSR: 'reserve-rights-token',
	HIGH: 'highstreet',
	wALV: 'alvey-chain',
	NEAR: 'near',
	PRIME: 'echelon-prime',
}

export const getAvailableTokens = async (): Promise<SimplifiedToken[]> => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/get-available-tokens`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const jsonData: Token[] = await response.json()

		const ids = Object.values(coingeckoIdMap).join(',')
		const priceRes = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
		)
		const prices = await priceRes.json()

		const simplifiedTokens: SimplifiedToken[] = jsonData.map((token) => {
			const coingeckoId = coingeckoIdMap[token.symbol]
			const price = coingeckoId ? prices[coingeckoId]?.usd ?? null : null

			return {
				symbol: token.symbol,
				name: token.name,
				logoURI: token.logoURI,
				price,
				address: token.address,
			}
		})

		return simplifiedTokens
	} catch (error) {
		console.error('Error fetching tokens or prices:', error)
		return []
	}
}
