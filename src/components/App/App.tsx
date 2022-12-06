import React from "react";
import "./App.sass";
import ParamsList from "../ParamsList/ParamsList";
import { useState, useEffect } from "react";
import { setPriority } from "os";
import { detect } from "detect-browser";

export interface ScreenParams {
    width: number;
    height: number;
}

function App() {
    const [location, setLoaction] = useState<null | Record<string, any>>(null);
    // const [browserInfo, setBrowserInfo] = useState(null)
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
            console.log("gay");
            // navigator.geolocation.getCurrentPosition((position) => setLoaction({latitude: position.coords.latitude}));
            navigator.geolocation.getCurrentPosition((position) => setLoaction(Object.assign({ latitude: position.coords.latitude, longitude: position.coords.longitude })));
        } else {
            setLoaction(null);
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

    const getSmth = () => {
        document.onmousemove = function mouse() {
            console.log(window.AudioParam);
        };
        // const link = window.opener
        // console.log(link)
        // const language = navigator.vendorSub
        // setBowserLang(language)
        // сonsole.log(event)
        // console.log(event)
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
        getSmth();
    };

    useEffect(() => {
        getData();
        getIP();
        // setInterval(() => {
        //     getData()
        // }, 5 * 1000)
    }, []);

    return (
        <div className="app">
            <h1>browser params</h1>
            <ParamsList
                location={location}
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
        </div>
    );
}

export default App;
