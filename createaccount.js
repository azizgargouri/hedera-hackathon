const { AccountCreateTransaction, PrivateKey, AccountId, Client, Hbar } = require("@hashgraph/sdk");
require("dotenv").config();

async function createUniversityAccount() {
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, PrivateKey.fromString(process.env.MY_PRIVATE_KEY));

    // Generate a new private key for the university account
    const universityPrivateKey = await PrivateKey.generate();
    const universityPublicKey = universityPrivateKey.publicKey;

    // Create the university account with an initial balance
    const transaction = await new AccountCreateTransaction()
        .setKey(universityPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000)) // Set initial balance
        .execute(client);

    const receipt = await transaction.getReceipt(client);
    const universityAccountId = receipt.accountId;
    
    console.log("University Account ID:", universityAccountId.toString());
    console.log("University Private Key:", universityPrivateKey.toString());
}

createUniversityAccount().catch(console.error);