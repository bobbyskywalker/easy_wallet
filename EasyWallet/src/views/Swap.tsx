import React from 'react'
import { useNavigate } from 'react-router'
import PrimaryButton from '../components/PrimaryButton'
import BottomNavBar from '../components/BottomNavBar'
import CircularIconContainer from '../components/CircularIconContainer';
import { ReactComponent as Reverse } from '../assets/reverse.svg';

const TokenInput = ({
  iconUrl,
  tokenSymbol,
  value,
  onChange,
  balance,
  info
}: {
  iconUrl: string;
  tokenSymbol: string;
  value: string;
  onChange: (val: string) => void;
  balance: string;
  info: string;
}) => {
  return (
	<div>
        <p className="mb-2 text-sm">{info}</p>
		<div className="bg-[#181B1B] rounded-2xl px-5 py-4 w-full">
		<div className="flex items-center justify-between">
			<input
			type="text"
			inputMode="decimal"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="bg-transparent text-white text-2xl font-semibold outline-none w-full"
			placeholder="0.0"
			/>

			<div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-full shrink-0">
			<CircularIconContainer
				icon={
					<img
					src={iconUrl}
					alt={tokenSymbol}
					className="w-6 h-6 object-contain"
					onError={(e) => {
						e.currentTarget.src = '/fallback-icon.png';
					}}
					/>
				}
				/>
			<span className="text-white text-sm font-medium">{tokenSymbol}</span>
			<span className="text-lime-400 text-base">⌄</span>
			</div>
		</div>
		</div>
		<p className="text-sm text-white-400/20 mt-2">Balance: {balance}</p>
	</div>
  );
};

export default function SwapScreen() {
  const [payAmount, setPayAmount] = React.useState('');
  const [receiveAmount, setReceiveAmount] = React.useState('');

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-6">Swap</h1>

      <div className="w-full max-w-md space-y-6">
        <div>
          <TokenInput
            iconUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            tokenSymbol="BTC"
            value={payAmount}
            onChange={setPayAmount}
            balance="100 BTC"
			info="You pay"
          />
        </div>

        <div className="flex justify-center">
           <CircularIconContainer
			icon={<Reverse className="w-6 h-6" />}
			/>
        </div>

        <div>
          <TokenInput
            iconUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
            tokenSymbol="ETH"
            value={receiveAmount}
            onChange={setReceiveAmount}
            balance="100 BTC"
			info="You recive"
          />
        </div>

        <p className="text-center text-sm text-gray-400">1 BTC ~= 1000 ETH</p>

        <PrimaryButton label="Swap" onClick={() => alert('Swapped')} />
      </div>

      {/* Bottom Navigation */}
      <div className='w-full bottom-0 fixed'>
				<BottomNavBar active='home' />
		</div>
      </div>
  );
}