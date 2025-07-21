import { db, notes, type Note, type NewNote } from "~/db/schema";
import { sql,eq, desc } from "drizzle-orm";

export async function createNote(data: NewNote): Promise<Note> {
  const [note] = await db.insert(notes).values(data).returning();
  return note;
}

export async function getNoteById(id: number,userId:number): Promise<Note | null> {
  const [note] = await db
    .select()
    .from(notes)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`);
  return note || null;
}


export async function getNotesByUserId(
  userId: number,
  page: number = 1,
  limit: number = 10
) {
  const offset = (page - 1) * limit;

  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(notes)
    .where(eq(notes.userId, userId));

  const notesList = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(
      desc(notes.isFavorite),    
      desc(notes.createdAt) 
    )
    .limit(limit)
    .offset(offset);

  return {
    notes: notesList,
    totalNotes: countResult.count,
    totalPages: Math.ceil(countResult.count / limit),
  };
}
export async function updateNote(
  id: number,
  userId: number,
  data: Partial<NewNote>
): Promise<Note | null> {
  const [note] = await db
    .update(notes)
    .set(data)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`)
    .returning();
  return note || null;
}

export async function deleteNote(id: number, userId: number): Promise<boolean> {
  const [note] = await db
    .delete(notes)
    .where(sql`${notes.id} = ${id} AND ${notes.userId} = ${userId}`)
    .returning();
  return !!note;
}

export async function toggleFavorite(noteId:number,userId:number):Promise<Note | null>{
  const [note] =await db
  .select()
  .from(notes)
  .where(sql`${notes.id} = ${noteId} AND ${notes.userId} = ${userId}`);

  if(!note) return null;

  const [updateNote] = await db
  .update(notes)
  .set({isFavorite:!note.isFavorite})
  .where(sql`${notes.id} = ${noteId} AND ${notes.userId} = ${userId}`)
  .returning();

  return updateNote || null;
}
