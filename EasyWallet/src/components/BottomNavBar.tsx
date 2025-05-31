import { ReactComponent as Home } from '../assets/home.svg'
import { ReactComponent as Market } from '../assets/market.svg'
import { ReactComponent as Assets } from '../assets/asset.svg'
import { ReactComponent as Menu } from '../assets/menu.svg'
import { ReactComponent as Swap } from '../assets/swap.svg'
import type { JSX } from 'react'
import { useNavigate } from 'react-router'

type NavKey = 'home' | 'market' | 'assets' | 'menu'

interface BottomNavBarProps {
	active: NavKey
}

interface NavButtonProps {
	icon: JSX.Element
	label: string
	active: boolean
	onClick?: () => void
}

function BottomNavBar({ active }: BottomNavBarProps) {
	const navigate = useNavigate()

	return (
		<div className='relative bg-[#1a1d1d] h-[80px] w-full rounded-t-2xl flex items-center justify-between px-6 text-white shadow-lg fixed bottom-0'>
			{/* Home */}
			<NavButton
				icon={<Home className='w-[22px] h-[22px]' />}
				label='Home'
				active={active === 'home'}
				onClick={() => navigate('/home', { replace: true })}
			/>

			{/* Market */}
			<NavButton
				icon={<Market className='w-[22px] h-[22px]' />}
				label='Market'
				active={active === 'market'}
				onClick={() => navigate('/market', { replace: true })}
			/>

			{/* Center Floating Swap Button */}
			<button onClick={() => navigate('/swap')}>
				<div className='absolute -top-6 left-1/2 transform -translate-x-1/2'>
					<div className='w-[64px] h-[64px] bg-[#B6FF4E] rounded-full flex items-center justify-center shadow-lg'>
						<Swap className='w-[28px] h-[28px] text-black' />
					</div>
				</div>
			</button>

			{/* Assets */}
			<NavButton
				icon={<Assets className='w-[22px] h-[22px]' />}
				label='Assets'
				active={active === 'assets'}
				onClick={() => navigate('/assets', { replace: true })}
			/>

			{/* Menu */}
			<NavButton
				icon={<Menu className='w-[22px] h-[22px]' />}
				label='Menu'
				active={active === 'menu'}
				onClick={() => navigate('/menu', { replace: true })}
			/>
		</div>
	)
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
	return (
		<button onClick={onClick}>
			<div className='flex flex-col items-center gap-1 flex-1'>
				<div
					className={`${active ? 'text-lime-400' : 'text-gray-400'}`}
				>
					{icon}
				</div>
				<span
					className={`text-xs ${
						active ? 'text-lime-400' : 'text-gray-400'
					}`}
				>
					{label}
				</span>
			</div>
		</button>
	)
}

export default BottomNavBar
