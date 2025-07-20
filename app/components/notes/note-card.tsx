import { Link} from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Note } from "~/db/schema";
import { formatRelativeTime } from "~/utils/date";
import { Star, StarOff } from "lucide-react";
import { useFetcher } from "@remix-run/react";

type SerializedNote = Omit<Note, "createdAt"> & { createdAt: string };

interface NoteCardProps {
  note: SerializedNote;
}

export function NoteCard({ note }: NoteCardProps) {
    const fetcher = useFetcher();

  return (
    <Card className="relative flex h-full flex-col">
      
      <CardHeader className="flex-none">
        <CardTitle className="line-clamp-2">
          <Link to={`/notes/${note.id}`} className="hover:underline">
            {note.title}
          </Link>
        </CardTitle>
          <fetcher.Form method="post" action={`/notes/${note.id}/toggle-favorite`}>
          <input type="hidden" name="noteId" value={note.id} />
          <button
            type="submit"
            className="absolute right-4 top-4 p-1 rounded-md hover:bg-muted"
            title={note.isFavorite ? "Unfavorite" : "Favorite"}
          >
            {note.isFavorite ? (
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </fetcher.Form>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {note.description || ""}
        </p>
      </CardContent>
      <CardFooter className="flex-none border-t pt-4">
        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(note.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
