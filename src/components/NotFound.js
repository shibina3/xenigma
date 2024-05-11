import React from 'react'

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-code">404</h1>
                <p className="not-found-text">Page Not Found</p>
                <a href="/" className="not-found-home-link">Go Home</a>
            </div>
        </div>
    )
}
