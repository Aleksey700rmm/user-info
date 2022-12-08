import "../ParamsList/ParamsList.sass";
import { ScreenParams } from "../App/App";

interface BrowserInfoItemProps {
    IP: string | null;
    OS: string | null | undefined;
    screenParams: ScreenParams | null;
    networkSpeed: null | number;
    threadsNumber: null | number;
}

const UserInfoItem = (props: BrowserInfoItemProps) => {
    return (
        <div className="list-item">
            <h3>Информация о пользователе:</h3>
            <div className="list-item-descr">{`IP адрес: ${props.IP}`}</div>
            <div className="list-item-descr">{props.networkSpeed ? `пропускная способность: ${props.networkSpeed} Mbps` : "Не удалось определить"}</div>
            <div className="list-item-descr">{`Операционная система: ${props.OS}`}</div>
            <div className="list-item-descr">{`Параметры экрана: ширина ${props.screenParams?.width}px длина ${props.screenParams?.height}px`}</div>
            <div className="list-item-descr">{`Количество потоков: ${props.threadsNumber}`}</div>
        </div>
    );
};

export default UserInfoItem;
