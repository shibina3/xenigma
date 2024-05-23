import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaHandPointDown, FaRegCopy, FaShareSquare, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { PiMicrosoftTeamsLogo } from "react-icons/pi";

export default function URLContainer({ url, title, onCopyURL, copyBtnText, content, contentTitle }) {
    return (
        <>
            <h6 className='text-center fs-6'>{title} <FaHandPointDown className='color-yellow' /></h6>
            <div className='d-flex justify-content-center align-items-center mb-5 w-100 p-0 url-copy-container'>
                <p className='m-2 fs-14'>{url}</p>
                <div className='m-2 d-flex gap-3'>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id={`tooltip-top`}>{copyBtnText}</Tooltip>
                        }
                    >
                        <span className='cursor-pointer' onClick={onCopyURL} ><FaRegCopy /></span>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        trigger="click"
                        rootClose={true}
                        overlay={
                            <Tooltip id='tooltip-top' className='white-tooltip'>
                                <div className='d-flex'>
                                    <span className='fw-500'>Share :</span>
                                    <span className='social-sharing d-flex ms-2 align-items-center gap-2'>
                                        <FaWhatsapp onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(contentTitle + ': ' + content)}`,'_blank')} className='whatsapp cursor-pointer' />
                                        <FaTelegramPlane onClick={() => window.open(`https://telegram.me/share/url?url=${contentTitle}&text=${encodeURIComponent(content)}`, '_blank')} className='telegram cursor-pointer' />
                                        <PiMicrosoftTeamsLogo onClick={() => window.open(`https://teams.microsoft.com/l/message/create?message=${encodeURIComponent(contentTitle + ': ' + content)}`,'_blank')} className='teams cursor-pointer d-none' />
                                        <MdOutlineEmail onClick={() => window.open(`mailto:?subject=${encodeURIComponent(contentTitle)}&body=${encodeURIComponent(content)}`,'_blank')} className='mail cursor-pointer' />
                                    </span>
                                </div>
                            </Tooltip>
                        }
                    >
                        <span className='cursor-pointer'><FaShareSquare /></span>
                    </OverlayTrigger>
                </div>
            </div>
        </>
    )
}
