import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { requireUserId } from "~/services/session.server";
import { toggleFavorite } from "~/services/notes.server";

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const noteId = Number(formData.get("noteId"));
    const userId = await requireUserId(request);

    console.log(userId,"jhhdvdujshmn");
    
    if(!noteId || isNaN(noteId)){
        throw new Response("Invalid note ID",{status:400});
    }

    await toggleFavorite(noteId,userId);

    return redirect(request.headers.get("Referer") || "/notes")
}