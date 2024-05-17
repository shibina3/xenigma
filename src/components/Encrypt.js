import React, { useState } from 'react';
import xipher from '../xipher';
import { IoLockClosed } from "react-icons/io5";
import URLContainer from './URLContainer';
import { Row, Form } from 'react-bootstrap';

const Encrypt = ({ pKey: publicKey, requester }) => {
    const [text, setText] = useState('');
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [encryptedText, setEncryptedText] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy Text');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleEncryptText = async () => {
        try {
            let encrypted_text = xipher.encryptStr(publicKey, text);
            await navigator.clipboard.writeText(encrypted_text);
            setEncryptedText(encrypted_text);
            setIsEncrypted(true);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    const onCopyURL = () => {
        navigator.clipboard.writeText(encryptedText)
            .then(() => {
                setCopyBtnText('Copied');
                setTimeout(() => {
                    setCopyBtnText('Copy Text');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
    }

    return (
        <Row className='col-lg-6 mx-auto'>
                <p className='text-center'>A secret has been requested{requester ? <span> by <b>{requester}</b></span> :''}. <br />Only the requester will have access to the information you provide.</p>
                <div className="text-wrapper mb-5">
                    <Form.Control as="textarea" className='w-100 fs-14' id="textarea" value={text} placeholder={"Enter the information you wish to share"} onChange={handleTextChange} />
                    <button className="button encrypt" onClick={handleEncryptText}>Encrypt <IoLockClosed /></button>
                </div>
                {
                    isEncrypted ? <URLContainer copyBtnText={copyBtnText} onCopyURL={onCopyURL} url={encryptedText} title={"Share this secret with the requester for a secure and confidential transmission."} /> : null
                }
        </Row>
    );
}

export default Encrypt;