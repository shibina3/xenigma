# Xenigma
[![Release Status](https://github.com/shibina3/xenigma/actions/workflows/release.yml/badge.svg)](https://github.com/shibina3/xenigma/actions/workflows/release.yml)
[![License](https://img.shields.io/github/license/shibina3/xenigma)](https://github.com/shibina3/xenigma/blob/main/LICENSE)

## What is it?
[Xenigma](https://shibina3.github.io/xenigma) is a web based, fully client-side encryption tool that allows users securely share secrets without having the need to install any software. Xenigma is built on top of [Xipher](https://github.com/shibme/xipher) and is interoperable with it.

### Under the Hood
Xenigma uses the following cryptographic algorithms through xipher web assembly to compress and secure the data:
- [Argon2id](https://en.wikipedia.org/wiki/Argon2) for password hashing.
- [Curve25519](https://en.wikipedia.org/wiki/Curve25519) for elliptic curve cryptography.
- [XChaCha20-Poly1305](https://en.wikipedia.org/wiki/ChaCha20-Poly1305) for symmetric encryption.
- [Zlib](https://en.wikipedia.org/wiki/Zlib) for compression.

## Getting Started
Use [this link](https://shibina3.github.io/xenigma) to access Xenigma the web app.

## How does it work?
The following sequence diagram illustrates the workflow of Xenigma
```mermaid
sequenceDiagram
participant RX as Xenigma<br>(on Browser)
actor Receiver
actor Sender
participant SX as Xenigma<br>(on Browser)
    Receiver-->>+RX: Opens Xenigma App on browser
    RX-->>RX: Generates a key pair and stores them in the browser local storage
    RX-->>-Receiver: Returns the Public Key<br>(as a URL that can be shared)
    Receiver->>+Sender: Shares the encryption URL<br>(this contains the public key as parameter)
    Sender-->>+SX: Opens the public encryption URL<br>(opens Xenigma encryption web page)
    Sender-->>SX: Inputs the data that needs to be encrypted
    SX-->>SX: Encrypts the data using the public key from the URL
    SX-->>-Sender: Returns ciphertext encrypted with the Public Key
    Sender->>-Receiver: Sends the encrypted ciphertext to the Receiver
    Receiver-->>+RX: Inputs the ciphertext<br>(in the decyrption page)
    RX-->>RX: Decrypts the ciphertext<br>(using the secret key from local storage)
    RX-->>-Receiver: Returns decrypted data
```

