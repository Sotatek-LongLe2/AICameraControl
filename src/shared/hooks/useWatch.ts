import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WatchlistService } from "src/services/WatchlistService";

type VoteProps = {
  id: number;
  defaultValue?: boolean;
  onChange?: (status: boolean, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSuccess?: () => void;
};

const useWatchlist = ({ id, defaultValue, onSuccess }: VoteProps) => {
  const [isWatching, setIsWatching] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsWatching(defaultValue);
  }, [defaultValue]);

  const callWatchlist = useCallback(
    async (isWatching: boolean) => {
      try {
        // Update UI
        setIsLoading(true);
        const res = await WatchlistService.postWatchlist(id, isWatching);
        if (res.data.statusCode === 201) {
          await onSuccess?.();
          toast.success(
            isWatching ? "Added to Watchlist" : "Removed from Watchlist"
          );
        }
      } catch (error) {
        // Rollback
        console.error("WatchlistService.postWatchlist: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, onSuccess]
  );

  const changeWatchlist = useCallback(
    async (isWatching: boolean) => {
      // Update UI
      setIsWatching(isWatching);

      await callWatchlist(isWatching);
    },
    [callWatchlist]
  );

  return {
    isWatching,
    isLoading,
    changeWatchlist,
  };
};

export default useWatchlist;
