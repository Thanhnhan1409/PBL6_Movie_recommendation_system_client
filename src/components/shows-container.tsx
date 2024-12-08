"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { useModalStore } from "@/stores/modal";
import { useSearchStore } from "@/stores/search";
import type { CategorizedShows, MovieItem } from "@/types";

import { cn } from "@/lib/utils";
import ShowModal from "@/components/show-modal";
import ShowsCarousel from "@/components/shows-carousel";
import ShowsGrid from "@/components/shows-grid";
import ShowsSkeleton from "@/components/shows-skeleton";
import { LoadingOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import { getMoviesSearchApi } from "@/lib/api/movies";

interface ShowsContainerProps {
  shows: CategorizedShows[];
}

const ShowsContainer = ({ shows }: ShowsContainerProps) => {
  const path = usePathname();
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const modalStore = useModalStore();
  const searchStore = useSearchStore();
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (currentPage: number) => {
      if (isLoading) return;
  
      setIsLoading(true);
      try {
        const response = await getMoviesSearchApi(currentPage, searchStore.query);
        const data: MovieItem[] = response.data?.data;
        searchStore.setShows([...searchStore.shows, ...data]);
      } catch (error) {
        console.error("Failed to search shows:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, searchStore]
  );
  
  useEffect(() => {
    if (inView && searchStore.query.length > 0 && !isLoading) {
      fetchData(page);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, page, fetchData, searchStore.query, isLoading]);

  if (!mounted) return <ShowsSkeleton />;

  if (searchStore.query.length > 0) {
    return (
      <>
        <ShowsGrid shows={searchStore.shows} />
        <div ref={ref} style={{ textAlign: "center", margin: "1rem 0" }}>
          <LoadingOutlined />
        </div>
      </>
    );
  }

  return (
    <section
      className={cn("w-full space-y-5 sm:space-y-10", path === "/" && "pt-24")}
    >
      {modalStore.open && (
        <ShowModal open={modalStore.open} setOpen={modalStore.setOpen} />
      )}
      {shows?.map((item) => (
        <ShowsCarousel
          key={item.title}
          title={item.title}
          shows={item.shows ?? []}
        />
      ))}
    </section>
  );
};

export default ShowsContainer;