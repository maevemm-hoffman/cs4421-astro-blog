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
- Logs are emitted to standard output as JSON, allowing a container platform
  to collect and query request metadata.
- The existing CDK stack and GitHub Actions workflow still deploy to S3 and
  CloudFront. They must be migrated to build and deploy the container before
  this SSR architecture is used in production.
- A deployment platform, scaling policy, and log-retention policy remain to be
  selected as part of that migration.

## Alternatives Considered

- Keep static output and host only pre-rendered pages: does not support the
  required server-rendered routes or runtime health endpoint.
- Use a serverless adapter: not selected because the target is a containerized
  Node.js service.