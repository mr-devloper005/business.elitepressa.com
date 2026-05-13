export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Updates',
    route: '/press',
    description: 'Recent posts and newsroom updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/press',
} as const
