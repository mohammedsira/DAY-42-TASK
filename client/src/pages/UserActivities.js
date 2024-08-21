import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../context/Users.context';

export default function UserActivities() {

    const { userShortenUrl } = useUser();

    return (
        <div>
            <h1>Shortened URL : {userShortenUrl.length}</h1>
            <ol>{userShortenUrl.map((item, i) => <li  key={i}><Link style={{ color: "blue" }} to={`${item}`}>{item}</Link></li>)}</ol>
        </div>
    )
}
