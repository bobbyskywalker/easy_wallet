import { useAppKit } from "@reown/appkit/react"
import PrimaryButton from "../components/PrimaryButton"
import BottomNavBar from "../components/BottomNavBar"
import CircularIconContainer from "../components/CircularIconContainer"
import TokenCard from "../components/TokenCard"
import {ReactComponent as BTC} from '../assets/BTC.svg'
import FeatureButton from "../components/FeatureButton"
const Home = () => {
    const { open } = useAppKit()

    return (
        <div>
            <PrimaryButton label="Connect a Wallet" onClick={() => open()} />
            <BottomNavBar active="assets" />
            <CircularIconContainer />
            <TokenCard icon={BTC} abbrev="Bitcoin" name="BTC" owns="200" change={20} />
            <FeatureButton icon={BTC} />
        </div>
    )
}

export default Home