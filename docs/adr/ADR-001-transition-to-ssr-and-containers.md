# ADR-001: Transition to SSR and Containers

- Status: Accepted
- Date: 2026-10-07

## Context

The site was configured for static output and deployed as files to an S3 bucket
behind CloudFront. Server-rendered routes and runtime operational signals require
a long-running server process, which static hosting cannot provide.

## Decision

Run Astro in server output mode using the `@astrojs/node` adapter in standalone
mode. Package the generated Node.js server in a container for production
deployment. Expose `/api/health/` as a JSON health endpoint and write one
structured JSON access log record for each request to standard output.

The current local build and server entry point are `npm run build` and
`node ./dist/server/entry.mjs`.

## Consequences

- Pages can render at request time and API routes execute in the Node.js
  runtime.
- The service needs a container runtime and health-check configuration; it can
  no longer be deployed by uploading `dist` as static assets.
- The existing ECS service and ECR repository are the deployment targets.
  GitHub Actions runs unit tests, builds and pushes an image tagged with the
  commit SHA, configures the load balancer health check at `/api/health`, and
  rolls out the new task definition using ECS rolling deployment settings.
- The ECS cluster, service, load balancer, and ECR repository are managed
  outside this repository. GitHub Actions requires the `AWS_ACCESS_KEY_ID` and
  `AWS_SECRET_ACCESS_KEY` repository secrets with permission to push to ECR
  and update the ECS service and its target groups.
- Logs are emitted to standard output as JSON, allowing a container platform
  to collect and query request metadata.
- The existing S3 and CloudFront CDK stack remains in the repository but is no
  longer deployed by the main-branch workflow.
- The ECS service's desired capacity, scaling policy, and log-retention policy
  remain managed outside this repository.

## Alternatives Considered

- Keep static output and host only pre-rendered pages: does not support the
  required server-rendered routes or runtime health endpoint.
- Use a serverless adapter: not selected because the target is a containerized
  Node.js service.