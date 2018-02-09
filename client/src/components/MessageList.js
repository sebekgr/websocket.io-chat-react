import React from 'react';
import './MessageList.css';


const Message = props => (
    <div className="Message">
      <strong>{props.from} :</strong>
      <span>{props.text}</span>
    </div>
);

const MessageList = props => (
    <div className="MessageList">
        {
            props.messages.map((message, i) => {
                return (
                    <Message key={i} from={message.from} text={message.text} />
                );
            })
        }
        </div>
);

export default MessageList;