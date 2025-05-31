import {ReactComponent as BTC} from './assets/BTC.svg';
import TokenCard from './components/TokenCard.tsx';

const Test = () => {
    return (
        <div>
            <TokenCard 
                icon={BTC} 
                abbrev="BTC" 
                name="Bitcoin" 
                owns={200} 
                change={4.5}
                onPress={() => {}}
            />
            {/* <BottomNavBar active="assets" /> */}
        </div>
    )
}

export default Test