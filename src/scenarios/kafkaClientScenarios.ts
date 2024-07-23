
//@ts-ignore
import { KafkaClient } from '../libs/kafkaClient';

// const brokers = ["localhost:9092"];
const brokers = ["kafka-cluster-kafka-brokers.middleware:9092"];
const kafkaClient = new KafkaClient(brokers);

function generateRandomTopicName() {
  return `topic-${Math.random().toString(36).substring(7)}`;
}

export async function kafkaCreateTopic() {
  const topicName = generateRandomTopicName();
  try {
    const createTopicResult = await kafkaClient.createTopic(topicName, 3, 1);
    console.log('Topic created:', topicName, createTopicResult);
  } catch (error) {
    console.error('Error creating topic:', error);
  }
}

export async function kafkaDeleteTopic() {
  const topicName = generateRandomTopicName();
  try {
    const deleteTopicResult = await kafkaClient.deleteTopic(topicName);
    console.log('Topic deleted:', topicName, deleteTopicResult);
  } catch (error) {
    console.error('Error deleting topic:', error);
  }
}

export async function kafkaProduceMessage() {
  const topicName = generateRandomTopicName();
  try {
    const produceMessageResult = await kafkaClient.produceMessage(topicName, ['message1', 'message2']);
    console.log('Messages produced:', topicName, produceMessageResult);
  } catch (error) {
    console.error('Error producing messages:', error);
  }
}

export async function kafkaConsumeMessage() {
  const topicName = generateRandomTopicName();
  try {
    const messages = await kafkaClient.consumeMessage('test-group', topicName);
    console.log('Messages consumed:', topicName, messages);
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
}




// import { KafkaClient } from '../libs/KafkaClient';

// // const brokers = ["localhost:9092"];
// const brokers = ["kafka-cluster-kafka-brokers.middleware:9092"];
// const kafkaClient = new KafkaClient(brokers);

// export function kafkaCreateTopic(){
//   const createTopicResult = kafkaClient.createTopic('test-topic', 3, 1);
//   console.log('Topic created:', createTopicResult);
// }
// export function kafkaDeleteTopic(){
//   const deleteTopicResult = kafkaClient.deleteTopic('test-topic');
//   console.log('Topic deleted:', deleteTopicResult);
// }
// export function kafkaProduceMessage(){
//   const produceMessageResult = kafkaClient.produceMessage('test-topic', ['message1', 'message2']);
//   console.log('Messages produced:', produceMessageResult);
// }
// export function kafkaConsumeMessage(){
//   const messages = kafkaClient.consumeMessage('test-group', 'test-topic');
//   console.log('Messages consumed:', messages);
// }





// async function main() {
//   try {
//     // Create a topic
//     const createTopicResult = kafkaClient.createTopic('example-topic', 3, 1);
//     console.log('Topic created:', createTopicResult);

//     // Produce messages
//     const produceMessageResult = kafkaClient.produceMessage('example-topic', ['message1', 'message2']);
//     console.log('Messages produced:', produceMessageResult);

//     // Consume messages
//     const messages = kafkaClient.consumeMessage('example-group', 'example-topic');
//     console.log('Messages consumed:', messages);

//     // Delete the topic
//     const deleteTopicResult = kafkaClient.deleteTopic('example-topic');
//     console.log('Topic deleted:', deleteTopicResult);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }
