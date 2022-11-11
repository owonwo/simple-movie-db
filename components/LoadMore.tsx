import React from "react";
import { useInView } from "react-intersection-observer";

export const LoadMore: React.FC<{
  currentPage?: number;
  totalPages?: number;
  onLoadMore: () => void;
}> = ({ currentPage = 1, totalPages = 1, onLoadMore }) => {
  const { ref } = useInView({
    threshold: 0,
    initialInView: false,
    onChange: (inView) => {
      if (inView) loadMore();
    },
  });

  const willLoadMore = currentPage < totalPages;

  const loadMore = React.useCallback(() => {
    if (!(currentPage && totalPages)) return;
    if (willLoadMore) onLoadMore();
  }, [currentPage, totalPages]);

  return (
    <div
      ref={ref}
      style={{
        border: "solid 1px #999",
        padding: 8,
        display: "inline-block",
      }}
    >
      {willLoadMore ? (
        <>
          {currentPage || 0} / {totalPages || 0}
          <button onClick={loadMore}>Load more</button>
        </>
      ) : (
        <p>No more results</p>
      )}
    </div>
  );
};
