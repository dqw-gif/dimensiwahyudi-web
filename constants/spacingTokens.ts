export const spacingTokens = {
  page: {
    shell: 'relative z-10 pt-28 md:pt-32 pb-20 md:pb-24',
    stack: 'space-y-12 md:space-y-16',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerNarrow: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
    containerMedium: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
    containerCompact: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  },
  hero: {
    standard: 'pt-28 md:pt-32 pb-16 md:pb-20',
    tall: 'pt-32 md:pt-40 pb-20 md:pb-24',
  },
  section: {
    compact: 'py-12 md:py-16',
    standard: 'py-16 md:py-20',
    spacious: 'py-20 md:py-24',
  },
  card: {
    standard: 'p-6 md:p-8',
    feature: 'p-8 md:p-10',
    inset: 'p-7 md:p-10',
  },
} as const;
