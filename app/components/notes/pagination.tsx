import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

export default function NotesPagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const getLink = (page: number) => `?page=${page}`;

  return (
    <Pagination>
      <PaginationContent  className="flex flex-wrap justify-center gap-2" >
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getLink(currentPage - 1)} />
          </PaginationItem>
        )}

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === currentPage} href={getLink(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
