# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   type-check the project
* `npm run watch`   watch for changes and type-check
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Optional server-rendered stack example

`lib/server-rendered-stack.ts` contains a separate example stack for hosting the
Astro Node server in ECS Fargate behind an Application Load Balancer. It builds
the container from the repository's root `Dockerfile` and sends container logs
to CloudWatch Logs.

This stack is intentionally not instantiated by `bin/cdk.ts` and is not
deployed by the existing workflows. The active CDK app remains the static S3
and CloudFront stack in `lib/cdk-stack.ts`. Review networking, capacity,
security, domain/HTTPS, and cost settings before choosing to wire in or deploy
the server-rendered example.
