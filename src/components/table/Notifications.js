import { Avatar, Badge } from "@windmill/react-ui";
import React, { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { IoNotificationsSharp, IoClose } from "react-icons/io5";

const Notifications = ({ notifications, dataTable }) => {
    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleNotificationOpen = () => {
        setNotificationOpen(!notificationOpen);
    };
    const nRef = useRef();

    return (
        <li className="relative inline-block text-left" ref={nRef}>
            <button
                className="relative align-middle rounded-md focus:outline-none"
                onClick={handleNotificationOpen}
            >
                <IoNotificationsSharp className="w-5 h-5" aria-hidden="true" />
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {notifications.length}
                </span>
            </button>

            {notificationOpen && (
                <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="notification-box">
                        <Scrollbars>
                            <ul className="block text-sm border-t border-gray-100 dark:border-gray-700 rounded-md">
                                {notifications.map((notification, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <Avatar
                                                className="p-1 mr-2 md:block bg-gray-50 border border-gray-200"
                                                src={notification.image}
                                                alt="image"
                                            />

                                            <div className="notification-content">
                                                <h6 className="font-medium text-gray-500">
                                                    {notification.name}
                                                </h6>

                                                <p className="flex items-center text-xs text-gray-400">
                                                    <Badge type={notification.badgeType}>{notification.status}</Badge>

                                                    <span className="ml-2">{notification.date}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <span className="px-2">
                                            <IoClose />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Scrollbars>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Notifications;
