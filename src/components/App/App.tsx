import React from "react";
import "./App.sass";
import ParamsList from "../ParamsList/ParamsList";
import { useState, useEffect } from "react";
import { detect } from "detect-browser";
import MapItem from "../MapItem/MapItem";

export interface ScreenParams {
    width: number;
    height: number;
}

export interface Located {
    latitude: number;
    longitude: number;
}

function App() {
    const [located, setLoacted] = useState<null | Located>(null);
    const [IP, setIP] = useState(null);
    const [browserName, setBrowserName] = useState<null | string>(null);
    const [prevPage, setPrevPage] = useState("");
    const [OS, setOS] = useState<null | string | undefined>(null);
    const [cookie, setCookie] = useState(false);
    const [screenParams, setScreenParams] = useState<null | ScreenParams>(null);
    const [browserStatus, setBrowserStatus] = useState<boolean>(true);
    const [networkSpeed, setNetworkSpeed] = useState<null | number>(null);
    const [threadsNumber, setThreadsNumber] = useState<null | number>(null);
    const [bowserLang, setBowserLang] = useState<null | string>("");
    const [multiTouch, setMultiTouch] = useState<boolean>(false);
    const [pdfEnabled, setPdfEnabled] = useState<boolean>(false);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => setLoacted(Object.assign({ latitude: position.coords.latitude, longitude: position.coords.longitude })));
        } else {
            setLoacted(null);
        }
    };

    const getIP = () => {
        fetch("https://ipapi.co/json/")
            .then((d) => d.json())
            .then((d) => setIP(d.ip));
    };

    const getBrowserV = () => {
        const browser = detect();
        const userBrowser = browser?.name + " " + browser?.version;
        const userOS = browser?.os;
        setBrowserName(userBrowser);
        setOS(userOS);
    };

    const getPrevPage = () => {
        setPrevPage(document.referrer);
    };

    const getPlatform = () => {
        const userCookie = navigator.cookieEnabled;
        setCookie(userCookie);
    };

    const getScreenParams = () => {
        // eslint-disable-next-line no-restricted-globals
        setScreenParams({ width: screen.width, height: screen.height });
    };

    const getBrowserStatus = () => {
        const status = navigator.onLine;
        setBrowserStatus(status);
    };

    const getNetworkInfo = () => {
        const network: number | null = (navigator as Record<string, any>).connection?.downlink ?? null;
        setNetworkSpeed(network);
    };

    const getThreads = () => {
        const threads = navigator.hardwareConcurrency;
        setThreadsNumber(threads);
    };

    const getBrowserLang = () => {
        const language = navigator.language;
        setBowserLang(language);
    };

    const getMultiTouch = () => {
        const multiTouchs = navigator.maxTouchPoints;
        if (multiTouchs > 1) {
            setMultiTouch(true);
        }
    };

    const getPdfEnabled = () => {
        if (navigator.pdfViewerEnabled) {
            setPdfEnabled(true);
        }
    };

    const getData = () => {
        getLocation();
        getBrowserV();
        getPrevPage();
        getPlatform();
        getScreenParams();
        getBrowserStatus();
        getNetworkInfo();
        getThreads();
        getBrowserLang();
        getMultiTouch();
        getPdfEnabled();
    };

    useEffect(() => {
        getData();
        getIP();
        let intervalId = setInterval(() => {
            getData();
        }, 20 * 1000);

        return function cleanup() {
            clearInterval(intervalId)
        }
    }, []);

    return (
        <div className="app">
            <h1>browser params</h1>
            <ParamsList
                IP={IP}
                browserName={browserName}
                prevPage={prevPage}
                OS={OS}
                cookie={cookie}
                screenParams={screenParams}
                browserStatus={browserStatus}
                networkSpeed={networkSpeed}
                threadsNumber={threadsNumber}
                bowserLang={bowserLang}
                multiTouch={multiTouch}
                pdfEnabled={pdfEnabled}
            />
            <div className="location-wrapper">
                <h2>Ваше местоположение:</h2>
                <MapItem located={located} />
            </div>
        </div>
    );
}

export default App;
