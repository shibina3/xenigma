import React, { useEffect, useState } from 'react'
import xipher from '../xipher';
import { IoLockOpen } from "react-icons/io5";
import URLContainer from './URLContainer';
import { Button, Form, Row } from 'react-bootstrap';

export default function Decrypt({ pKey: publicKey }) {

    const [secretURL, setSecretURL] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy URL');
    const [text, setText] = useState('');
    const [isDecrypted, setIsDecrypted] = useState(false);
    const [decryptedText, setDecryptedText] = useState('');
    const [decryptedCopyBtnText, setDecryptedCopyBtnText] = useState('Copy');

    useEffect(() => {
        let url = (window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href) + '?pk=' + publicKey + (localStorage.getItem('username') && localStorage.getItem('username').toLowerCase() !== 'user' ? '&u=' + localStorage.getItem('username') : '');
        setSecretURL(url);
    }, [publicKey])

    const onCopyURL = () => {
        navigator.clipboard.writeText(secretURL)
            .then(() => {
                setCopyBtnText('Copied');
                setTimeout(() => {
                    setCopyBtnText('Copy URL');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
    }

    const onDecryptCopyURL = () => {
        navigator.clipboard.writeText(decryptedText)
            .then(() => {
                setDecryptedCopyBtnText('Copied');
                setTimeout(() => {
                    setDecryptedCopyBtnText('Copy');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
    }

    const onDecryptText = () => {
        try {
            if (!text) return alert('Please enter encrypted text to decrypt')
            let xSecret = localStorage.getItem('xipherSecret');
            let decryptedText = xipher.decryptStr(xSecret, text);
            setDecryptedText(decryptedText);
            setIsDecrypted(true);
        } catch (err) {
            console.error('Failed to decrypt text: ', err);
        }
    }

    return (
        <Row className='col-lg-6 mx-auto'>
            {secretURL ? (
                <URLContainer title={"Share this encrypted URL with someone to receive a secret"} url={secretURL} copyBtnText={copyBtnText} onCopyURL={onCopyURL} />
            ) : null}
            <div className="text-wrapper mb-5">
                <Form.Control as={"textarea"} placeholder={"Enter encrypted text"} value={text} id="text" className='w-100 fs-14' onChange={(e) => setText(e.target.value)} />
                <Button onClick={onDecryptText}>Decrypt <IoLockOpen /></Button>
            </div>
            {
                isDecrypted ? (
                <div className='d-flex flex-column gap-3 decryptBox mb-5 align-items-center justify-content-center text-center'>
                        <h6>The decrypted secret shared with you is displayed below</h6>
                        <Form.Control as={"textarea"} placeholder={"Decrypted text"} value={decryptedText} id="decryptedText" className='w-80 fs-14' readOnly />
                        <Button className='copyText' onClick={onDecryptCopyURL}>{decryptedCopyBtnText}</Button>
                    </div>
                ) : null
            }
        </Row>
    )
}
