import { useEffect, useState } from "react";
import { storeDispatch, useAppSelector } from "@src/redux/hooks";
import { resetMessages } from "@src/redux/reducers/messages";
import { useLocation } from "react-router-dom";
import { Message, MessageType } from "@src/types";


export default function Messages() {

    const location = useLocation();

    const messagesState = useAppSelector((state) => state.messages);
    var [message, setMessage] = useState(null);


    useEffect(() => {

        if (messagesState.message != null) {
            setMessage(messagesState.message as any)
        } else if (location.state?.message != null) {
            setMessage(location.state.message);
        }

        return () => {
            window.history.replaceState({}, "")

            storeDispatch(resetMessages());
        }

    }, [messagesState.message, location.state])

    if (message != null) {

        const { type, text } = message;

        switch (type) {
            case MessageType.SUCCESS:
                return <>
                    <div className="pb-4">
                        <div className="bg-lime-700/25 border-l-lime-700 border-l-8 p-4 text-green-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>

            case MessageType.ERROR:
                return <>
                    <div className="pb-4">
                        <div className="bg-red-700/25 border-l-red-700 border-l-8 p-4 text-red-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>
            case MessageType.INFO:
                return <>
                    <div className="pb-4">
                        <div className="bg-gray-400/25 border-l-gray-700 border-l-8 p-4 text-gray-900">
                            <span>{text}</span>
                        </div>
                    </div>
                </>
        }
    }

    return null;





}
