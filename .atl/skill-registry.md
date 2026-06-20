# Skill Registry — mi-proceso

Generated: 2026-06-20T16:25:00-03:00
Mode: engram
Strict TDD: false

## Global Skills (opencode)

| Skill | Path | Triggers |
|-------|------|----------|
| work-unit-commits | ~/.config/opencode/skills/work-unit-commits/SKILL.md | implementation, commit splitting, chained PRs, keeping tests/docs with code |
| comment-writer | ~/.config/opencode/skills/comment-writer/SKILL.md | PR feedback, issue replies, reviews, Slack, GitHub comments |
| cognitive-doc-design | ~/.config/opencode/skills/cognitive-doc-design/SKILL.md | writing guides, READMEs, RFCs, onboarding, architecture, review-facing docs |
| chained-pr | ~/.config/opencode/skills/chained-pr/SKILL.md | PRs >400 lines, stacked PRs, review slices |
| branch-pr | ~/.config/opencode/skills/branch-pr/SKILL.md | creating, opening, preparing PRs for review |
| issue-creation | ~/.config/opencode/skills/issue-creation/SKILL.md | GitHub issues, bug reports, feature requests |
| skill-creator | ~/.config/opencode/skills/skill-creator/SKILL.md | new skills, agent instructions, documenting AI usage patterns |
| skill-registry | ~/.config/opencode/skills/skill-registry/SKILL.md | updating skill registry |
| go-testing | ~/.config/opencode/skills/go-testing/SKILL.md | Go tests, test coverage, Bubbletea teatest, golden files |
| judgment-day | ~/.config/opencode/skills/judgment-day/SKILL.md | dual review, adversarial review, juzgar |
| inter-agent-engram | ~/.config/opencode/skills/inter-agent-engram/SKILL.md | multi-agent coordination, inter-agent communication |
| sdd-* (init/explore/propose/spec/design/tasks/apply/verify/archive/onboard) | ~/.config/opencode/skills/sdd-*/SKILL.md | SDD workflow phases |
| _shared | ~/.config/opencode/skills/_shared/SKILL.md | SDD shared references (not invokable) |

## Global Skills (claude)

| Skill | Path | Triggers |
|-------|------|----------|
| fusalabs-internal-comms | ~/.claude/skills/fusalabs-internal-comms/SKILL.md | internal team messages via mail/Telegram |
| fusalabs-meeting-feedback | ~/.claude/skills/fusalabs-meeting-feedback/SKILL.md | Fathom meeting processing, feedback |
| fusalabs-notion-interpretation | ~/.claude/skills/fusalabs-notion-interpretation/SKILL.md | session interpretation → Notion extractos |
| fusalabs-notion-action | ~/.claude/skills/fusalabs-notion-action/SKILL.md | Notion Brain changes with human validation |
| fusalabs-work-log | ~/.claude/skills/fusalabs-work-log/SKILL.md | agent work session logging for billing |
| agent-coordination | ~/.claude/skills/agent-coordination/SKILL.md | multi-agent parallel work, worktrees |
| argentina-al-espacio-* | ~/.claude/skills/argentina-al-espacio-*/SKILL.md | hackathon communications, PDF, video, stories, ads, HTML |
| muzzarella-* | ~/.claude/skills/muzzarella-*/SKILL.md | rotisería content: ads, video, stories, carrusel, creativa |
| future-* | ~/.claude/skills/future-*/SKILL.md | carrusel, mass-mail, stories-conversion |
| carrusel-politico | ~/.claude/skills/carrusel-politico/SKILL.md | political news carousels |
| video-postproduccion | ~/.claude/skills/video-postproduccion/SKILL.md | raw video/audio post-production with Remotion |

## Project Convention Files

| File | Content |
|------|---------|
| AGENTS.md | Next.js 16 breaking changes warning — read node_modules/next/dist/docs/ before coding |
| CLAUDE.md | References AGENTS.md |

## Dedup Notes

- No project-level skills found (skills/, .opencode/skills/, .claude/skills/ absent)
- Global skills deduplicated across ~/.config/opencode/skills/ and ~/.claude/skills/
- sdd-*, _shared, and skill-registry excluded from registry as per scan rules
