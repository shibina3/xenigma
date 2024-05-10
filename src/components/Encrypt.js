import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import FileUpload from './FileUpload';

const Encrypt = ({pKey}) => {
    const [uploadFileRadio, setUploadFileRadio] = useState(false);  //true
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [secretURL, setSecretURL] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleTabChange = () => {
        setUploadFileRadio(!uploadFileRadio);
    }

    const handleEncryptText = () => {
        console.log(pKey, 'pkey');
        let encryptedText = window.xipherEncryptStr(pKey, text);
        navigator.clipboard.writeText(encryptedText);
        alert('Encrypted text copied to clipboard');
    }

    const handleEncryptFile = () => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let encryptedFile = CryptoJS.AES.encrypt(e.target.result, secretURL).toString();
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
                    {/* <input type="radio" id="r_upload" name="radio_choices" value="Upload" checked={uploadFileRadio} onChange={handleTabChange} />
                    <label htmlFor="r_upload">Upload a File</label><br /> */}
                    <input type="radio" id="r_text" name="radio_choices" value="Text" checked={false} />  {/* onChange={handleTabChange} checked={!uploadFileRadio} */}
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
                    <div className="text-wrapper cf">
                        <textarea type="text" id="text" value={text} placeholder={"Enter xipher text"} onChange={handleTextChange} />
                        <button className="btn" onClick={handleEncryptText}>Encrypt</button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Encrypt;