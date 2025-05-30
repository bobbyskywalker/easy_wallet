import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const PrimaryButton = ({
	title,
	onPress,
}: {
	title: string
	onPress: () => void
}) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<LinearGradient
				colors={['#B7FF38', '#7EC20A']}
				style={styles.container}
			>
				<Text style={styles.text}>{title}</Text>
			</LinearGradient>
		</TouchableOpacity>
	)
}

export default PrimaryButton

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: 60,
		maxHeight: 60,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 14,
		fontWeight: '500',
	},
})
