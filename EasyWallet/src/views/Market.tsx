import React from 'react';
import BottomNavBar from '../components/BottomNavBar';
import SearchBar from '../components/SearchBar.tsx';
import { TokenBar } from '../components/TokenBar';

const mockTokens = Array(6).fill({
  imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  symbol: 'BTC',
  name: 'Bitcoin',
  value: '3.00912',
  usdValue: '3000',
  change: '(+0.68%)',
  changePositive: true,
  chart: <img src="/chart-placeholder.png" alt="chart" className="h-8" />,
});

const Market = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 pt-6 pb-20 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4 w-full text-left">Market</h1>

      <div className="w-full max-w-md mb-6">
        <SearchBar />
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {mockTokens.map((token, index) => (
          <TokenBar key={index} {...token} />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className='w-full bottom-0 fixed'>
        <BottomNavBar active='market' />
      </div>
    </div>
  );
};

export default Market;
