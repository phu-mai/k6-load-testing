export { getUserInfo } from "../../scenarios/usersScenarios";
import { k6Executor } from "../../libs/executor";

// Initialize the executor
const k6exec = new k6Executor();

// Define the functions to be executed and the execution strategy

const funcExecution = ['getUserInfo'];
const executor = __ENV.EXECUTOR || 'per-vu-iterations';

// Generate scenarios using the executor
const scenarios = k6exec.generateScenarios(funcExecution, executor);
const threshold = Object.assign(
  {},
  k6exec.generateCustomThreshold('http_req_duration{ scenario: getUserInfo }', 'avg<=23904'),
  k6exec.generateCustomThreshold('http_req_failed{ scenario: getUserInfo }', 'rate<=0.03'),
);

export const options = {
  scenarios: scenarios,
  thresholds: threshold,
};
