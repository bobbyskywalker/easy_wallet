import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const IconContainer = ({ icon }: { icon: React.ReactNode }) => {
	return (
		<View style={styles.container}>
			<View style={styles.insideContainer}>{icon}</View>
		</View>
	)
}

export default IconContainer

const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		borderRadius: 60,
		backgroundColor: Colors.black2,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	insideContainer: {
		width: 60,
		height: 60,
		borderRadius: 60,
		backgroundColor: Colors.black1,
		top: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
