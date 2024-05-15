import React, { useState } from 'react';
import xipher from '../xipher';

const Encrypt = ({ pKey: publicKey }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleEncryptText = async () => {
        try {
            let encryptedText = xipher.encryptStr(publicKey, text);
            await navigator.clipboard.writeText(encryptedText);
            alert('Encrypted text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <main className="main-container">
            <div className="container">
                <div className="tab-container">
                    <input type="radio" id="r_text" name="radio_choices" value="Text" /> {/*checked={false} */}
                    <label htmlFor="r_text" id="enterTextLabel">Enter a text</label><br />
                </div>
            </div>
            <section id="user-input">
                <div className="text-wrapper cf">
                    <textarea type="text" id="text" value={text} placeholder={"Enter text to encrypt"} onChange={handleTextChange} />
                    <button className="btn" onClick={handleEncryptText}>Encrypt</button>
                </div>
            </section>
        </main>
    );
}

export default Encrypt;