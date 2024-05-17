import React, { useEffect, useState } from 'react'
import xipher from '../xipher';
import { IoLockOpen } from "react-icons/io5";
import URLContainer from './URLContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';

const useClipboard = (initialText) => {
    const [copyBtnText, setCopyBtnText] = useState(initialText);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyBtnText('Copied');
                setTimeout(() => {
                    setCopyBtnText(initialText);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
    }

    return [copyBtnText, copyToClipboard];
}

export default function Decrypt({ pKey: publicKey, secretURL, setSecretURL, reGenerateURL }) {
    const [text, setText] = useState('');
    const [isDecrypted, setIsDecrypted] = useState(false);
    const [decryptedText, setDecryptedText] = useState('');
    const [error, setError] = useState(null);
    const [copyBtnText, copyToClipboard] = useClipboard('Copy');

    useEffect(() => {
        let url = (window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href) + '?pk=' + publicKey + (localStorage.getItem('username') && localStorage.getItem('username').toLowerCase() !== 'user' ? '&u=' + localStorage.getItem('username') : '');
        setSecretURL(url);
    }, [publicKey, setSecretURL])

    const onDecryptText = async () => {
        try {
            if (!text) return alert('Please enter encrypted text to decrypt')
            let xSecret = localStorage.getItem('xipherSecret');
            let decryptedText = await xipher.decryptStr(xSecret, text);
            setDecryptedText(decryptedText);
            setIsDecrypted(true);
        } catch (err) {
            setError('Failed to decrypt text');
        }
    }

    return (
        <Row className='col-lg-6 mx-auto'>
            <Col className='main-container align-items-center justify-content-center d-flex flex-column'>
                {secretURL ? (
                    <URLContainer reGenerateURL={reGenerateURL} page="decrypt" title={"Share this encrypted URL with someone to receive a secret"} url={secretURL} copyBtnText={copyBtnText} onCopyURL={() => copyToClipboard(secretURL)} />
                ) : null}
                <div className="w-100 d-flex align-items-center justify-content-center gap-2 mb-5">
                    <Form.Control as={"input"} placeholder={"Enter encrypted text"} value={text} id="text" className='fs-14' onChange={(e) => setText(e.target.value)} />
                    <Button className='w-25 h-60' onClick={onDecryptText}>Decrypt <IoLockOpen /></Button>
                </div>
                {
                    isDecrypted ? (
                        <div className='d-flex flex-column gap-3 decryptBox mb-5 align-items-center justify-content-center text-center'>
                            <h6>The decrypted secret shared with you is displayed below</h6>
                            <Form.Control as={"textarea"} placeholder={"Decrypted text"} value={decryptedText} id="decryptedText" className='w-80 fs-14' readOnly />
                            <Button className='copyText' onClick={() => copyToClipboard(decryptedText)}>{copyBtnText}</Button>
                        </div>
                    ) : null
                }
                {error && <div className="error">{error}</div>}
            </Col>
        </Row>
    )
}