export { findAllDocuments } from '../../scenarios/mongoDBScenarios';
import { k6Executor } from '../../libs/executor';

const k6exec = new k6Executor();

// Define the functions to be executed and the execution strategy

const funcExecution = ['findAllDocuments'];

const executor = __ENV.EXECUTOR || 'per-vu-iterations';

// Generate scenarios using the executor
const scenarios = k6exec.generateScenarios(funcExecution, executor);
const threshold = Object.assign(
  {},
  k6exec.generateCustomThreshold('http_req_duration{ scenario: findAllDocuments }', 'avg<=23904'),
  k6exec.generateCustomThreshold('http_req_failed{ scenario: findAllDocuments }', 'rate<=0.03'),
);
export const options = {
  scenarios: scenarios,
  thresholds: threshold,
};
