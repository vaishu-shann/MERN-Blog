const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');


const validateAddress = async function (walletAddress) {
    return Web3.utils.isAddress(walletAddress);
}

const convertToChecksum = async function (walletAddress) {
    return Web3.utils.toChecksumAddress(walletAddress);
}


const verifySignature = async function (walletAddress, signature) {
    const result = new Promise((resolve, reject) => {
        try {

        } catch (e) {
            console.log("error in verifySignature", e)
            resolve(false);
        }
    })
}

module.exports = {
    validateAddress,
    convertToChecksum,
    verifySignature,

}