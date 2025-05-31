export const getWalletBalance = async (address: string) => {
	try {
		console.log('Fetching wallet balance for address:', address)
		const response = await fetch(
			`https://evolutionary-iris-agme-3c325729.koyeb.app/wallet-balance/${address}`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const jsonData = await response.json()
		return jsonData.total_value_usd
	} catch (error) {
		return null
	}
}
