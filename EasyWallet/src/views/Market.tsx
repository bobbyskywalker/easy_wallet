import BottomNavBar from '../components/BottomNavBar'

const Market = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold mb-4'>Market</h1>
			<p className='text-gray-500'>This is the Market view.</p>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='market' />
			</div>
		</div>
	)
}

export default Market
