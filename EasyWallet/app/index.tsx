import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
	const signedIn = false
	const [isMounted, setIsMounted] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (!isMounted) return
		if (!signedIn) {
			router.replace('/(authentication)/login')
		} else {
			return
		}
	})

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ActivityIndicator size='large' />
		</View>
	)
}
