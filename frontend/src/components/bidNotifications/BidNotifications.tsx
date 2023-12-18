import { useDispatch, useSelector } from 'react-redux';
import { selectNotification } from '../../app/selectors';
import { useEffect } from 'react';
import { clearNotification } from '../../app/store';
import {
    NOTIFICATION_MESSAGES,
    NOTIFICATION_STYLES,
} from '../../utils/constants'; 

const BidNotifications = () => {
    const notificationType = useSelector(selectNotification);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearNotification());
        };
    }, []);

    const notificationMessage = NOTIFICATION_MESSAGES[notificationType] || '';
    const { textColor, bgColor } =
    NOTIFICATION_STYLES[notificationType] || NOTIFICATION_STYLES.default;

    const notificationStyle = `pt-4 pb-4 font-bold ${textColor} ${bgColor}`;

    return (
        <div className={notificationStyle}>
            <div className="w-2/3 mx-auto">{notificationMessage}</div>
        </div>
    );
};

export default BidNotifications;
