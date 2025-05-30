import PrimaryButton from '@/components/PrimaryButton'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Login = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Image
					source={require('@/assets/images/main-header.png')}
					style={styles.imageContainer}
				/>
				<View>
					<Text style={styles.titleText}>EasyWallet</Text>
					<Text style={styles.descriptionText}>
						Easily link your crypto wallet using WalletConnect to
						explore all features of EasyWallet. Your connection is
						safe, private, and only you control your assets.
					</Text>
				</View>
				<PrimaryButton
					title='Connect a Wallet'
					onPress={() => {
						console.log('Connect a Wallet Pressed')
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.blackBG,
	},
	content: {
		flex: 1,
		marginHorizontal: 26,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 36,
		fontWeight: '700',
		textAlign: 'center',
		color: Colors.mainWhite,
	},
	descriptionText: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.black2,
		textAlign: 'center',
		marginTop: 18,
	},
})
