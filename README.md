# Ticker Research

Ticker research with parallel web search and LLM synthesis. Built for the CascadiaJS 2026 workshop on Render Workflows.

## What it does

Enter a stock ticker. The app runs four Exa web searches in parallel, then asks Claude to write a structured research memo from the results. Version 1 is intentionally flaky: each search has a 30% random failure rate so workshop attendees can see what breaks before adding Render Workflows.

## Architecture

![Architecture diagram](static/images/architecture-diagram.png)

![Pipeline flow](static/images/pipeline-flow.png)

TODO: add `static/images/architecture-diagram.png` and `static/images/pipeline-flow.png`.

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ojusave/workshop-demo)

Infrastructure is defined in [`render.yaml`](render.yaml). Set these environment variables in the Render Dashboard:

| Variable | Required in v1 |
|----------|----------------|
| `ANTHROPIC_API_KEY` | Yes |
| `EXA_API_KEY` | Yes |
| `RENDER_API_KEY` | Reserved for v2 |

## Run locally

```bash
npm install
cp .env.example .env
# Add ANTHROPIC_API_KEY and EXA_API_KEY
npm run dev
```

Open the UI at `http://localhost:5173`. The API listens on port 3000.

## The failure is intentional

`tasks/src/search.ts` throws on roughly 30% of calls with a fake rate-limit error. Four parallel searches via `Promise.all` in `tasks/src/research.ts` means most v1 runs fail when any single search throws. That is the workshop teaching moment. Version 2 wraps the same task files in Render Workflows with retries.

## Project structure

| Path | Purpose |
|------|---------|
| `server/src/` | Express API and SSE stream |
| `tasks/src/` | Search, synthesis, and orchestration (becomes Workflow tasks in v2) |
| `ui/src/` | React UI |
| `shared/types.ts` | Shared event and data types |

## Not investment advice

Generated memos are for demonstration only. They are not financial advice.

---

[Sign up on Render](https://dashboard.render.com/register?utm_source=github&utm_medium=referral&utm_campaign=ojus_demos&utm_content=footer_link)
