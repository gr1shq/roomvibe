// components/LoadMoreButton.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface LoadMoreButtonProps {
  totalPosts: number;
  postsPerPage: number;
}

const LoadMoreButton = ({ totalPosts, postsPerPage }: LoadMoreButtonProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const displayedPosts = page * postsPerPage;
  const hasMore = displayedPosts < totalPosts;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleLoadMore = () => {
    const nextPage = page + 1;
    router.push(`/vibefeed?${createQueryString("page", nextPage.toString())}`, {
      scroll: false,
    });
  };

  return hasMore ? (
    <div className="mt-12 text-center">
      <p className="text-sm text-gray-600 mb-4">
        Showing {Math.min(displayedPosts, totalPosts)} of {totalPosts} posts
      </p>
      <button
        onClick={handleLoadMore}
        className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300"
      >
        Load More Posts
      </button>
    </div>
  ) : null;
};

export default LoadMoreButton;