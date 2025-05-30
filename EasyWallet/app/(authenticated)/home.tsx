import IconButton from '@/components/IconButton'
import { Colors } from '@/constants/Colors'
import { ArrowDown, ArrowLeftRight, ArrowUp } from 'lucide-react-native'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

const Home = () => {
	const data = [
		{ value: 10 },
		{ value: 20 },
		{ value: 15 },
		{ value: 30 },
		{ value: 25 },
		{ value: 40 },
		{ value: 35 },
	]
	const spacing = 350 / (data.length - 1)
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.walletAddress} numberOfLines={1}>
					0x742d35Cc6634C0532925a3b844Bc454e4438f44e
				</Text>
				<Text style={styles.amountText}>$3012318.29</Text>
				<View style={{ alignItems: 'center' }}>
					<LineChart
						areaChart
						curved
						data={data}
						height={125}
						startFillColor='#5ED5A8'
						endFillColor='#0B0B0B'
						startOpacity={0.75}
						endOpacity={0}
						color={Colors.utilsGreen}
						hideDataPoints
						hideRules
						hideYAxisText
						xAxisThickness={0}
						yAxisThickness={0}
						width={350}
						yAxisLabelWidth={0}
						disableScroll
						initialSpacing={0}
						endSpacing={0}
						spacing={spacing}
					/>
				</View>
				<View style={styles.topIconsContainer}>
					<IconButton
						icon={<ArrowUp size={24} color={Colors.mainGreen} />}
						title='Send'
						onPress={() => {}}
					/>
					<IconButton
						icon={<ArrowDown size={24} color={Colors.mainGreen} />}
						title='Receive'
						onPress={() => {}}
					/>
					<IconButton
						icon={
							<ArrowLeftRight
								size={24}
								color={Colors.mainGreen}
							/>
						}
						title='Swap'
						onPress={() => {}}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.blackBG,
	},
	content: {
		flex: 1,
		marginHorizontal: 26,
		alignItems: 'center',
	},
	walletAddress: {
		fontSize: 12,
		color: Colors.mainWhite,
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: Colors.black1,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Colors.black2,
		maxWidth: 150,
	},
	amountText: {
		fontSize: 36,
		fontWeight: '600',
		color: Colors.mainWhite,
	},
	topIconsContainer: {
		flexDirection: 'row',
		gap: 40,
	},
})
