import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import FileUpload from './FileUpload';

const Encrypt = () => {
    const [uploadFileRadio, setUploadFileRadio] = useState(true);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    let secretKey = localStorage.getItem('mySecretKey');
    if (!secretKey) {
        secretKey = prompt('Please enter your secret key');
        localStorage.setItem('mySecretKey', secretKey);
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleTabChange = () => {
        setUploadFileRadio(!uploadFileRadio);
    }

    const handleEncryptText = () => {
        let encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
        navigator.clipboard.writeText(encryptedText);
        alert('Encrypted text copied to clipboard');
    }

    const handleEncryptFile = () => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let encryptedFile = CryptoJS.AES.encrypt(e.target.result, secretKey).toString();
            let blob = new Blob([encryptedFile], { type: 'text/plain' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `encrypted_${file.name}`;
            a.click();
            URL.revokeObjectURL(url);
        }
        reader.readAsText(file);
    }

    const handleRemoveFile = () => {
        setFile(null);
    }

    return (
        <main>
            <div className="container">
                <div className="tab-container">
                    <input type="radio" id="r_upload" name="radio_choices" value="Upload" checked={uploadFileRadio} onChange={handleTabChange} />
                    <label htmlFor="r_upload">Upload a File</label><br />
                    <input type="radio" id="r_text" name="radio_choices" value="Text" checked={!uploadFileRadio} onChange={handleTabChange} />
                    <label htmlFor="r_text">Enter a text</label><br />
                </div>
            </div>
            <section id="user-input">
                {uploadFileRadio ? (
                    <>
                        <FileUpload onFileUpload={setFile} />
                        {file && (
                            <div id="fileInfo">
                                <button id="removeFile" onClick={handleRemoveFile}>x</button>
                                <span id="filenames">{file.name}</span>
                                <button className="btn" onClick={handleEncryptFile}>Encrypt</button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-wrapper cf hidden">
                        <textarea type="text" id="text" value={text} onChange={handleTextChange} />
                        <button className="btn" onClick={handleEncryptText}>Encrypt</button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Encrypt;