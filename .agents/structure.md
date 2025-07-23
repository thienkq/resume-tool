# Project Structure

## Directory Layout
```
/
├── .agents/               # Agent steering documents
├── app/                   # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main resume builder page
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/ui components
│   └── theme-provider.tsx # Theme management
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Component Architecture

### Core Components
1. **ResumeBuilder**
   - Main container component
   - Manages resume state
   - Coordinates between form and preview

2. **ResumeForm**
   - Handles user input
   - Form validation
   - Section management

3. **ResumePreview**
   - Real-time resume rendering
   - Template selection
   - Responsive display

4. **ExportControls**
   - PDF generation
   - File export options
   - Sharing functionality

## State Management
- Local component state for form inputs
- Context API for global state (if needed)
- URL query params for sharing/resume loading

## Data Flow
1. User inputs data in form components
2. State updates trigger re-renders
3. Preview updates in real-time
4. Export functions transform data to desired format

## File Organization
- Group by feature/resume section
- Co-locate tests with components
- Separate business logic from presentation
