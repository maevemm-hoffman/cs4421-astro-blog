# Westmarch Fieldnotes

Westmarch Fieldnotes is an Astro-powered travel journal about the roads,
woodlands, inns, and quiet comforts of Middle-earth. It includes a featured
homepage, a dated journal archive, individual Markdown and MDX entries, an
author page, an RSS feed, and a JSON health-check endpoint.

## Requirements

- Node.js 24.10.0 or newer
- npm

Install the project's dependencies from the repository root:

```sh
npm ci
```

## Local development

Start the Astro development server at `http://localhost:4321/`:

```sh
npm run dev
```

The project also provides these commands:

| Command | Purpose |
| --- | --- |
| `npm run check` | Run Astro and TypeScript checks. |
| `npm run lint` | Run ESLint. |
| `npm run test:unit` | Run unit tests with Vitest. |
| `npm run build` | Build the server-rendered site into `dist/`. |
| `npm run preview` | Preview the production build locally. Run `npm run build` first. |

The production server build uses Astro's standalone Node adapter. To run the
built server directly, first run `npm run build`, then run:

```sh
node ./dist/server/entry.mjs
```

The server listens on port `4321` by default. The `Dockerfile` packages this
build into the production container and includes a health check for
`/api/health/`.

## Blog content

Blog entries live in `src/content/blog/` as `.md` or `.mdx` files. Add an entry
with frontmatter following this pattern:

```yaml
---
title: "A New Fieldnote"
description: "A short summary shown in the journal and page metadata."
pubDate: "Oct 28 2026"
heroImage: "../../assets/blog-placeholder-1.jpg"
author: "maeve"
---

Write the entry here using Markdown.
```

The content schema in `src/content.config.ts` validates the title,
description, publication date, optional updated date, hero image, and author
reference. Authors are Markdown entries in `src/content/authors/`. Images and
fonts used by the site are stored in `src/assets/`; files in `public/` are
served directly from the site root.

The journal archive and homepage sort entries by publication date. Individual
entries are available at `/blog/<entry-id>/`. The author page is at `/about/`.
MDX entries can import Astro components for embedded content.

## Project map

```text
src/
  assets/       Images and local fonts
  components/   Shared page head, navigation, footer, and author/date UI
  content/      Blog entries and author profiles
  layouts/      Shared blog article layout
  pages/        Homepage, archive, about, RSS, health, and post routes
  styles/       Global styles
  utils/        Utilities and unit tests
cdk/            AWS CDK stack for static S3 and CloudFront hosting
docs/           Architecture decision records
tests/          Playwright browser tests
.github/
  workflows/    CI, browser tests, and deployment workflows
```

## Validation

The main CI workflow runs linting, Astro checks, unit tests, and a production
build. Run the same checks locally with:

```sh
npm run lint
npm run check
npm run test:unit
npm run build
```

Playwright tests are configured separately and run with:

```sh
npx playwright install
npx playwright test
```

The current example Playwright tests exercise the Playwright documentation
website, not this blog.

## Deployment

Two GitHub Actions workflows are currently configured to run on pushes to
`main`. They target different hosting approaches, so confirm which one should
be used for production before relying on a push as a single deployment:

- **Container deployment** (`.github/workflows/deploy-container.yml`) builds
  the Docker image, pushes it to Amazon ECR, and updates the AWS ECS Express
  Gateway service in `us-east-1`. It requires `AWS_ACCESS_KEY_ID` and
  `AWS_SECRET_ACCESS_KEY` secrets in the GitHub Actions `npm` environment.
  Container request logs are sent to the CloudWatch Logs group
  `/ecs/infinite-app`.
- **Static deployment** (`.github/workflows/deploy-static.yml`) builds the
  site with `DEPLOY_TARGET=static` and deploys the CDK stack in `cdk/`, which
  uploads the generated files to S3 and serves them through CloudFront. It
  also requires the AWS credentials above.

For static output, set `DEPLOY_TARGET=static` when running the build. In
PowerShell:

```powershell
$env:DEPLOY_TARGET = "static"
npm run build
```

The static output is written to `dist-static/`. The AWS resources for the
container service and the CDK stack are managed in AWS; deployment requires
the appropriate account access and permissions.

## Endpoints and site metadata

- `/` — homepage and interactive route map
- `/blog/` — journal archive
- `/blog/<entry-id>/` — individual journal entry
- `/about/` — about the journal
- `/rss.xml` — RSS feed
- `/api/health/` — JSON health status, process uptime, and timestamp

Set the `site` URL in `astro.config.mjs` to the canonical production domain.
Astro uses it when generating canonical URLs, the sitemap, and feed metadata.
