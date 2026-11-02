import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

export type LeadItem = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  lead_type: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed';
  notes?: string;
  createdAt: string;
};

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

// GET: Retrieve recent leads
export async function GET(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const leadsCol = collection(db, 'leads');
    const q = query(leadsCol, orderBy('createdAt', 'desc'), limit(100));
    const snapshot = await getDocs(q);

    const leads: LeadItem[] = [];
    snapshot.forEach((snap) => {
      const data = snap.data();
      leads.push({
        id: snap.id,
        name: data.name || '-',
        company: data.company || '-',
        email: data.email || '-',
        phone: data.phone || '',
        lead_type: data.lead_type || 'Contact Form',
        message: data.message || '-',
        status: data.status || 'new',
        notes: data.notes || '',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads from Firestore:', error);
    return NextResponse.json({ success: false, leads: [], error: 'Failed to load leads' }, { status: 500 });
  }
}

// PATCH: Update lead status or notes
export async function PATCH(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const leadRef = doc(db, 'leads', id);
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (typeof notes === 'string') updateData.notes = notes;
    updateData.updatedAt = new Date().toISOString();

    await updateDoc(leadRef, updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// DELETE: Remove lead
export async function DELETE(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    await deleteDoc(doc(db, 'leads', id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
