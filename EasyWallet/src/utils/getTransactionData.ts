export const getSwapData = async (address: string) => {
	try {
		const response = await fetch(
			'https://evolutionary-iris-agme-3c325729.koyeb.app/swap',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					src_token: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
					dst_token: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
					amount: 10000000000000,
					wallet_address: address,
				}),
			}
		)
		if (!response.ok) {
			throw new Error('Failed to fetch swap data')
		}
		const data = await response.json()
		console.log('Swap data:', data)
		return data
	} catch (error) {
		console.error('Error fetching swap data:', error)
		return null
	}
}
