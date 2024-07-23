//@ts-ignore
import * as kafka from "k6/x/kafka";

export class KafkaClient {
  brokers: string[];

  constructor(brokers: string[]) {
    this.brokers = brokers;
  }

  private createConnection() {
    return new kafka.Connection({
      address: this.brokers[0],
    });
  }

  createTopic(topic: string, numPartitions: number = 1, replicationFactor: number = 1) {
    const connection = this.createConnection();

    try {
      const configEntries = [
        {
          configName: 'compression.type',
          configValue: kafka.CODEC_SNAPPY, // Ensure this value exists in the kafka module
        },
      ];

      const results = connection.createTopic({
        topic: topic,
        numPartitions: numPartitions,
        replicationFactor: replicationFactor,
        configEntries: configEntries,
      });

      return results; // Return results if necessary
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    } finally {
      connection.close();
    }
  }

  deleteTopic(topic: string) {
    const connection = this.createConnection();

    try {
      const results = connection.deleteTopic(topic);
      return results;
    } catch (error) {
      console.error("Error deleting topic:", error);
      throw error;
    } finally {
      connection.close();
    }
  }

  produceMessage(topic: string, messages: string[]) {
    const writer = new kafka.Writer({
      brokers: this.brokers,
      topic: topic,
      compression: kafka.CODEC_SNAPPY, // Ensure this value exists in the kafka module
    });

    try {
      const error = writer.produce({ messages: messages });
      return error; // Return error if necessary
    } catch (error) {
      console.error("Error producing message:", error);
      throw error;
    } finally {
      writer.close();
    }
  }

  consumeMessage(groupID: string, topic: string, limit: number = 10) {
    const reader = new kafka.Reader({
      brokers: this.brokers,
      groupID: groupID,
      groupTopics: [topic],
    });

    try {
      const messages = reader.consume({ limit: limit });
      return messages; // Return messages if necessary
    } catch (error) {
      console.error("Error consuming message:", error);
      throw error;
    } finally {
      reader.close();
    }
  }
}
