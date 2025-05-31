import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

export const projectId =
	import.meta.env.VITE_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694'

if (!projectId) {
	throw new Error('Project ID is not defined')
}

export const metadata = {
	name: 'EasyWallet',
	description: 'A beginner-friendly wallet for Web3',
	url: 'https://reown.com',
	icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

export const networks = [mainnet] as [AppKitNetwork, ...AppKitNetwork[]]

export const wagmiAdapter = new WagmiAdapter({
	projectId,
	networks,
})

export const config = wagmiAdapter.wagmiConfig
