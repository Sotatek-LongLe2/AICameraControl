import { Card, CardContent, Typography } from "@mui/joy";
import FormWrapper from "src/components/common/form/FormWrapper";
import AnnouncementForm from "../AnnouncementForm";
import { useAppStore } from "src/store/appStore";
import { AnnouncementService } from "src/services/AnnouncementService";
import { AnnouncementType } from "src/constants/enumBE";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PAGES_ADMIN } from "src/constants/router";

interface AnnouncementFormData {
  type: string;
  companyId: number;
  title: string;
}

const AdminAnnouncementCreate = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (data: AnnouncementFormData) => {
    try {
      setLoading(true);
      const res = await AnnouncementService.createOrUpdate({
        type: Number(data.type) as AnnouncementType,
        title: data.title.trim(),
        companyId: data.companyId,
      });
      if (res.data.statusCode === 201) {
        toast.success("Announcement created");
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
          Create Announcement
        </Typography>
        <FormWrapper onSubmit={handleSubmit}>
          <AnnouncementForm />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};

export default AdminAnnouncementCreate;
