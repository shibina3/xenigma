import React, { useEffect, useState } from 'react'
import xipher from '../xipher';

export default function Decrypt({ pKey: publicKey, userDetails }) {

    const [secretURL, setSecretURL] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy URL');
    const [text, setText] = useState('');
    const [selectedOption, setSelectedOption] = useState('privateKey');
    const [isLoading, setIsLoading] = useState(false);

    const handleOptionChange = (e) => {
        if(!localStorage.getItem('password')) return alert('Please set a password in User Settings to use this option');
        setIsLoading(true);
        setSelectedOption(e.target.value);
        try {
            let url = window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href;
            if (e.target.value === 'password') {
                setSecretURL(url + '?pk=' + xipher.getPublicKey(userDetails.password));
            } else {
                setSecretURL(url + '?pk=' + publicKey);
            }
        } catch (err) {
            console.error('Failed to generate public key: ', err);
            alert(err)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let url = window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href;
        setSecretURL(url + '?pk=' + publicKey);
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

    const onDecryptText = () => {
        try {
            let xSecret = localStorage.getItem('xipherSecret');
            let decryptedText = (selectedOption === 'password') ? xipher.decryptStr(userDetails.password, text) : xipher.decryptStr(xSecret, text);
            alert(decryptedText);
        } catch (err) {
            console.error('Failed to decrypt text: ', err);
        }
    }

    return (
        <div>
            {secretURL ? (
                <div className='url-container'>
                    <h3>Your sharable encryption URL</h3>
                    <div className='url-copy-container'>
                        <select id="r_password" name="encryption_choices" value={selectedOption} onChange={handleOptionChange}>
                            <option value="privateKey">Use Private Key</option>
                            <option value="password">Use Password</option>
                        </select>
                        <p>{isLoading ? 'Please wait while we generate your URL...' : secretURL}</p>
                        <button className='copyURL' onClick={onCopyURL}>{copyBtnText}</button>
                    </div>
                </div>
            ) : null}
            <div className="text-wrapper cf">
                <textarea type="text" placeholder={"Enter encrypted text"} value={text} id="text" onChange={(e) => setText(e.target.value)} />
                <button className="btn" onClick={onDecryptText}>Decrypt</button>
            </div>
        </div>
    )
}
