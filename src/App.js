import React, { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import xipher from './xipher';

export default function App() {
    const location = useLocation();
    const [publicKey, setPublicKey] = useState('');
    const [page, setPage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
    const [password, setPassword] = useState(localStorage.getItem('password') || ''); 
    const [isUpdated, setIsUpdated] = useState(false);
    const popupRef = useRef();

    useEffect(() => {
        let xSecret = localStorage.getItem('xipherSecret');
        if (!xSecret) {
            xSecret = xipher.newSecretKey();
            localStorage.setItem('xipherSecret', xSecret);
        }

        let publicKey = xipher.getPublicKey(xSecret);
        setPublicKey(publicKey);

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const pKey = searchParams.get('pk');
            if (pKey) {
                setPublicKey(pKey);
                setPage('encrypt');
                return
            }
        }

        setPage('decrypt');
    }, [location.search])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setIsUpdated(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsUpdated(true);
    };

    useEffect(() => {
        if (username !== localStorage.getItem('username') || password !== localStorage.getItem('password')) {
            setIsUpdated(true);
        }
    }, [username, password])

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target) && event.target.className.indexOf('arrow') === -1) {
                setShowPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);

    const updateUserDetails = () => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setUsername(username);
        setPassword(password);
        setIsUpdated(false);
    }

    return (
        <>
            <div className="topBar">
                <div className="arrow-container">
                    <div className={`arrow ${showPopup ? 'up' : 'down'}`} onClick={() => setShowPopup(!showPopup)}></div>
                    {showPopup && (
                        <div className="popup" ref={popupRef}>
                            <div className="popup-title">User Details</div>
                            <div className="popup-content">
                                <div className="user-details">
                                    <div>
                                        <label>Set Username: </label>
                                        <input type='text' defaultValue={username} onChange={handleUsernameChange} />
                                    </div>
                                    <div>
                                        <label>Set Password: </label>
                                        <input type='password' defaultValue={password} onChange={handlePasswordChange} />
                                    </div>
                                    <button className={`update-user-details ${!isUpdated ? 'button-disabled' : ''}`} onClick={updateUserDetails} disabled={!isUpdated} >Update</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <span>Hello {username}!</span>
            </div>
            {
                page === 'decrypt' ? <Decrypt pKey={publicKey} userDetails={{username: username, password: password}} /> : page === 'encrypt' ? <Encrypt pKey={publicKey} /> : null
            }
        </>
    );
}
