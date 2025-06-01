import BottomNavBar from '../components/BottomNavBar'
import TransactionItem from '../components/TransactionItem'

const History = () => {
	return (
		<div className='min-h-screen bg-black text-white px-4 py-6 flex flex-col items-center'>
			<h1 className='text-xl font-semibold mb-6'>History</h1>

			<div className='w-full max-w-md flex flex-col gap-4'>
				<TransactionItem
					imageUrl='https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
					label='Sent BTC'
					status='Confirmed'
					usdAmount='$52.96'
					tokenAmount='0.02 BTC'
				/>
				<TransactionItem
					imageUrl='https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
					label='Received ETH'
					status='Pending'
					usdAmount='$140.20'
					tokenAmount='0.07 ETH'
				/>
			</div>

			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='history' />
			</div>
		</div>
	)
}

export default History
