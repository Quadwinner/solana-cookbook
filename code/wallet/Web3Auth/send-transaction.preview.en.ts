import { SystemProgram, Transaction, PublicKey } from '@solana/web3.js';

async function sendSolTransaction(publicKey, destPublicKey, amountInSol, blockhash, torus) {
  try {
    if (!publicKey || !destPublicKey || !blockhash || !torus) {
      throw new Error('Missing required parameters: publicKey, destPublicKey, blockhash, or torus.');
    }
    if (amountInSol <= 0) {
      throw new Error('Transfer amount must be greater than zero.');
    }

    const LAMPORTS_PER_SOL = 1_000_000_000;
    const lamports = Math.floor(amountInSol * LAMPORTS_PER_SOL);

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(publicKey),
      toPubkey: new PublicKey(destPublicKey),
      lamports,
    });

    const transaction = new Transaction({
      recentBlockhash,
      feePayer: new PublicKey(publicKey),
    }).add(transferInstruction);

    const transactionSignature = await torus.sendTransaction(transaction);
    return transactionSignature;
  } catch (error) {
    console.error('Error sending transaction:', error.message || error);
    throw error;
  }
}

(async () => {
  try {
    const publicKey = 'senderPublicKeyBase58String';
    const destPublicKey = 'recipientPublicKeyBase58String';
    const amountInSol = 0.1;
    const blockhash = 'recentBlockhashString';
    const torus = {};

    const signature = await sendSolTransaction(publicKey, destPublicKey, amountInSol, blockhash, torus);
    console.log('Transaction Signature:', signature);
  } catch (error) {
    console.error('Failed to execute transaction:', error.message || error);
  }
})();
