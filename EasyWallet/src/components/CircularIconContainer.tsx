import { Camera } from 'lucide-react'
import React from 'react'

function CircularIconContainer() {
	return (
		<div className='flex justify-center items-center w-16 h-16 bg-black1 rounded-full inset-shadow-icon'>
			<Camera size={24} color='white' />
		</div>
	)
}

export default CircularIconContainer