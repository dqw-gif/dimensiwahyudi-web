import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { db } from '@/lib/firebase';
import { projects as baseProjects, type Project } from '@/data/projects';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

// GET: Retrieve all projects (base projects merged with Firestore overrides)
export async function GET(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);

    const overrides = new Map<string, Project>();
    snapshot.forEach((snap) => {
      const data = snap.data() as Project;
      if (data && data.id) {
        overrides.set(data.id, data);
      }
    });

    // Merge base projects with Firestore overrides
    const mergedList: Project[] = baseProjects.map((bp) => {
      if (overrides.has(bp.id)) {
        const custom = overrides.get(bp.id)!;
        overrides.delete(bp.id);
        return { ...bp, ...custom };
      }
      return bp;
    });

    // Add any completely new projects added via admin
    overrides.forEach((newProject) => {
      mergedList.unshift(newProject);
    });

    return NextResponse.json({ success: true, projects: mergedList });
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    // Fallback to base projects
    return NextResponse.json({ success: true, projects: baseProjects });
  }
}

// PUT: Update an existing project
export async function PUT(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<Project>;
    if (!body.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const projectRef = doc(db, 'projects', body.id);
    const updatedData: Project = {
      id: body.id,
      client: body.client || 'Klien Baru',
      industry: body.industry || 'Manufaktur Umum',
      image: body.image || '/projects/PT Mayora Indah.webp',
      logo: body.logo || '/logo.webp',
      size: body.size || 'standard',
      desc: body.desc || '',
      color: body.color || 'blue',
    };

    await setDoc(projectRef, updatedData, { merge: true });

    return NextResponse.json({ success: true, project: updatedData });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<Project>;
    if (!body.client) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
    }

    // Auto generate clean slug ID
    const rawId = body.id || body.client.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanId = rawId || `project-${Date.now()}`;

    const newProject: Project = {
      id: cleanId,
      client: body.client,
      industry: body.industry || 'Industrial Automation',
      image: body.image || '/projects/PT Mayora Indah.webp',
      logo: body.logo || '/logo.webp',
      size: body.size || 'standard',
      desc: body.desc || '',
      color: body.color || 'blue',
    };

    await setDoc(doc(db, 'projects', cleanId), newProject);

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// DELETE: Delete project
export async function DELETE(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await deleteDoc(doc(db, 'projects', id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
