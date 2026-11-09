# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-09

### Added
- Complete Next.js 16 App Router foundation portal with responsive design.
- Pesapal API 3.0 payment checkout integration with mobile money and card processing (`/api/pesapal-checkout`).
- Idempotent Pesapal IPN webhook receiver with fraud detection and amount mismatch guards (`/api/pesapal-webhook`).
- In-memory and persistent payment tracking state machine with status progression (`PENDING`, `COMPLETED`, `FAILED`, `REVERSED`, `INVALID`).
- Comprehensive unit test suite with 13 deterministic assertions covering state transitions, duplicate reference detection, timeout handling, and tampering rejection.
- Standard ecosystem governance suite: `.editorconfig`, issue forms, pull request templates, Code of Conduct, Contributing guide, and Security policy.
- Automated GitHub Actions continuous integration pipeline for Node.js 20.
