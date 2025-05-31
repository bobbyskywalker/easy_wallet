import type { Token } from '../views/Home'

export const getAvailableTokens = async (): Promise<Token[]> => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/get-available-tokens`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const jsonData: Token[] = await response.json()
		return jsonData
	} catch (error) {
		console.error('Error fetching available tokens:', error)
		return []
	}
}
