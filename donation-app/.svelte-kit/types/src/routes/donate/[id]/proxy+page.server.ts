// @ts-nocheck
import { db } from '$lib/db/db';
import { donations, projects } from '$lib/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const projectId = Number(params.id);

  console.log('Fetching project by ID:', projectId);

  // Use select().from() instead of findFirst()
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  console.log('Project fetched:', project);

  if (!project) throw error(404, 'Project not found');

  return { project };
};

export const actions = {
  donate: async ({ request, params }: import('./$types').RequestEvent) => {
    const data = await request.formData();
    const amount = parseInt(data.get('amount') as string);

    const allProjects = await db.select().from(projects);
    console.log('All projects in DB:', allProjects);

    if (!amount || amount < 1) {
      return fail(400, { error: 'Invalid donation amount' });
    }

    await db.insert(donations).values({
      project_id: Number(params.id),
      amount,
      created_at: new Date().toISOString(), // or donated_at if that's your field
      mpesa_code: 'MOCK123ABC' // change or remove based on your schema
    });

    throw redirect(303, `/donate/${params.id}?thankyou=1`);
  }
  
};
;null as any as Actions;