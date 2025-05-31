import React from 'react'
import CircularIconContainer from './CircularIconContainer'

interface FeatureButtonProps {
	Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
	title: string
	onClick?: () => void
}

function FeatureButton({ Icon, title, onClick }: FeatureButtonProps) {
	return (
		<button onClick={onClick}>
			{Icon && <CircularIconContainer icon={<Icon />} />}
			{title && (
				<p className='text-white text-sm mt-1 font-medium'>{title}</p>
			)}
		</button>
	)
}

export default FeatureButton
