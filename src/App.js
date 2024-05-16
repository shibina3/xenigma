import React, { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import xipher from './xipher';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Button, Container, Row, Col, Overlay, Tooltip } from 'react-bootstrap';

export default function App() {
    const location = useLocation();
    const [publicKey, setPublicKey] = useState('');
    const [requester, setRequester] = useState('');
    const [page, setPage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');
    const [isUpdated, setIsUpdated] = useState(false);
    const popupRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

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
            const user = searchParams.get('u');
            if(user) setRequester(user);
            if (pKey) {
                setPublicKey(pKey);
                setPage('encrypt');
                return
            }
        }

        setPage('decrypt');
    }, [location.search])

    useEffect(() => {
        if (username !== localStorage.getItem('username') || password !== localStorage.getItem('password')) {
            setIsUpdated(true);
        }
    }, [username, password])

    const updateUserDetails = () => {
        localStorage.setItem('username', nameRef.current.value);
        localStorage.setItem('password', passwordRef.current.value);
        setUsername(nameRef.current.value);
        setPassword(passwordRef.current.value);
        setIsUpdated(false);
    }

    return (
        <Container fluid>
            <Row>
                <Col className='d-flex justify-content-end'>
                    <Button variant='secondary' size='md' className="arrow-container color-black mt-2" ref={popupRef} onClick={() => setShowPopup(!showPopup)}>
                        {showPopup ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                        <span>Hi <span className={username !== 'User' ? 'bold-500' : ''}>{username}</span>!</span>
                    </Button>
                    <Overlay target={popupRef.current} show={showPopup} placement="bottom" rootClose={true} onHide={() => setShowPopup(false)}>
                        {(props) => (
                            <Tooltip placement='bottom' id="overlay" {...props}>
                                <div className="popup color-black">
                                    <div className="popup-title">User Details</div>
                                    <div className="popup-content">
                                        <div className="user-details">
                                            <div>
                                                <label>Update Username: </label>
                                                <input type='text' ref={nameRef} defaultValue={username} onChange={() => setIsUpdated(true)} />
                                            </div>
                                            <div>
                                                <label>Update Key/Password: </label>
                                                <input type='password' ref={passwordRef} defaultValue={password} onChange={() => setIsUpdated(true)} />
                                            </div>
                                            <button className={`update-user-details ${!isUpdated ? 'button-disabled' : ''}`} onClick={updateUserDetails} disabled={!isUpdated} >Update</button>
                                        </div>
                                    </div>
                                </div>
                            </Tooltip>
                        )}
                    </Overlay>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className='text-center mt-3 mb-3'>Xenigma</h1>
                    <h3 className='text-center'>Secure Secrets Exchange</h3>
                    <p className='text-center mt-3 mb-5'>With Xenigma, you can request and share secrets <br />securely, ensuring that your data remains private and never touches a server.</p>
                </Col>
            </Row>
            {
                page === 'decrypt' ? <Decrypt pKey={publicKey} /> : page === 'encrypt' ? <Encrypt requester={requester} pKey={publicKey} /> : null
            }
        </Container>
    );
}
