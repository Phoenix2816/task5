import React from "react";
import ReactTimeAgo from "react-time-ago";


const User = ({
    id,
    name,
    info,
    email,
    status,
    is_blocked,
    last_login_time,
    selectedUsers,
    setSelectedUsers
}) => {

    const handleChange = (e) => {
        if (e.target.checked) {
            setSelectedUsers(prev => [...prev, id]);
        } else {
            setSelectedUsers(prev =>
                prev.filter(userId => userId !== id)
            );
        }
    };

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    className="select"
                    checked={selectedUsers.includes(id)}
                    onChange={handleChange}
                />
            </td>

            <td>
                <p className="flex">
                    <span>{name}</span>
                    <span
                        style={{fontSize:"12px", maxWidth: "200px", color: "#323232"}}
                    >{info}</span>
                </p>
                
            </td>
            <td>{email}</td>
            <td>{is_blocked ? "blocked" : status}</td>

            <td>
                <ReactTimeAgo
                    date={new Date(last_login_time)}
                    locale="en"
                />
            </td>
        </tr>
    );
};

export default User;
