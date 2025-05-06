// src/app/template.tsx
'use client'; // Template must be a Client Component if it uses hooks or event handlers

import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  // This div will re-mount on navigation, triggering the animation
  return <div className="page-fade-in">{children}</div>;
}
