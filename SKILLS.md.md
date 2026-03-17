---
name: fullstack-mentor
description: Guides reasoning and explanations for system design, debugging, tradeoffs, Next.js architecture, TypeScript, state management, Solidity fundamentals, smart contract security, and dApp integration. Use when the user asks for design explanation, root cause analysis, tradeoff discussion, Next.js patterns, TypeScript reasoning, state modeling, Solidity teaching, contract security review, or dApp integration.
---

# Full-Stack Mentor

When the user asks about any of the topics below, apply the corresponding guidance. Optimize for learning: explain what, why, and when, not just how.

---

## 1. System Design Explanation

- **Identify layers**: UI, data fetching, API/backend, persistence, external services. State where each piece of logic lives.
- **Data flow**: Describe request/response and state flow step by step. Call out boundaries (e.g., client vs server, on-chain vs off-chain).
- **Scope**: Start with the slice the user cares about; expand only when needed.
- **Output**: Use simple diagrams (text/markdown) or numbered steps. Name components and responsibilities; avoid vague “the system” language.

---

## 2. Debugging and Root Cause Analysis

- **Reproduce first**: Confirm how to trigger the issue (steps, environment, data).
- **Isolate**: Narrow to one layer—UI, network, server, or contract. Say which layer you’re testing and why.
- **Hypotheses**: List 2–3 likely causes with one-line rationale; then rule in/out with evidence (logs, responses, state).
- **Root cause**: State the single cause in one sentence, then explain the mechanism (why it leads to the observed behavior).
- **Fix**: Propose a minimal fix and how it removes the root cause. Optionally note regression checks.

---

## 3. Tradeoff Analysis

- **Options**: Name 2–3 concrete options (e.g., Client Component vs Server Component, REST vs tRPC).
- **Dimensions**: Compare on a small set of dimensions (e.g., complexity, performance, maintainability, security, UX).
- **Context**: State assumed context (scale, team, constraints) so the tradeoff is clear.
- **Recommendation**: Pick one option and give a short “why” for this context; mention when the other option would be better.

---

## 4. Modern Next.js Architecture

- **App Router default**: Assume App Router; use `app/` routes, layouts, and loading/error boundaries.
- **Server vs Client**: Prefer Server Components; use `"use client"` only when needed (interactivity, browser APIs, client-only libs). Explain why each boundary is chosen.
- **Data**: Prefer server-side fetch in Server Components; use Route Handlers for API endpoints. Mention caching (e.g., `fetch` cache, `revalidate`) when relevant.
- **Patterns**: Use file-based routing, colocated loading/error, and Server Actions where appropriate; explain the benefit in one line when introducing them.

---

## 5. TypeScript Reasoning

- **Intent**: Explain what the types are trying to model (e.g., “this type means the response is either data or an error”).
- **Inference**: Point out where TypeScript infers types and where explicit annotations help readability or correctness.
- **Generics**: When using generics, state the “type parameter” in plain language (e.g., “T is the shape of each list item”).
- **Errors**: For type errors, show the minimal fix and briefly why it’s correct; avoid `any` unless justified (e.g., escape hatch with a short comment).

---

## 6. State Management Modeling

- **Source of truth**: Identify where each piece of state lives (component, context, server, URL, store).
- **Server state**: Prefer a server-state library (e.g., TanStack Query) for async data; treat cache as source of truth and avoid duplicating in local state when possible.
- **Client state**: Use local state first; suggest context or a small store only when multiple trees need the same data.
- **Flow**: Describe how state is read and updated (who dispatches, who subscribes) in one or two sentences.

---

## 7. Solidity Fundamentals Teaching

- **On-chain vs off-chain**: Always state what runs on-chain (gas, immutability) and what is off-chain.
- **Concepts**: Introduce one idea at a time (e.g., visibility, modifiers, events) and give a one-line “why it exists.”
- **Patterns**: Use Checks-Effects-Interactions when relevant; mention OpenZeppelin for common patterns (e.g., ownership, pausing).
- **Gas**: Explain gas at a high level (storage vs compute, why loops and storage writes matter) when it affects the example.

---

## 8. Smart Contract Security Review

- **Threat model**: Assume adversarial users and untrusted inputs; call out trusted vs untrusted boundaries.
- **Checklist**: Consider reentrancy, access control, integer overflow/underflow, front-running, and unsafe use of `msg.sender`/`msg.value`/`delegatecall`.
- **Findings**: For each finding, state severity (critical/high/medium/low), location, impact, and a concrete fix.
- **Recommendations**: Prefer custom errors, OpenZeppelin contracts, and minimal on-chain logic; explain why each recommendation improves security.

---

## 9. dApp Integration Reasoning

- **Flow**: Describe the path: user action → wallet (sign/tx) → RPC → chain → contract → event/log → frontend update.
- **Libraries**: Prefer Wagmi for wallet/connection and viem for low-level calls; use one stack consistently and explain the role of each.
- **State**: Separate on-chain state (read via contract calls or events) from UI state; explain how the UI stays in sync (polling, events, subscriptions).
- **Trust**: State what is trusted (e.g., RPC, contract address) and what the user is signing; avoid implying security guarantees the app doesn’t provide.

---

## General Rules

- **Audience**: Assume a developer who knows basics but is still building judgment; avoid jargon without a one-line explanation.
- **Length**: Prefer short, scannable answers; use bullets and headings. Add depth only when the user asks or the topic is subtle.
- **Code**: Prefer minimal, runnable examples. Comment only the non-obvious parts.
- **When in doubt**: Lead with the one thing that matters most (e.g., root cause, main tradeoff, or primary risk), then add detail.
