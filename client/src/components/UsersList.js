import React from 'react';
import './UsersList.css';

const UsersList = props => (

    <div className="Users">
        <div className="UsersOnline">
            {props.users.length} people online
        </div>
    <ul className="UsersList">
        {
            props.users.map( user => {
                return (
                    <li key={user.id} className="UserItem">
                        {user.name}
                    </li>
                );
            })
        }
    </ul>
    </div>

);


export default UsersList;