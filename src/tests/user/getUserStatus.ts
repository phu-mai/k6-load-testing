export { getUserStatus } from "../../scenarios/usersScenarios";
import { k6Executor } from "../../libs/executor";

// Initialize the executor
const k6exec = new k6Executor();

// Define the functions to be executed and the execution strategy
const funcExecution = ['getUserStatus'];
const executor = __ENV.EXECUTOR || 'per-vu-iterations';

// Generate scenarios using the executor
const scenarios = k6exec.generateScenarios(funcExecution, executor);
const threshold = Object.assign(
  {},
  k6exec.generateCustomThreshold('http_req_duration{ scenario: getUserStatus }', 'avg<=23904'),
  k6exec.generateCustomThreshold('http_req_failed{ scenario: getUserStatus }', 'rate<=0.03'),
);

export const options = {
  scenarios: scenarios,
  thresholds: threshold,
};
