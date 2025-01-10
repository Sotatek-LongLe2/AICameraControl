import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Button,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFileUploadLine,
  RiUploadLine,
  RiExternalLinkLine,
  RiFileDownloadLine,
  RiUser2Line,
  RiHome5Line,
  RiBankCard2Line,
  RiCheckLine,
} from "@remixicon/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropBox } from "src/components/common/DragDropBox";
import FormWithStep from "src/components/common/FormWithStep";
import { MessageError } from "src/components/common/MessageError";
import TopDisplay from "src/components/layout/TopDisplay";
import { MAX_FILE_SIZE, MAX_IMAGE_SIZE } from "src/constants/common";
import { DOCUMENT_REQUIRE_LIST } from "src/constants/documents";
import { FileSource } from "src/constants/enumBE";
import { VITE_DOCUMENT_TEMPLATE } from "src/constants/env";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { useAppStore } from "src/store/appStore";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";

interface IDocument {
  id: number;
  createdAt: string;
  deletedAt: string;
  filePath: string;
  fullPath: string;
  source: FileSource;
  sourceId: number;
  updatedAt: string;
}

interface IDocumentCategory {
  photoId: IDocument[];
  addressProof: IDocument[];
  document: IDocument[];
}

const CheckmarkIcon = () => (
  <Box
    sx={{
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: colors["primary-main"],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <RiCheckLine size={14} color={colors["text-primary"]} />
  </Box>
);

const Step6 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const setLoading = useAppStore((state) => state.setLoading);
  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<IDocumentCategory>({
    photoId: [],
    addressProof: [],
    document: [],
  });
  const [deleteIdList, setDeleteIdList] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [photoId, setPhotoId] = useState<File | undefined>(undefined);
  const [addressProof, setAddressProof] = useState<File | undefined>(undefined);
  const [photoIdErrorMessage, setPhotoIdErrorMessage] = useState("");
  const [addressProofErrorMessage, setAddressProofErrorMessage] = useState("");

  // total files which is uploading and uploaded
  const totalFileUpload = useMemo(() => {
    return files.length + documents.document.length;
  }, [documents, files]);

  const handleFileUpload = (files: File[]) => {
    setErrorMessage("");
    const allowedTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (files.length + totalFileUpload > 15) {
      setErrorMessage("You may upload a maximum of 15 documents only");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const fileSizeInMB = files[i].size / (1024 * 1024);
      if (!allowedTypes.includes(files[i].type)) {
        setErrorMessage("The document type must be doc, docx, pdf, xlsx");
        continue;
      }
      if (fileSizeInMB > MAX_FILE_SIZE) {
        setErrorMessage(`The file size must be less than 5MB`);
        continue;
      }
      setFiles((prev) => [...prev, files[i]]);
    }
  };

  const handlePhotoUpload = (file: File[]) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    setPhotoIdErrorMessage("");
    const fileSizeInMB = file[0].size / (1024 * 1024);
    if (!allowedTypes.includes(file[0].type)) {
      setPhotoIdErrorMessage("The image type must be .png, .jpg or .jpeg");
      return;
    }
    if (fileSizeInMB > MAX_IMAGE_SIZE) {
      setPhotoIdErrorMessage(`The image size must be less than 5MB`);
      return;
    }
    setPhotoId(file[0]);
  };

  const handleAddressProofUpload = (file: File[]) => {
    const allowedTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    setAddressProofErrorMessage("");
    const fileSizeInMB = file[0].size / (1024 * 1024);
    if (!allowedTypes.includes(file[0].type)) {
      setAddressProofErrorMessage(
        "The document type must be doc, docx, pdf, xlsx"
      );
      return;
    }
    if (fileSizeInMB > MAX_FILE_SIZE) {
      setAddressProofErrorMessage(`The file size must be less than 5MB`);
      return;
    }
    setAddressProof(file[0]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((item) => item.name !== fileName));
  };

  const removeDocument = (
    documentId: number,
    docType: keyof IDocumentCategory
  ) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: prev[docType].filter((item) => item.id !== documentId),
    }));
    setDeleteIdList((prev) => [...prev, documentId]);
  };

  const removePhotoId = () => {
    setPhotoId(undefined);
  };

  const removeAddressProof = () => {
    setAddressProof(undefined);
  };

  const handleUploadDocuments = async () => {
    try {
      if (!progress) return;
      if (progress.step < 5) return;
      setLoading(true);
      const res = await UserInformationService.uploadDocument(
        files,
        deleteIdList,
        photoId,
        addressProof
      );
      if (res.status === 200) {
        updateProgress({
          step: 6,
        });
        navigate(PAGES.REGISTRATION.STEP_7);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const extractDocumentNameFromPath = (path: string) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  const handleOpenDocument = (
    docType: keyof IDocumentCategory,
    id?: number
  ) => {
    if (!id) return;
    const fullPath = documents[docType].find(
      (item) => item.id === id
    )?.fullPath;
    if (fullPath) {
      window.open(fullPath, "_blank", "rel=noopener noreferrer");
    }
  };

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(6);
        if (res.data.statusCode === 200) {
          const data = res.data.data as unknown as IDocument[];
          setDocuments({
            photoId: data.filter(
              (item) => item.source === FileSource.USER_STEP_6_ID
            ),
            addressProof: data.filter(
              (item) => item.source === FileSource.USER_STEP_6_PROOF
            ),
            document: data.filter(
              (item) => item.source === FileSource.USER_STEP_6
            ),
          });
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getStepDetail();
  }, [setLoading]);

  const Top = () => (
    <Box sx={{ mb: 24 }}>
      <Typography level="h4">Please upload the following documents</Typography>
    </Box>
  );

  const Footer = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        mt: 24,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(PAGES.REGISTRATION.STEP_5)}
        startDecorator={<RiArrowLeftLine />}
      >
        Go Back
      </Button>
      <Button
        onClick={handleUploadDocuments}
        disabled={
          !(photoId || documents.photoId.length >= 1) ||
          !(addressProof || documents.addressProof.length >= 1) ||
          files.length + documents.document.length <= 0
        }
        endDecorator={<RiArrowRightLine />}
      >
        Continue
      </Button>
    </Box>
  );

  const DocumentItem = ({
    id,
    name,
    onRemove,
    type,
  }: {
    id?: number;
    name: string;
    onRemove: () => void;
    type: keyof IDocumentCategory;
  }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Box
        sx={(theme) => ({
          color: theme.color["primary-main"],
          display: "flex",
          alignItems: "center",
          gap: 4,
        })}
      >
        <Typography
          level="h5"
          variant="text-ellipsis"
          sx={(theme) => ({
            color: theme.color["primary-main"],
            maxWidth: 400,
            direction: "rtl",
            [theme.breakpoints.down("laptop")]: {
              maxWidth: 120,
            },
          })}
        >
          {name}
        </Typography>
        <RiExternalLinkLine
          size={18}
          color={colors["primary-main"]}
          style={{ cursor: "pointer" }}
          onClick={() => handleOpenDocument(type, id)}
        />
      </Box>
      <Button
        variant="outlined"
        color="error-main"
        size="md"
        onClick={onRemove}
      >
        Remove
      </Button>
    </Box>
  );

  return (
    <FormWithStep currentStep={6}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <Top />
      <AccordionGroup variant="outlined" sx={{ borderRadius: 6, flexGrow: 0 }}>
        <Accordion>
          <AccordionSummary
            sx={(theme) => ({
              [".MuiAccordionSummary-button"]: {
                px: 20,
                py: 12,
              },
              [`.MuiAccordionSummary-indicator .MuiSvgIcon-root`]: {
                color: theme.color["text-primary"],
              },
            })}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RiUser2Line color={colors["text-primary"]} />
              <Typography
                level="body1-500"
                sx={(theme) => ({ color: theme.color["text-primary"] })}
              >
                ID Verification
              </Typography>
              {(photoId || documents.photoId.length === 1) && <CheckmarkIcon />}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              [".MuiAccordionDetails-content"]: {
                px: 20,
              },
            }}
          >
            <Typography
              level="body1"
              sx={(theme) => ({ color: theme.color["text-secondary"], mb: 20 })}
            >
              Please upload your passport. For Hong Kong residents, HKID is
              acceptable.
            </Typography>
            <DragDropBox
              onFileUpload={handlePhotoUpload}
              accept={[".png", ".jpg", ".jpeg"]}
              disabled={documents.photoId.length >= 1}
              inputProps={{ multiple: false }}
            >
              <RiFileUploadLine size={42} />
              <Typography level="h5">Drag and Drop Documents Here</Typography>
              <Button
                variant="outlined"
                disabled={documents.photoId.length >= 1}
                endDecorator={<RiUploadLine size={16} />}
                sx={{ mt: 24, fontSize: 15, lineHeight: "22px" }}
              >
                Upload Documents
              </Button>
            </DragDropBox>
            {photoIdErrorMessage && (
              <MessageError>{photoIdErrorMessage}</MessageError>
            )}
            <Box
              sx={{
                mt: photoId || documents.photoId.length >= 1 ? 24 : 0,
                mb: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {documents.photoId.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  name={extractDocumentNameFromPath(doc.filePath)}
                  id={doc.id}
                  onRemove={() => removeDocument(doc.id, "photoId")}
                  type="photoId"
                />
              ))}
              {photoId && (
                <DocumentItem
                  name={photoId.name}
                  onRemove={removePhotoId}
                  type="photoId"
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={(theme) => ({
              [".MuiAccordionSummary-button"]: {
                px: 20,
                py: 12,
              },
              [`.MuiAccordionSummary-indicator .MuiSvgIcon-root`]: {
                color: theme.color["text-primary"],
              },
            })}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RiHome5Line color={colors["text-primary"]} />
              <Typography
                level="body1-500"
                sx={(theme) => ({ color: theme.color["text-primary"] })}
              >
                Residential Address Proof
              </Typography>
              {(addressProof || documents.addressProof.length === 1) && (
                <CheckmarkIcon />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              [".MuiAccordionDetails-content"]: {
                px: 20,
              },
            }}
          >
            <Typography
              level="body1"
              sx={(theme) => ({ color: theme.color["text-secondary"] })}
            >
              Please upload one of the following documents as proof of
              residence:
            </Typography>
            <List marker="disc" sx={{ gap: 24, my: 24, pl: 36 }}>
              <ListItem>
                <Typography
                  level="body1"
                  sx={(theme) => ({
                    color: theme.color["text-secondary"],
                  })}
                >
                  <Typography
                    level="body1"
                    fontWeight={500}
                    sx={(theme) => ({ color: theme.color["text-primary"] })}
                  >
                    Utility Bills:
                  </Typography>{" "}
                  Recent bills for services like electricity, water, gas, or
                  landline telephone, issued within the last three months.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  level="body1"
                  sx={(theme) => ({
                    color: theme.color["text-secondary"],
                  })}
                >
                  <Typography
                    level="body1"
                    fontWeight={500}
                    sx={(theme) => ({ color: theme.color["text-primary"] })}
                  >
                    Bank Statements:
                  </Typography>{" "}
                  Statements from recognized financial institutions, showing
                  your name and current address, dated within the last three
                  months.
                </Typography>
              </ListItem>
            </List>
            <DragDropBox
              onFileUpload={handleAddressProofUpload}
              accept={[".doc", ".docx", ".pdf", ".xlsx"]}
              disabled={documents.addressProof.length >= 1}
              inputProps={{ multiple: false }}
            >
              <RiFileUploadLine size={42} />
              <Typography level="h5">Drag and Drop Documents Here</Typography>
              <Button
                variant="outlined"
                disabled={documents.addressProof.length >= 1}
                endDecorator={<RiUploadLine size={16} />}
                sx={{ mt: 24, fontSize: 15, lineHeight: "22px" }}
              >
                Upload Documents
              </Button>
            </DragDropBox>
            {addressProofErrorMessage && (
              <MessageError>{addressProofErrorMessage}</MessageError>
            )}
            <Box
              sx={{
                mt: addressProof || documents.addressProof.length >= 1 ? 24 : 0,
                mb: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {documents.addressProof.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  name={extractDocumentNameFromPath(doc.filePath)}
                  id={doc.id}
                  onRemove={() => removeDocument(doc.id, "addressProof")}
                  type="addressProof"
                />
              ))}
              {addressProof && (
                <DocumentItem
                  name={addressProof.name}
                  onRemove={removeAddressProof}
                  type="addressProof"
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={(theme) => ({
              [".MuiAccordionSummary-button"]: {
                px: 20,
                py: 12,
              },
              [`.MuiAccordionSummary-indicator .MuiSvgIcon-root`]: {
                color: theme.color["text-primary"],
              },
            })}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RiBankCard2Line color={colors["text-primary"]} />
              <Typography
                level="body1-500"
                sx={(theme) => ({ color: theme.color["text-primary"] })}
              >
                Financial Proof
              </Typography>
              {documents.document.length + files.length >= 1 && (
                <CheckmarkIcon />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              [".MuiAccordionDetails-content"]: {
                px: 20,
              },
            }}
          >
            <Typography
              level="body1"
              sx={(theme) => ({ color: theme.color["text-primary"] })}
            >
              To satisfy the requirements under Cap 571D of the Securities and
              Futures Ordinance (SFO) in Hong Kong, particularly to demonstrate
              that your holdings meet or exceed the prescribed financial
              thresholds for being classified as a "Professional Investor,"
              please upload any of the following:
            </Typography>
            <List marker="decimal" sx={{ gap: 24, my: 24, pl: 36 }}>
              {DOCUMENT_REQUIRE_LIST.map((item, index) => (
                <ListItem
                  key={index}
                  sx={(theme) => ({ color: theme.color["text-primary"] })}
                >
                  <Typography
                    level="body1"
                    sx={(theme) => ({
                      color: theme.colorSchemes.dark.palette.text.primary,
                    })}
                  >
                    <Typography level="body1" fontWeight={500}>
                      {item.name}:
                    </Typography>{" "}
                    {item.description}
                  </Typography>
                  {/* Download template */}
                  {index === 0 && (
                    <Link
                      href={VITE_DOCUMENT_TEMPLATE}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        fontSize={17}
                        fontWeight={500}
                        sx={(theme) => ({
                          color: theme.color["primary-main"],
                          mt: 12,
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: 8,
                          fontFamily: "Jost",
                        })}
                      >
                        Download A Template Here
                        <RiFileDownloadLine />
                      </Typography>
                    </Link>
                  )}
                </ListItem>
              ))}
            </List>
            <Typography
              level="body1"
              sx={(theme) => ({ color: theme.color["text-primary"], my: 24 })}
            >
              These documents should be up-to-date, accurately reflect your
              financial status, and be authenticated by relevant professionals
              if necessary. Always consult with a legal advisor to ensure that
              your documentation complies with the specific requirements of the
              SFO and the Securities and Futures Commission (SFC) in Hong Kong.
            </Typography>
            <DragDropBox
              disabled={totalFileUpload >= 15}
              onFileUpload={handleFileUpload}
              accept={[".doc", ".docx", ".pdf", ".xlsx"]}
            >
              <RiFileUploadLine size={42} />
              <Typography level="h5">Drag and Drop Documents Here</Typography>
              <Button
                variant="outlined"
                disabled={totalFileUpload >= 15}
                endDecorator={<RiUploadLine size={16} />}
                sx={{ mt: 24, fontSize: 15, lineHeight: "22px" }}
              >
                Upload Documents
              </Button>
            </DragDropBox>
            {errorMessage && <MessageError>{errorMessage}</MessageError>}
            <Box
              sx={{
                mt: documents.document.length + files.length > 0 ? 24 : 0,
                mb: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {documents.document.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  name={extractDocumentNameFromPath(doc.filePath)}
                  id={doc.id}
                  onRemove={() => removeDocument(doc.id, "document")}
                  type="document"
                />
              ))}
              {files.map(({ name }) => (
                <DocumentItem
                  key={name}
                  name={name}
                  onRemove={() => removeFile(name)}
                  type="document"
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      <Footer />
    </FormWithStep>
  );
};

export default Step6;
