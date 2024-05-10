import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';

export default function App() {
    const location = useLocation();
    const [publicKey, setPublicKey] = useState('');
    const [page, setPage] = useState('');

    useEffect(() => {
        let secretKey = localStorage.getItem('xipherSecretKey');
        if (!secretKey) {
            secretKey = window.xipherNewSecretKey()
            localStorage.setItem('xipherSecretKey', secretKey);
        }

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const pKey = searchParams.get('p_key');
            if (pKey) {
                setPublicKey(pKey);
                setPage('encrypt');
            } else {
                let publicKey = window.xipherPubKeyFromPrivKey(secretKey, false);
                setPublicKey(publicKey);
                setPage('decrypt');
            }
        } else {
            let publicKey = window.xipherPubKeyFromPrivKey(secretKey, false);
            setPublicKey(publicKey);
            setPage('decrypt');
        }
    },[location.search])

  return page === 'decrypt' ? <Decrypt pKey={publicKey} /> : page === 'encrypt' ? <Encrypt pKey={publicKey} /> : null;
}
