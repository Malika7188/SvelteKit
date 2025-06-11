// src/lib/data/projects.ts

export type Project = {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    description: 'Help build wells in rural Kenya.',
    goal: 100000,
    raised: 25000
  },
  {
    id: '2',
    title: 'School Fund Drive',
    description: 'Support children’s education in Kisumu.',
    goal: 200000,
    raised: 80000
  }
];

// Helper function to find a project
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
