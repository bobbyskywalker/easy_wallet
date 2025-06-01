import type { JSX } from 'react'

const RiskContainer = ({
	icon,
	title,
	description,
}: {
	icon: JSX.Element
	title: string
	description: string
}) => {
	return (
		<div className='flex'>
			<div className='bg-black1 max-w-20 min-w-20 max-h-20 min-h-20 rounded-lg flex items-center justify-center mb-3'>
				{icon}
			</div>
			<div className='ml-3 flex flex-col justify-between h-15'>
				<h3 className='text-md font-semibold text-white'>{title}</h3>
				<p className='text-xs text-black2'>{description}</p>
			</div>
		</div>
	)
}

export default RiskContainer
