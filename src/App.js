import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import xipher from './xipher';
import { Container, Row, Col } from 'react-bootstrap';
import TopNav from './components/TopNav';

const reGenerateURL = async (type, publicKey, setSecretURL, url) => {
    if (type === 'xipherSecret') {
        url += '?pk=' + publicKey + (localStorage.getItem('username') && localStorage.getItem('username').toLowerCase() !== 'user' ? '&u=' + localStorage.getItem('username') : '');
        setSecretURL(url);
    } else if (type === 'password') {
        if (!localStorage.getItem('password')) return alert('Please set a password in User Settings to use this option');
        try {
            setSecretURL(url + '?pk=' + await xipher.getPublicKey(localStorage.getItem('password')));
        } catch (err) {
            console.error('Failed to generate public key: ', err);
            alert(err)
        }
    }
}

export default function App() {
    const location = useLocation();
    const [publicKey, setPublicKey] = useState('');
    const [requester, setRequester] = useState('');
    const [page, setPage] = useState('');
    const [secretURL, setSecretURL] = useState('');

    const url = useMemo(() => window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href, []);

    useEffect(() => {
        const fetchPageDetails = async () => {
            let xSecret = localStorage.getItem('xipherSecret');
            if (!xSecret) {
                xSecret = await xipher.newSecretKey();
                localStorage.setItem('xipherSecret', xSecret);
            }

            let publicKey = await xipher.getPublicKey(xSecret);
            setPublicKey(publicKey);

            if (location.search) {
                const searchParams = new URLSearchParams(location.search);
                const pKey = searchParams.get('pk');
                const user = searchParams.get('u');
                if (user) setRequester(user);
                if (pKey) {
                    setPublicKey(pKey);
                    setPage('encrypt');
                    return
                }
            }

            setPage('decrypt');
        }
        fetchPageDetails();
    }, [location.search])

    const handleReGenerateURL = useCallback((type) => reGenerateURL(type, publicKey, setSecretURL, url), [publicKey, setSecretURL, url]);

    return (
        <Container fluid>
            <Row>
                <TopNav page={page} reGenerateURL={handleReGenerateURL} />
            </Row>
            <Row>
                <Col>
                    <h1 className='text-center mt-5 mb-3'>Xenigma</h1>
                    <h3 className='text-center'>Secure Secrets Exchange</h3>
                    <br />
                    <p className='text-center mt-3 mb-5'>With Xenigma, you can request and share secrets <br />securely, ensuring that your data remains private and never touches a server.</p>
                </Col>
            </Row>
            {
                {
                    'decrypt': <Decrypt reGenerateURL={handleReGenerateURL} secretURL={secretURL} setSecretURL={setSecretURL} pKey={publicKey} page={page} />,
                    'encrypt': <Encrypt page={page} requester={requester} pKey={publicKey} />
                }[page]
            }
        </Container>
    );
}