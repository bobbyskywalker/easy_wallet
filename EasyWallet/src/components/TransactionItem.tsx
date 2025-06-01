import CircularIconContainer from './CircularIconContainer'

interface TransactionItemProps {
	imageUrl: string
	label: string // e.g., "Sent BTC"
	status: string // e.g., "Confirmed"
	usdAmount: string // e.g., "$52.96"
	tokenAmount: string // e.g., "0.02 BTC"
}

const TransactionItem = ({
	imageUrl,
	label,
	status,
	usdAmount,
	tokenAmount,
}: TransactionItemProps) => {
	return (
		<div className='flex items-center justify-between w-full max-w-xl px-1 py-3 border-b border-white/10'>
			{/* Left: Icon + label */}
			<div className='flex items-center gap-4'>
				<CircularIconContainer
					icon={
						<img
							src={imageUrl}
							alt={label}
							className='w-6 h-6 object-contain rounded-full'
						/>
					}
				/>
				<div className='flex flex-col'>
					<span className='text-base font-medium text-white'>
						{label}
					</span>
					<span className='text-sm text-gray-400'>{status}</span>
				</div>
			</div>

			{/* Right: Amounts */}
			<div className='flex flex-col items-end'>
				<span className='text-base font-semibold text-white'>
					{usdAmount}
				</span>
				<span className='text-sm text-gray-500'>{tokenAmount}</span>
			</div>
		</div>
	)
}

export default TransactionItem
