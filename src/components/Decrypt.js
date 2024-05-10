import React, { useEffect, useState } from 'react'

export default function Decrypt({ pKey }) {

    const [secretURL, setSecretURL] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy URL');
    const [text, setText] = useState('');

    useEffect(() => {
        setSecretURL(window.location.href + '?p_key=' + pKey);
    }, [])

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

    const onDecryptText = () => {
        let secretKey = localStorage.getItem('xipherSecretKey');
        let decryptedText = window.xipherDecryptStrWithSecretKey(secretKey, text);
        alert(decryptedText);
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div>
            {secretURL ? (
                <div className='url-container'>
                    <h3>Your sharable URL</h3>
                    <div className='url-copy-container'>
                        <p>{secretURL}</p>
                        <button className='copyURL' onClick={onCopyURL}>{copyBtnText}</button>
                    </div>
                </div>
            ) : null}
            <div className="text-wrapper cf">
                <textarea type="text" placeholder={"Enter encrypted text"} value={text} id="text" onChange={handleTextChange} />
                <button className="btn" onClick={onDecryptText}>Decrypt</button>
            </div>
        </div>
    )
}
