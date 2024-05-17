import React, { useState } from 'react';
import xipher from '../xipher';
import { IoLockClosed } from "react-icons/io5";
import URLContainer from './URLContainer';
import { Row, Form } from 'react-bootstrap';

// Custom hook for copying to clipboard
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

const Encrypt = ({ pKey: publicKey, requester, page }) => {
    const [text, setText] = useState('');
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [encryptedText, setEncryptedText] = useState('');
    const [copyBtnText, copyToClipboard] = useClipboard('Copy Text');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleEncryptText = async () => {
        let encrypted_text = await xipher.encryptStr(publicKey, text);
        setEncryptedText(encrypted_text);
        setIsEncrypted(true);
        copyToClipboard(encrypted_text);
    }

    return (
        <Row className='col-lg-6 mx-auto main-container'>
            <p className='text-center'>A secret has been requested{requester ? <span> by <b>{requester}</b></span> :''}. <br />Only the requester will have access to the information you provide.</p>
            <div className="text-wrapper mb-5">
                <Form.Control as="textarea" className='w-100 fs-14' id="textarea" value={text} placeholder={"Enter the information you wish to share"} onChange={handleTextChange} />
                <button className="button encrypt" onClick={handleEncryptText}>Encrypt <IoLockClosed /></button>
            </div>
            {
                isEncrypted ? <URLContainer page={page} copyBtnText={copyBtnText} onCopyURL={() => copyToClipboard(encryptedText)} url={encryptedText} title={"Share this secret with the requester for a secure and confidential transmission."} /> : null
            }
        </Row>
    );
}

export default Encrypt;