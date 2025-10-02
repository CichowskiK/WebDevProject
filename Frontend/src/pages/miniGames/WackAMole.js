import WorkInProgress from "../../components/WorkInProgress"
import { useNavigate} from "react-router-dom"
import "./Games.css"

const MemoGame = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="top-bar">
                <h1>Wack A Mole</h1>
                <button
                    onClick={() => navigate("/pokemonCatching")}
                >
                    Go back
                </button>
            </div>
            <WorkInProgress/>
        </div>
    )
}

export default MemoGame