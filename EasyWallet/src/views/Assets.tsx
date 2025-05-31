import BottomNavBar from '../components/BottomNavBar'

const Assets = () => {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<h1 className='text-2xl font-bold mb-4'>Assets</h1>
			<p className='text-gray-500'>This is the Assets page.</p>
			<div className='w-full bottom-0 fixed'>
				<BottomNavBar active='assets' />
			</div>
		</div>
	)
}

export default Assets
