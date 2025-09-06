# Pretty Format Implementation Plan

This document tracks support for Git `--pretty` format placeholders in the app.
The goal is to parse a user-supplied format string and render commits with the
same semantics as `git log --pretty=format:"..."`.

## Supported Placeholders
- `%H` / `%h` – commit hash / abbreviated commit hash
- `%T` / `%t` – tree hash / abbreviated tree hash
- `%P` / `%p` – parent hashes / abbreviated parent hashes
- `%an` / `%ae` – author name / email
- `%ad` / `%ar` – author date / relative author date
- `%cn` / `%ce` – committer name / email
- `%cd` / `%cr` – committer date / relative committer date
- `%s` – subject line
- `%d` – ref names
- `%n` – newline
- `%as` / `%cs` – author/committer date, short (`YYYY-MM-DD`)
- `%at` / `%ct` – author/committer date, UNIX timestamp
- `%aN` / `%aE` – author name / email (mailmap)
- `%al` / `%aL` – author email local-part
- `%ai` / `%aI` / `%ah` – author date ISO-like / strict ISO / human
- `%cN` / `%cE` – committer name / email (mailmap)
- `%cl` / `%cL` – committer email local-part
- `%ci` / `%cI` / `%ch` – committer date ISO-like / strict ISO / human

## Planned Additions
The reference (`reference/git_pretty_reference.html`) documents many more
placeholders. Upcoming targets focus on message formatting helpers, decoration
fields, signature indicators, and other advanced features.

## Not Yet Implemented / Tracked
These placeholders exist in the reference but are not yet handled:
- Message/body fields: `%f`, `%b`, `%B`, `%e`
- Decoration fields: `%D`, `%gD`, `%gN`, `%g*`
- GPG/signature fields: `%G*`, `%GF`, `%GG`, `%GP`, `%GS`, `%GT`
- Notes and refs: `%N`, `%S`
- Formatting helpers: `%C(color)`, `%Creset`, `%m`, `%w(...)`, `%xNN` for hex

These items remain TODO and should be implemented or explicitly scoped out in
future iterations.
