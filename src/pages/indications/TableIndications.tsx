import { Card } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AppTable from "src/components/base/AppTable";
import { ITEM_PER_PAGE } from "src/constants/common";
import { UserService } from "src/services/UserService";
import {
  IIndicationItem,
  IParamsGetIndications,
  TYPE_INDICATION,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { getIndicationColumns } from "./helpers";

export interface TableIndicationsProps {
  type: TYPE_INDICATION;
}

export const TableIndications = ({ type }: TableIndicationsProps) => {
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IIndicationItem[]>([]);
  const [params, setParams] = useState<IParamsGetIndications>({
    limit: ITEM_PER_PAGE,
    page: 1,
    type,
  });
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetIndications) => {
      try {
        setLoading(true);
        const res = await UserService.getIndications(params);

        const newData = res.data.data;
        setHasMore(newData.length === params.limit);
        setData((prev) =>
          params.page === 1 ? newData : [...prev, ...newData]
        );
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    fetchData(params);
  }, [fetchData, params]);

  const columns = useMemo(() => getIndicationColumns(type), [type]);
  return (
    <Card>
      <AppTable
        columns={columns}
        data={data}
        sx={{
          minWidth: type === TYPE_INDICATION.OPEN ? 1140 : 720,
        }}
        loadMore={loadMore}
      />
    </Card>
  );
};
