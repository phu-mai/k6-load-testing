export { kafkaCreateTopic } from "../../scenarios/kafkaClientScenarios";
import { k6Executor } from "../../libs/executor";

// Initialize the executor
const k6exec = new k6Executor();
const funcExecution = ['kafkaCreateTopic'];
const executor = __ENV.EXECUTOR || 'per-vu-iterations';
const scenarios = k6exec.generateScenarios(funcExecution, executor);
const threshold = Object.assign(
  {},
  k6exec.generateCustomThreshold('http_req_duration{ scenario: kafkaCreateTopic }', 'avg<=23904'),
  k6exec.generateCustomThreshold('http_req_failed{ scenario: kafkaCreateTopic }', 'rate<=0.03'),
);
export const options = {
  scenarios: scenarios,
  thresholds: threshold,
}
