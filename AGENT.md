# AGENT.md

This file helps AI agents understand the project structure, commands, and conventions.

## Project Context

This is a modern resume builder built with Next.js. Refer to these files for comprehensive project knowledge:

- **[Product Vision](.agents/product.md)** - Product goals, features, target users, and success metrics
- **[Project Structure](.agents/structure.md)** - Directory layout, component architecture, and data flow
- **[Technical Stack](.agents/tech.md)** - Technologies, development workflow, and best practices

## Common Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Technology Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript 5.0+
- **UI**: React 18+ with Tailwind CSS
- **Components**: Shadcn/ui (Radix UI)
- **Package Manager**: pnpm

## Code Conventions

- Use TypeScript for all code
- Follow Atomic Design principles for components
- Server Components by default, Client Components for interactivity
- Co-locate tests with components
- Group files by feature/resume section

## Architecture Notes

- Real-time preview updates as users input data
- Local state management with React hooks
- URL query params for sharing/resume loading
- Export functionality for PDF generation
