// @ts-nocheck
import { db } from '$lib/db/db';
import { donations, projects } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = async () => {
  const allProjects = await db.select().from(projects);

  const projectsWithDonations = await Promise.all(
    allProjects.map(async (project) => {
      const allDonations = await db
        .select()
        .from(donations)
        .where(eq(donations.project_id, project.id));

      const totalDonated = allDonations.reduce(
        (sum, donation) => sum + (donation.amount ?? 0),
        0
      );

      return {
        ...project,
        totalDonated,
      };
    })
  );

  return {
    projects: projectsWithDonations,
  };
};
;null as any as PageServerLoad;