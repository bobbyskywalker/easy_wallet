import { createAppKit, useAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'
import PrimaryButton from './components/PrimaryButton'
import CircularIconContainer from './components/CircularIconContainer'

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
	const { open } = useAppKit()

	return (
		<div className={'px-2'}>
			<WagmiProvider config={wagmiAdapter.wagmiConfig}>
				<QueryClientProvider client={queryClient}>
					<PrimaryButton
						label='Connect a Wallet'
						onClick={() => {
							open()
						}}
					/>
					<CircularIconContainer />
				</QueryClientProvider>
			</WagmiProvider>
		</div>
	)
}

export default App
