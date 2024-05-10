const xipher = {
    newSecretKey() {
        const response = JSON.parse(window.xipherNewSecretKey());
        if (response.error) {
            throw new Error(response.error);
        }
        return response.result;
    },

    getPublicKey(xSecret) {
        const response = JSON.parse(window.xipherGetPublicKey(xSecret));
        if (response.error) {
            throw new Error(response.error);
        }
        return response.result;
    },

    encryptStr(publicKey, str) {
        const response = JSON.parse(window.xipherEncryptStr(publicKey, str));
        if (response.error) {
            throw new Error(response.error);
        }
        return response.result;
    },

    decryptStr(xSecret, cipherText) {
        const response = JSON.parse(window.xipherDecryptStr(xSecret, cipherText));
        if (response.error) {
            throw new Error(response.error);
        }
        return response.result;
    }
};

export default xipher;