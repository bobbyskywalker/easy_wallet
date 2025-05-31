import { useNavigate } from 'react-router'
import PrimaryButton from '../components/PrimaryButton'

const Swap = () => {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<h1 className='text-3xl text-white font-bold'>Swap</h1>
			<p className='text-white mt-4'>This feature is coming soon!</p>
			<PrimaryButton label='Go Back' onClick={() => navigate(-1)} />
		</div>
	)
}

export default Swap
