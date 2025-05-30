import { SocketContext } from "../../context/Context"

function GameInfoDesktop({}) {
    const { players, currentTime } = useContext(SocketContext);
    return (
        <div className="flex flex-row justify-between w-full">
            <Avatar>
        </div>
    )
}