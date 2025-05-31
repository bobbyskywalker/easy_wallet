import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'
import Home from './views/Home'

const queryClient = new QueryClient()

const generalConfig = {
	projectId,
	networks,
	metadata,
	themeMode: 'dark' as const,
	themeVariables: {
		'--w3m-accent': '#000000',
	},
	mobile: {
		enabled: true,
		showQRCode: true,
		showWalletConnect: true
	},
	onError: (error: Error) => {
		console.log('AppKit Error:', error)
	}
}

createAppKit({
	adapters: [wagmiAdapter],
	...generalConfig,
})

export function App() {
	return (
			<WagmiProvider config={wagmiAdapter.wagmiConfig}>
				<QueryClientProvider client={queryClient}>
					<Home />
				</QueryClientProvider>
			</WagmiProvider>
	)
}

export default App
