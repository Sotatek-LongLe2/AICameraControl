import { useCallback, useEffect, useState } from "react";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import {
  IAdminCompanyItem,
  IAdminUserItem,
} from "src/services/AdminSecondaryService.types";
import { useAppStore } from "src/store/appStore";

export function useSharedLists() {
  const [listUser, setListUser] = useState<IAdminUserItem[]>([]);
  const [listCompany, setListCompany] = useState<IAdminCompanyItem[]>([]);
  const [listAdminCompany, setListAdminCompany] = useState<IAdminCompanyItem[]>(
    []
  );
  const setLoading = useAppStore((state) => state.setLoading);
  const [error, setError] = useState<string | null>(null);

  const loadListUser = useCallback(async () => {
    try {
      const { data } = await AdminSecondaryService.getListUser({
        limit: 1000,
        page: 1,
      });
      setListUser(data.data);
    } catch {
      throw new Error("Failed to fetch users");
    }
  }, []);

  const loadListCompany = useCallback(async () => {
    try {
      const { data } = await AdminSecondaryService.getListCompany({
        limit: 1000,
        page: 1,
      });
      setListCompany(data.data);
    } catch {
      throw new Error("Failed to fetch companies");
    }
  }, []);

  const loadListAdminCompany = useCallback(async () => {
    try {
      const { data } = await AdminSecondaryService.getListAdminCompany({
        limit: 1000,
        page: 1,
      });
      setListAdminCompany(data.data);
    } catch {
      throw new Error("Failed to fetch companies");
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadListUser(),
        loadListCompany(),
        loadListAdminCompany(),
      ]);
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [setLoading, loadListUser, loadListCompany, loadListAdminCompany]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { listUser, listCompany, listAdminCompany, error, refetch: fetchData };
}
