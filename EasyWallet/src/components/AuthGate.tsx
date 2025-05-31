import { useAppKitAccount } from '@reown/appkit/react'
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

interface AuthGateProps {
	children: ReactNode
}

const AuthGate = ({ children }: AuthGateProps) => {
	const { isConnected } = useAppKitAccount()

	console.log('AuthGate isConnected:', isConnected)

	if (!isConnected) {
		return <Navigate to='/connect-wallet' replace />
	}

	return <>{children}</>
}

export default AuthGate
