import BottomNavBar from '../components/BottomNavBar'
import { TokenBar } from '../components/TokenBar'
import { TransactionCard } from '../components/TransactionCard'
import { ReactComponent as Succes } from '../assets/success.svg'


const Assets = () => {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<h1 className='text-2xl font-bold mb-4'>Assets</h1>
			<p className='text-gray-500'>This is the Assets page.</p>
			<TokenBar logo={
			<img
			src="https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png"
			alt="BCT"
			className="w-6 h-6 object-contain"
			/>}
			symbol="BCT"
			name="Bitcoin"
			value="3.001"
			usdValue="3000"
			change="4.5"
			changePositive={true}
		/>
			<TransactionCard icon={Succes}
			status="Completed"
			description="tralalala"
			onClose={() => console.log('Closed')}
      		onDone={() => console.log('Done')}
			/>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='assets' />
			</div>
		</div>
	)
}

export default Assets
