import React, { useRef, useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Button, Col, Overlay, Tooltip, OverlayTrigger, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function TopNav() {
    const popupRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const updateUserRef = useRef(null);
    const updatePassRef = useRef(null);
    const nameBtnRef = useRef(null);
    const passBtnRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');
    const [isNameUpdated, setIsNameUpdated] = useState(false);
    const [isPassUpdated, setIsPassUpdated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (username !== localStorage.getItem('username')) {
            setIsNameUpdated(true);
        }
        if (password !== localStorage.getItem('password')) {
            setIsPassUpdated(true);
        }
    }, [username, password])

    const updateUserDetails = (type) => {
        if (type === 'user') {
            let name = nameRef.current.value || 'User';
            localStorage.setItem('username', name);
            setUsername(name);
            setIsNameUpdated(false);
        } else {
            let pass = passwordRef.current.value
            localStorage.setItem('password', pass);
            setPassword(pass);
            setIsPassUpdated(false);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if ((updateUserRef.current && updateUserRef.current.contains(event.target)) || (updatePassRef.current && updatePassRef.current.contains(event.target)) || (nameRef.current && nameRef.current.contains(event.target)) || (passwordRef.current && passwordRef.current.contains(event.target)) || (nameBtnRef.current && nameBtnRef.current.contains(event.target)) || (passBtnRef.current && passBtnRef.current.contains(event.target))) {
                return;
            }
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef, updateUserRef, updatePassRef, nameRef, passwordRef, nameBtnRef, passBtnRef]);

    return (
        <Col className='d-flex justify-content-end mt-2'>
            <Button variant='secondary' size='md' className="arrow-container color-black mt-2" ref={popupRef} onClick={() => setShowPopup(!showPopup)}>
                {showPopup ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                <span>Hi <span className={username !== 'User' ? 'bold-500' : ''}>{username}</span>!</span>
            </Button>
            <Overlay target={popupRef.current} show={showPopup} placement="bottom" onHide={() => setShowPopup(false)}>
                {(props) => (
                    <Tooltip placement='bottom' id="overlay" {...props}>
                        <div className="popup color-black">
                            <div className="popup-title">Update User Details</div>
                            <div className="popup-content">
                                <div className="user-details">
                                    <OverlayTrigger
                                        placement='left'
                                        rootClose={true}
                                        trigger='click'
                                        overlay={
                                            <Tooltip id='tooltip position-relative'>
                                                <div ref={nameBtnRef} className='popupInner'>
                                                    <Form.Control type='text' ref={nameRef} defaultValue={username} onChange={() => setIsNameUpdated(true)} />
                                                    <Button className='color-black fs-14 text-decoration-none' variant="link color-white" onClick={() => updateUserDetails('user')} disabled={!isNameUpdated}>Update</Button>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <Button ref={updateUserRef} className='drop-btn color-black fs-14'
                                            onClick={() => setShowNamePopup(!showNamePopup)} variant="link">
                                            Update name
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement='left'
                                        trigger='click'
                                        rootClose={true}
                                        overlay={
                                            <Tooltip id='tooltip position-relative'>
                                                <div ref={passBtnRef} className='popupInner'>
                                                    <InputGroup className="mb-3 name-input">
                                                        <Form.Control
                                                            type={showPassword ? 'text' : 'password'} 
                                                            ref={passwordRef} 
                                                            defaultValue={password} 
                                                            onChange={() => setIsPassUpdated(true)} 
                                                            placeholder="Type a password"
                                                            aria-label="Type a password"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <InputGroup.Text id="basic-addon2">{
                                                            showPassword ? <FaEye onClick={() => {setShowPassword(!showPassword); passwordRef.current.type = 'text'}} /> : <FaEyeSlash onClick={() => {setShowPassword(!showPassword); passwordRef.current.type = 'text'}} />
                                                        }</InputGroup.Text>
                                                    </InputGroup>
                                                    <Button className='color-black fs-14 text-decoration-none' variant="link color-white" onClick={() => updateUserDetails('password')} disabled={!isPassUpdated}>Update</Button>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <Button ref={updatePassRef} className='drop-btn color-black fs-14'
                                            onClick={() => setShowNamePopup(!showNamePopup)} variant="link">
                                            Update key/password
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                )}
            </Overlay>
        </Col>
    )
}
