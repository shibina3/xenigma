import React from 'react'
import { Button } from 'react-bootstrap';
import { FaHandPointDown } from "react-icons/fa";

export default function URLContainer({ url, title, onCopyURL, copyBtnText }) {
    return (
        <>
            <h6 className='text-center fs-6'>{title} <FaHandPointDown className='color-yellow' /></h6>
            <div className='d-flex justify-content-center mb-5 w-100 p-0 url-copy-container '>
                <p className='m-2 fs-14'>{url}</p>
                <Button className='copyURL' onClick={onCopyURL}>{copyBtnText}</Button>
            </div>
        </>
    )
}
