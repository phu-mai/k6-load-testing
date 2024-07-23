
```markdown
# Load Testing Project

This repository contains the codebase for a comprehensive load testing suite using k6. It is designed to simulate various scenarios to test the performance and resilience of backend services, including databases and message brokers like Kafka and MongoDB.

## Project Structure

- **.babelrc**: Babel configuration file for JavaScript transpilation.
- **bin/**: Contains binary files.
- **config/**: Configuration files and environment-specific settings.
  - **data/**: Houses performance-related databases like `perf.sqlite`.
  - **env/**: Environment-specific configuration files, such as `perf.json`.
- **files/**: Directory for miscellaneous files.
- **k6**: Entry point for k6 load testing scripts.
- **Makefile**: Contains scripts for common tasks to build, run, and test the application.
- **package.json**: Node.js package configuration, including dependencies and scripts.
- **README.md**: This file, providing an overview and documentation for the project.
- **scripts/**: Additional utility scripts.
- **src/**: Source code for the load testing scripts and utilities.
  - **libs/**: Libraries and clients for interacting with databases and services.
  - **providers/**: Data providers for the load testing scenarios.
  - **scenarios/**: Individual load testing scenarios.
  - **tests/**: Contains subdirectories for different types of tests.
  - **utils/**: Utility functions and helpers.
- **tsconfig.json**: TypeScript configuration file.
- **webpack.config.js**: Webpack configuration for bundling JavaScript.

## Getting Started

To get started with this load testing project, ensure you have Node.js and k6 installed on your system. Then, follow these steps:

1. Install dependencies:
   ```sh
   npm install
   ```
