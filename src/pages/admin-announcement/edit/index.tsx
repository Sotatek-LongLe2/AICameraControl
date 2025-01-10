import { Card, CardContent, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormWrapper from "src/components/common/form/FormWrapper";
import { AnnouncementType } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { AnnouncementService } from "src/services/AnnouncementService";
import { useAppStore } from "src/store/appStore";
import AnnouncementForm from "../AnnouncementForm";

interface AnnouncementFormData {
  type: string;
  companyId: number;
  title: string;
}

const AdminAnnouncementEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (data: AnnouncementFormData) => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await AnnouncementService.createOrUpdate({
        announcementId: Number(id),
        type: Number(data.type) as AnnouncementType,
        title: data.title.trim(),
        companyId: data.companyId,
      });
      if (res.data.statusCode === 201) {
        toast.success("Announcement edited");
        navigate(PAGES_ADMIN.ANNOUNCEMENTS.INDEX);
      } else throw res;
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography level="h4" sx={{ mb: 28 }}>
          Edit Announcement
        </Typography>
        <FormWrapper onSubmit={handleSubmit}>
          <AnnouncementForm />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};

export default AdminAnnouncementEdit;
