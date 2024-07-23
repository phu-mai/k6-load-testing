// const defaultEnv = { name: __ENV.ENV || 'perf' };
// const defaultVUs = __ENV.VUS || 1;
// const defaultIterations = __ENV.ITERATIONS || 1;
// const defaultDuration = __ENV.DURATION || '1m';
// const defaultMaxDuration = __ENV.MAX_DURATION || '1m';
// const defaultRate = __ENV.RATE || 1;
// const defaultTimeUnit = __ENV.TIME_UNIT || '1s';
// const defaultStartTime = __ENV.START_TIME || '0s';

// const generateScenarioPerVuIterations = (name, vus, iterations, maxDuration, startTime ) => ({
//   [name]: {
//     executor: 'per-vu-iterations',
//     vus: vus || 1,
//     startTime: startTime || '0s',
//     iterations: iterations || 1,
//     maxDuration: maxDuration || '1m',
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarioConstantArrivalRate = (name, duration, rate, timeUnit, preAllocatedVUs, startTime) => ({
//   [name]: {
//     executor: 'constant-arrival-rate',
//     startTime: startTime || '0s',
//     duration: duration || '1m',
//     rate: rate || 1,
//     timeUnit: timeUnit ,
//     preAllocatedVUs: preAllocatedVUs ,
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarioConstantVUs = (name, vus, duration, startTime) => ({
//   [name]: {
//     executor: 'constant-vus',
//     vus: vus,
//     startTime: startTime,
//     duration: duration,
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarios = (funcExecution, executor) => {
//   const scenarios = {};
//   for (let func of funcExecution) {
//     switch (executor) {
//       case 'per-vu-iterations':
//         Object.assign(scenarios, generateScenarioPerVuIterations(func, defaultVUs, defaultIterations, defaultMaxDuration, defaultStartTime));
//         break;
//       case 'constant-arrival-rate':
//         Object.assign(scenarios, generateScenarioConstantArrivalRate(func, defaultDuration, defaultRate, defaultTimeUnit, defaultVUs, defaultStartTime));
//         break;
//       case 'constant-vus':
//         Object.assign(scenarios, generateScenarioConstantVUs(func, defaultVUs, defaultDuration, defaultStartTime));
//         break;
//       default:
//         console.error('Unknown executor type:', executor);
//     }
//   }
//   return scenarios;
// };

// const generateReqFailedThreshold = (metric, value) => ({
//   [`http_req_failed{name: ${metric}}`]: [`${value}`],
// });

// const generateCustomThreshold = (metric, value) => {
//   // Split the value string into an array of individual threshold values and trim any whitespace
//   const values = value.split(',').map(val => val.trim());
//   return {
//     [metric]: values,
//   };
// };

// /**
//  * Generates a threshold configuration for HTTP request duration.
//  *
//  * @param {string} metric - The name of the metric.
//  * @param {string} value - A comma-separated string of threshold values.
//  * @returns {Object} - The threshold configuration object.
//  */
// const generateReqDurationThreshold = (metric, value) => {
//   // Split the value string into an array of individual threshold values and trim any whitespace
//   const values = value.split(',').map(val => val.trim());
//   return {
//     // Create a property with the metric name and its threshold values
//     [`http_req_duration{name: "${metric}"}`]: values,
//   };
// };

// export {
//   generateScenarios,
//   generateScenarioConstantVUs,
//   generateScenarioConstantArrivalRate,
//   generateScenarioPerVuIterations,
//   generateReqDurationThreshold,
//   generateCustomThreshold,
//   generateReqFailedThreshold
// };

export class k6Executor { 
  private VUs: number;
  private iterations: number;
  private duration: string;
  private maxDuration: string;
  private rate: number;
  private timeUnit: string;
  private startTime: string;
  constructor() {
    this.VUs = Number(__ENV.VUS) || 1;
    this.iterations = Number(__ENV.ITERATIONS) || 1;
    this.duration = __ENV.DURATION || '1m';
    this.maxDuration = __ENV.MAX_DURATION || '1m';
    this.rate = Number(__ENV.RATE) || 1;
    this.timeUnit = __ENV.TIME_UNIT || '1s';
    this.startTime = __ENV.START_TIME || '0s';
  }
  generateScenarioPerVuIterations(name: string){
    return {
      [name]: {
        executor: 'per-vu-iterations',
        vus: this.VUs,
        startTime: this.startTime,
        iterations: this.iterations,
        maxDuration: this.maxDuration,
        tags: { name: name },
        env: { name: __ENV.ENV || 'perf' },
        exec: name
      }
    }
  }
  generateScenarioConstantArrivalRate(name: string){
    return {
      [name]: {
        executor: 'constant-arrival-rate',
        startTime: this.startTime,
        duration: this.duration,
        rate: this.rate,
        timeUnit: this.timeUnit,
        preAllocatedVUs: this.VUs,
        tags: { name: name },
        env: { name: __ENV.ENV || 'perf' },
        exec: name
      }
    }
  }
  generateScenarioConstantVUs(name: string){
    return {
      [name]: {
        executor: 'constant-vus',
        vus: this.VUs,
        startTime: this.startTime,
        duration: this.duration,
        tags: { name: name },
        env: { name: __ENV.ENV || 'perf' },
        exec: name
      }
    }
  }
  generateScenarios(funcExecution: string[], executor: string){
    const scenarios = {};
    for (let func of funcExecution) {
      switch (executor) {
        case 'per-vu-iterations':
          Object.assign(scenarios, this.generateScenarioPerVuIterations(func));
          break;
        case 'constant-arrival-rate':
          Object.assign(scenarios, this.generateScenarioConstantArrivalRate(func));
          break;
        case 'constant-vus':
          Object.assign(scenarios, this.generateScenarioConstantVUs(func));
          break;
        default:
          console.error('Unknown executor type:', executor);
      }
    }
    return scenarios;
  }
  generateReqFailedThreshold(metric: string, value: string){
    return {
      [`http_req_failed{name: ${metric}}`]: [`${value}`],
    };
  }
  generateCustomThreshold(metric: string, value: string){
    const values = value.split(',').map(val => val.trim());
    return {
      [metric]: values,
    };
  }
  generateReqDurationThreshold(metric: string, value: string){
    const values = value.split(',').map(val => val.trim());
    return {
      [`http_req_duration{name: "${metric}"}`]: values,
    };
  }
}


