import React, { type JSX } from 'react'

function CircularIconContainer({ icon }: { icon?: JSX.Element }) {
	return (
		<div className='flex justify-center items-center w-16 h-16 bg-black1 rounded-full inset-shadow-icon'>
			{icon && icon}
		</div>
	)
}

export default CircularIconContainer
