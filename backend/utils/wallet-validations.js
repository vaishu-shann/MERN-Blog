
const web3Utils = require('./web3-utils');

const validateWalletAddress = async function (req, res, next) {
    let walletAddress;

    // Check the api method type and figure out if its in body or pararms
    if (req.body.walletAddress) {
        walletAddress = req.body.walletAddress
    } else if (req.params.walletAddress) {
        walletAddress = req.params.walletAddress;
    } else {
        return res.status(400).json({ success: false, message: 'Wallet Address is required in the request.' });
    }

    // Checks if the given string is a valid Ethereum address.
    const isAddress = await web3Utils.validateAddress(walletAddress);

    // If yes, convert the same in checksum and save to the req.body
    if (isAddress) {
        req.body.walletAddress = await web3Utils.convertToChecksum(walletAddress);
        next();
    } else {
        return res.status(400).json({ success: false, message: 'Entered address is not a valid Ethereum wallet address.' });
    }
}

module.exports = {
    validateWalletAddress,

}