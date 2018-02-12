import React from 'react';
import './MessageList.css';


const Message = props => (
    <div className="Message">
      <span>[{props.time}] </span>
      {props.name === props.from ? <button className="deleteBtn" onClick={()=>props.deleteMsg(props.time)}> X </button> : null }
      <strong>{props.from} :</strong>
      <span>{props.text}</span>
    </div>
);

const MessageList = props => (
    <div className="MessageList">
        {
            props.messages.map((message, i) => {
                return (
                    <Message key={i}
                     from={message.from}
                     text={message.text}
                     time={message.time}
                     deleteMsg={props.deleteMsg}
                     name={props.name}
                     />
                );
            })
        }
        </div>
);

export default MessageList;