interface TokenCardProps {
	imageUrl?: string
	symbol: string
	name: string
	amount: string
	onPress?: () => void
}

function TokenCard({
	imageUrl,
	symbol,
	name,
	amount,
	onPress,
}: TokenCardProps) {
	return (
		<div
			onClick={onPress}
			className='
        w-[163px] h-[132px] p-4
        bg-black1 rounded-[12px]
        backdrop-blur-[17.5px]
        inset-shadow-icon
        flex flex-col justify-between
        text-white
        cursor-pointer
      '
		>
			<div className='flex items-center gap-3'>
				<div className='w-[48px] h-[48px] rounded-full bg-[#FFD166] flex items-center justify-center overflow-hidden'>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={symbol}
							className='w-5 h-5 object-contain'
						/>
					) : null}
				</div>
				<div className='flex flex-col'>
					<span className='text-sm font-semibold'>{symbol}</span>
					<span className='text-xs text-gray-400'>{name}</span>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<span className='text-[20px] font-semibold'>${amount}</span>
			</div>
		</div>
	)
}

export default TokenCard
