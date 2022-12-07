import "./ParamsList.sass";
import BrowserInfoItem from "../BrowserInfoItem/BrowserInfoItem";
import UserInfoItem from "../UserInfoItem/UserInfoItem";
import { ScreenParams } from "../App/App";

interface ParamsListProps {
    IP: string | null;
    browserName: string | null;
    prevPage: string;
    OS: string | null | undefined;
    cookie: boolean;
    screenParams: ScreenParams | null;
    browserStatus: boolean;
    networkSpeed: null | number;
    threadsNumber: null | number;
    bowserLang: null | string;
    multiTouch: boolean;
    pdfEnabled: boolean;
}

const ParamsList = (props: ParamsListProps) => {
    return (
        <div className="params-list">
            <BrowserInfoItem browserName={props.browserName} browserStatus={props.browserStatus} cookie={props.cookie} prevPage={props.prevPage} bowserLang={props.bowserLang} multiTouch={props.multiTouch} pdfEnabled={props.pdfEnabled} />
            <UserInfoItem OS={props.OS} networkSpeed={props.networkSpeed} IP={props.IP} screenParams={props.screenParams} threadsNumber={props.threadsNumber} />
        </div>
    );
};

export default ParamsList;
