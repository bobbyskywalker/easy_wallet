import React, { type JSX } from 'react'

function CircularIconContainer({ icon }: { icon?: JSX.Element }) {
	return (
		<div className="flex justify-center items-center w-16 h-16 bg-black1 rounded-full inset-shadow-icon overflow-hidden">
			<div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center object-contain">
				{icon}
			</div>
		</div>
	)
}

export default CircularIconContainer
