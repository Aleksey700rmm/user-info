import "./BrowserInfoItem.sass";

interface BrowserInfoItemProps {
    browserName: string | null;
    browserStatus: boolean;
    cookie: boolean;
    prevPage: string;
    bowserLang: null | string;
    multiTouch: boolean;
    pdfEnabled: boolean;
}

const BrowserInfoItem = (props: BrowserInfoItemProps) => {
    return (
        <div className="list-item">
            <h3>Данные о браузере:</h3>
            <div className="list-item-descr">{`Версия: ${props.browserName}`}</div>
            <div className="list-item-descr">{`Статус в сети: ${props.browserStatus ? "Online" : "Offline"}`}</div>
            <div className="list-item-descr">{`Доступ к cookie: ${props.cookie ? "Разрешён" : "Запрешён"}`}</div>
            <div className="list-item-descr">{`Предыдущая страница: ${props.prevPage ? props.prevPage : "Не удалось найти"}`}</div>
            <div className="list-item-descr">{`Язык браузера: ${props.bowserLang}`}</div>
            <div className="list-item-descr">{`Поддержка multi-touch: ${props.multiTouch ? "Есть" : "Нет"}`}</div>
            <div className="list-item-descr">{`Встроенное отображение PDF: ${props.multiTouch ? "Есть" : "Нет"}`}</div>
        </div>
    );
};

export default BrowserInfoItem;
