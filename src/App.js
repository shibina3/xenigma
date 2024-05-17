import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import xipher from './xipher';
import { Container, Row, Col } from 'react-bootstrap';
import TopNav from './components/TopNav';

export default function App() {
    const location = useLocation();
    const [publicKey, setPublicKey] = useState('');
    const [requester, setRequester] = useState('');
    const [page, setPage] = useState('');
 
    useEffect(() => {
        let xSecret = localStorage.getItem('xipherSecret');
        if (!xSecret) {
            xSecret = xipher.newSecretKey();
            localStorage.setItem('xipherSecret', xSecret);
        }

        let publicKey = xipher.getPublicKey(xSecret);
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
    }, [location.search])

    return (
        <Container fluid>
            <Row>
                <TopNav />
            </Row>
            <Row>
                <Col>
                    <h1 className='text-center mt-5 mb-3'>XEnigma</h1>
                    <h3 className='text-center'>Secure Secrets Exchange</h3>
                    <br />
                    <p className='text-center mt-3 mb-5'>With XEnigma, you can request and share secrets <br />securely, ensuring that your data remains private and never touches a server.</p>
                </Col>
            </Row>
            {
                page === 'decrypt' ? <Decrypt pKey={publicKey} /> : page === 'encrypt' ? <Encrypt requester={requester} pKey={publicKey} /> : null
            }
        </Container>
    );
}
