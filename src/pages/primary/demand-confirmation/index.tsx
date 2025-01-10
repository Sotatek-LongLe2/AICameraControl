import { Card, CardContent, Link, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PAGES from "src/constants/router";
import { UserPrimaryService } from "src/services/UserPrimaryService";
import { IPrimaryItem } from "src/services/UserPrimaryService.types";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { usePrimaryStore } from "src/store/primaryStore";

const DemandConfirmation = () => {
  const { companyID } = useParams();
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const setLoading = useAppStore((state) => state.setLoading);
  const { order, setOrder } = usePrimaryStore();
  const [primaryDetail, setPrimaryDetail] = useState<IPrimaryItem>();

  useEffect(() => {
    const fetchPrimaryDetail = async () => {
      try {
        if (!companyID) return;
        setLoading(true);
        const res = await UserPrimaryService.getOrderDetail(Number(companyID));
        if (res.data.statusCode === 200) {
          setPrimaryDetail(res.data.data);
        }
        const orderRes = await UserPrimaryService.getOrderByPrimaryId(
          Number(companyID)
        );
        if (orderRes.data.data.order?.id) {
          setOrder(orderRes.data.data.order);
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPrimaryDetail();
  }, [companyID, setLoading, setOrder]);

  const CompletedConfirmation = () => (
    <CardContent sx={{ p: 20 }}>
      <Typography level="h4" sx={{ mb: 20 }}>
        Your Demand was placed
      </Typography>
      <Typography level="body1" sx={{ mb: 24 }}>
        Congratulations on placing a demand on {primaryDetail?.name}. Astra
        staff will be in touch with you.
      </Typography>
      <Typography level="body1">
        You can access all your demands, IOIs, bids and offers from{" "}
        {/* Add link to history page */}
        <Link href={PAGES.YOUR_DEMANDS.INDEX}>your history page</Link>.
      </Typography>
    </CardContent>
  );

  if (typeAccess !== "full" || !order?.id) return <></>;

  return (
    <Card sx={{ width: "100%", maxWidth: 772, m: "auto" }}>
      <CompletedConfirmation />
    </Card>
  );
};

export default DemandConfirmation;
