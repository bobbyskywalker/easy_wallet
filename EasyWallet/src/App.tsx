import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'
import ConnectWallet from './views/ConnectWallet'
import { Navigate, Route, Routes } from 'react-router'
import AuthGate from './components/AuthGate'
import Home from './views/Home'
import Market from './views/Market'
import History from './views/History'
import Menu from './views/Menu'
import Swap from './views/Swap'

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
		showWalletConnect: true,
	},
	onError: (error: Error) => {
		console.log('AppKit Error:', error)
	},
}

createAppKit({
	adapters: [wagmiAdapter],
	...generalConfig,
})

export function App() {
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path='/connect-wallet' element={<ConnectWallet />} />

					<Route
						path='/home'
						element={
							<AuthGate>
								<Home />
							</AuthGate>
						}
					/>

					<Route
						path='/market'
						element={
							<AuthGate>
								<Market />
							</AuthGate>
						}
					/>

					<Route
						path='/history'
						element={
							<AuthGate>
								<History />
							</AuthGate>
						}
					/>

					<Route
						path='/menu'
						element={
							<AuthGate>
								<Menu />
							</AuthGate>
						}
					/>

					<Route
						path='/swap'
						element={
							<AuthGate>
								<Swap />
							</AuthGate>
						}
					/>

					<Route
						path='*'
						element={<Navigate to='/connect-wallet' replace />}
					/>
				</Routes>
			</QueryClientProvider>
		</WagmiProvider>
	)
}

export default App
