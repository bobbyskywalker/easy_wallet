export const getTokenStats = async (name: string) => {
	try {
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/getTokenStats/${name}`
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
