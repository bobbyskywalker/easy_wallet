import React from 'react';
import PrimaryButton from './components/PrimaryButton.jsx'; // adjust path if different
import FeatureButton from './components/FeatureButton.jsx'; // adjust path if different
import { ReactComponent as ReciveIcon } from './components/assets/recive.svg';
import { ReactComponent as BTC } from './components/assets/BTC.svg';
import TokenCard from './components/TokenCard.jsx';
import BottomNavBar from './components/BottomNavBar.jsx';

function App() {
	return (
		<div className='bg-blackBG min-h-screen flex justify-center items-center'>
			{/* <CircularIconContainer /> */}
			<PrimaryButton label="Connect Wallet" />
			<FeatureButton icon={ReciveIcon}/>
			<TokenCard icon={BTC} abbrev="BTC" name="Bitcoin" owns="200" change="4.5"/>
			<BottomNavBar active="assets" />

		</div>
	)
}

export default App
