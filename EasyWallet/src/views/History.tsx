import BottomNavBar from '../components/BottomNavBar'
import { TokenBar } from '../components/TokenBar'
import { TransactionCard } from '../components/TransactionCard'
import { ReactComponent as Succes } from '../assets/success.svg'


const History = () => {
	return (
		<div className='min-h-screen bg-black text-white px-4 py-6 flex flex-col items-center'>
			<h1 className='text-xl font-semibold mb-6'>History</h1>
			<p className='text-gray-500'>This is the history page.</p>
			<TokenBar
			imageUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
			symbol="BTC"
			name="Bitcoin"
			value="3.0"
			usdValue="3000"
			change="+2.5%"
			/>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='history' />
			</div>
		</div>
	)
}

export default History
