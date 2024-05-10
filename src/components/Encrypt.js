import React, { useState } from 'react';

const Encrypt = ({ pKey }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleEncryptText = () => {
        console.log(pKey, 'pkey');
        let encryptedText = window.xipherEncryptStr(pKey, text);
        navigator.clipboard.writeText(encryptedText);
        alert('Encrypted text copied to clipboard');
    }

    return (
        <main>
            <div className="container">
                <div className="tab-container">
                    <input type="radio" id="r_text" name="radio_choices" value="Text" checked={false} />
                    <label htmlFor="r_text">Enter a text</label><br />
                </div>
            </div>
            <section id="user-input">
                <div className="text-wrapper cf">
                    <textarea type="text" id="text" value={text} placeholder={"Enter xipher text"} onChange={handleTextChange} />
                    <button className="btn" onClick={handleEncryptText}>Encrypt</button>
                </div>
            </section>
        </main>
    );
}

export default Encrypt;