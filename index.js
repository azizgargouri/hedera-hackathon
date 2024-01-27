









const {
    Client,
    TopicCreateTransaction,
    TopicUpdateTransaction,
    TopicMessageSubmitTransaction,
    TopicInfoQuery,
    PrivateKey,
    Hbar,
  } = require("@hashgraph/sdk");
  
  async function main() {
    // Set up the client
    const myAccountId = "0.0.7713480";
    const myPrivateKey = "302e020100300506032b657004220420ae093cf6c6e504abe634761cfc895627045b2bab5be0624110d6e9ee51a5f486";
  
  
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
  
    //Create keys
    const adminKey = PrivateKey.generate();
    const submitKey = PrivateKey.generate();
  
    // Create a new topic
    let transaction = await new TopicCreateTransaction()
      .setAdminKey(adminKey)
      .setSubmitKey(submitKey)
      .setTopicMemo("Test memo")
      .freezeWith(client);
  
    //sign & execute
    const sign1 = await transaction.sign(adminKey);
    const sign2 = await sign1.sign(submitKey);
    const txId = await sign2.execute(client);
  
    const receipt = await txId.getReceipt(client);
    const topicId = receipt.topicId;
    console.log(topicId);
  
    // Query the topic info
    const topicInfo = await new TopicInfoQuery()
      .setTopicId(topicId)
      .execute(client);
  
    console.log("Topic Memo:", topicInfo.topicMemo);
  
    // Update the topic memo
    let updateTransaction = await new TopicUpdateTransaction()
      .setTopicId(topicId)
      .setTopicMemo("test memo 2")
      .freezeWith(client);
  
    //sign & execute
    const sign3 = await updateTransaction.sign(adminKey);
    const sign4 = await sign3.sign(submitKey);
    const txId1 = await sign4.execute(client);
  
    // Query the topic info 2
    const topicInfo2 = await new TopicInfoQuery()
      .setTopicId(topicId)
      .execute(client);
  
    console.log("Update:");
    console.log("Topic Memo:", topicInfo2.topicMemo);
  
    // Submit a message to the topic
    const messageTransactionId = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage("Hello everyone")
      .execute(client);
  
    console.log("Message transaction ID:", messageTransactionId);
  }
  
  main().catch((err) => {
    console.error(err);
  });