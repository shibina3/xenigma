import React, { useRef, useEffect, useState, useCallback } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Button, Col, Overlay, Tooltip, OverlayTrigger, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa6";

export default function TopNav({page, reGenerateURL}) {
    const popupRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const updateUserRef = useRef(null);
    const updatePassRef = useRef(null);
    const nameBtnRef = useRef(null);
    const passBtnRef = useRef(null);
    const [showPopup, setShowPopup] = useState({
        parent: false,
        child: false
    });
    const [userDetails, setUserDetails] = useState({
        username: localStorage.getItem('username') || 'User',
        password: localStorage.getItem('password') || ''
    });
    const [isUpdated, setIsUpdated] = useState({
        username: false,
        password: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [regenText, setRegenText] = useState('Re-generate URL');

    useEffect(() => {
        if (userDetails.username !== localStorage.getItem('username')) {
            setIsUpdated(prevState => ({ ...prevState, username: true }));
        }
        if (userDetails.password !== localStorage.getItem('password')) {
            setIsUpdated(prevState => ({ ...prevState, password: true }));
        }
    }, [userDetails])

    const updateUserDetails = useCallback((type) => {
        return new Promise((resolve) => {
            let updatedDetails = { ...userDetails };
            if (type === 'user') {
                updatedDetails.username = nameRef.current.value || 'User';
                localStorage.setItem('username', updatedDetails.username);
            } else {
                updatedDetails.password = passwordRef.current.value;
                localStorage.setItem('password', updatedDetails.password);
            }
            setUserDetails(updatedDetails);
            setIsUpdated({ username: false, password: false });
            resolve();
        });
    }, [userDetails]);


    const handleRegenerate = async () => { 
        setRegenText('loading'); 
        setTimeout(async () => {
            await updateUserDetails('password');
            await reGenerateURL('password');
            setRegenText('Re-generate URL');
        }, 0);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if ((updateUserRef.current && updateUserRef.current.contains(event.target)) || (updatePassRef.current && updatePassRef.current.contains(event.target)) || (nameRef.current && nameRef.current.contains(event.target)) || (passwordRef.current && passwordRef.current.contains(event.target)) || (nameBtnRef.current && nameBtnRef.current.contains(event.target)) || (passBtnRef.current && passBtnRef.current.contains(event.target))) {
                return;
            }
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(prevState => ({ ...prevState, parent: false, child: false }));
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef, updateUserRef, updatePassRef, nameRef, passwordRef, nameBtnRef, passBtnRef]);

    return (
        <Col className='d-flex justify-content-end mt-2 gap-3 align-items-center'>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip'>XEngima</Tooltip>} >
                <a className='color-black' href='https://github.com/shibina3/xenigma' target='_blank' rel='noopener noreferrer'>
                    <FaGithub className='github-link' />
                </a>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip'>Xipher</Tooltip>} >
                <a className='color-black' href='https://github.com/shibme/xipher' target='_blank' rel='noopener noreferrer'>
                    <FaGithub className='github-link' />
                </a>
            </OverlayTrigger>
            <Button variant='secondary' size='md' className="arrow-container color-black mt-2" ref={popupRef} onClick={() => setShowPopup(prevState => ({...prevState, parent:!showPopup.parent}))}>
                {showPopup.parent ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                <span>Hi <span className={userDetails.username !== 'User' ? 'bold-500' : ''}>{userDetails.username}</span>!</span>
            </Button>
            <Overlay target={popupRef.current} show={showPopup.parent} placement="bottom" onHide={() => setShowPopup(prevState => ({...prevState, parent: false}))}>
                {(props) => (
                    <Tooltip placement='bottom' id="overlay" {...props}>
                        <div className="popup color-black">
                            <div className="popup-title">Update Info</div>
                            <div className="popup-content">
                                <div className="user-details">
                                    <OverlayTrigger
                                        placement='left'
                                        rootClose={true}
                                        trigger='click'
                                        overlay={
                                            <Tooltip id='tooltip position-relative'>
                                                <div ref={nameBtnRef} className='popupInner'>
                                                    <Form.Control type='text' ref={nameRef} defaultValue={userDetails.username} onChange={() => setIsUpdated(prevState => ({...prevState, name: true}))} />
                                                    <Button className='color-black fs-14 text-decoration-none' variant="link color-white" onClick={() => updateUserDetails('user')} disabled={!isUpdated.name}>Update</Button>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <Button ref={updateUserRef} className='drop-btn color-black fs-14'
                                            onClick={() => setShowPopup(prevState => ({...prevState, child: !showPopup.child}))} variant="link">
                                            User Name
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
                                                            className='fs-14'
                                                            type={showPassword ? 'text' : 'password'}
                                                            ref={passwordRef}
                                                            defaultValue={userDetails.password}
                                                            onChange={() => setIsUpdated(prevState => ({ ...prevState, password: true }))}
                                                            placeholder="password"
                                                            aria-label="password"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <InputGroup.Text id="basic-addon2" className='cursor-pointer'>{
                                                            showPassword ? <FaEye onClick={() => { setShowPassword(!showPassword); passwordRef.current.type = 'text' }} /> : <FaEyeSlash onClick={() => { setShowPassword(!showPassword); passwordRef.current.type = 'text' }} />
                                                        }</InputGroup.Text>
                                                    </InputGroup>
                                                    <div className='d-flex flex-column'>
                                                    <Button className='color-black fs-14 text-decoration-none' variant="link color-white" onClick={() => updateUserDetails('password')} disabled={!isUpdated.password}>Update</Button>
                                                    {
                                                        page === 'decrypt' ? <OverlayTrigger
                                                        placement='bottom'
                                                        overlay={
                                                            <Tooltip id='tooltip position-relative'>Re-generate url with your password</Tooltip>}
                                                        >
                                                            <Button className='color-black fs-14 text-decoration-none' variant="link color-white" onClick={handleRegenerate}
                                                            >{regenText === 'loading' ?
                                                            <Spinner animation="border" role="status" size="sm">
                                                            <span className="visually-hidden">Loading...</span>
                                                          </Spinner>: regenText }</Button>
                                                        </OverlayTrigger> : null
                                                    }
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <Button ref={updatePassRef} className='drop-btn color-black fs-14'
                                            onClick={() => setShowPopup(prevState => ({...prevState, child: !showPopup.child}))} variant="link">
                                            Password/Key
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
