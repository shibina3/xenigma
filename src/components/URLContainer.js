import React, { useState } from 'react'
import { Tooltip, OverlayTrigger, Button, Spinner } from 'react-bootstrap';
import { FaHandPointDown, FaRegCopy } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

export default function URLContainer({ page, url, title, onCopyURL, copyBtnText, reGenerateURL }) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <h6 className='text-center fs-6'>{title} <FaHandPointDown className='color-yellow' /></h6>
            <div className='d-flex justify-content-center mb-5 w-100 p-0 url-copy-container'>
                <p className='m-2 fs-14'>{url}</p>
                {
                    page === "encrypt" ? <Button className='copyURL' onClick={onCopyURL} >
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-top`}>{copyBtnText}</Tooltip>
                            }
                        >
                            <span className='cursor-pointer'><FaRegCopy /></span>
                        </OverlayTrigger>
                    </Button> : page === "decrypt" ? <div className='copyURL d-flex justify-content-center align-items-center gap-3'>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-top`}>{copyBtnText}</Tooltip>
                            }
                        >
                            <span className='cursor-pointer' onClick={onCopyURL}><FaRegCopy /></span>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-top`}>Re-generate URL</Tooltip>
                            }
                        >
                            <span className='cursor-pointer' onClick={() => {
                                setIsLoading(true);
                                setTimeout(() => {
                                    reGenerateURL('xipherSecret');
                                    setIsLoading(false);
                                }, 1000);
                            }}>{
                                    isLoading ? <Spinner className='color-black' animation="border" variant="light" size="sm" /> : <TfiReload />
                                }</span>
                        </OverlayTrigger>
                    </div> : null
                }
            </div>
        </>
    )
}
