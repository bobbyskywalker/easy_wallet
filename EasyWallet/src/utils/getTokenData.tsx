export const getTokenStats = async (name: string) => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/get-tokens-stats/${name}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch token stats')
		}
		const data = await response.json()
		if (data.length === 0) {
			return null
		}
		return data
	} catch (error) {
		console.error('Error fetching token stats:', error)
		return null
	}
}

export const getTokenData = async (address: string) => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/token-data/${address}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch token data')
		}
		const data = await response.json()
		if (data.length === 0) {
			return null
		}
		return data
	} catch (error) {
		console.error('Error fetching token data:', error)
		return null
	}
}
