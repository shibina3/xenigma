import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaHandPointDown, FaRegCopy } from "react-icons/fa";

export default function URLContainer({ url, title, onCopyURL, copyBtnText }) {
    return (
        <>
            <h6 className='text-center fs-6'>{title} <FaHandPointDown className='color-yellow' /></h6>
            <div className='d-flex justify-content-center align-items-center mb-5 w-100 p-0 url-copy-container'>
                <p className='m-2 fs-14'>{url}</p>
                <div className='m-2' onClick={onCopyURL} >
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id={`tooltip-top`}>{copyBtnText}</Tooltip>
                        }
                    >
                        <span className='cursor-pointer'><FaRegCopy /></span>
                    </OverlayTrigger>
                </div>
            </div>
        </>
    )
}
