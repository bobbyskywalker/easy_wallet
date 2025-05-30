import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import IconContainer from './IconContainer'

const IconButton = ({
	icon,
	title,
	onPress,
}: {
	icon: React.ReactNode
	title: string
	onPress: () => void
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<IconContainer icon={icon} />
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	)
}

export default IconButton

const styles = StyleSheet.create({
	title: {
		fontSize: 12,
		color: Colors.mainWhite,
		textAlign: 'center',
		marginTop: 8,
	},
})
