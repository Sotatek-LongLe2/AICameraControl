import { Typography } from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormWrapper from "src/components/common/form/FormWrapper";
import { UserTypeEnum } from "src/constants/enumBE";
import { Message } from "src/constants/message";
import { Regex } from "src/constants/regex";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService";
import {
  DefaultValuesEditFrom,
  IReqCreateOrUpdateUserCustomer,
  UserCustomerFormData,
} from "src/services/AdminUsersCustomersService.type";
import { useAppStore } from "src/store/appStore";
import UserForm from "../UserCustomerForm";

const EditUserCustomers = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [defaultValues, setDefaultValues] = useState<DefaultValuesEditFrom>();
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);
  const passwordAssume = "***123***";

  const onUpdateUserCustomer = async (
    params: IReqCreateOrUpdateUserCustomer
  ) => {
    try {
      setLoading(true);
      const res = await AdminUsersCustomersService.updateUserCustomer(params);
      if (res.status === 200) {
        toast.success("Account edited");
        navigate(-1);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      if (err.response.data.code === "USER_00002") {
        setErrorEmail("This email address has been registered");
      } else if (err.response.data.code === "USER_00005") {
        setErrorEmail(
          "This account has been deleted by Admin. You can check the Removed customer list and restore the account"
        );
      } else {
        toast.error(
          `${
            typeof err?.response?.data?.message === "string"
              ? err?.response?.data?.message
              : err?.response?.data?.message[0]
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: UserCustomerFormData) => {
    const { email } = data;
    if (!Regex.EMAIL.test(email)) {
      setErrorEmail(Message.VALID_EMAIL);
      return;
    }

    type ParamsCommon = {
      id: number;
      email: string;
      type: number;
      password?: string; // `password` là tùy chọn
    };

    // Tạo paramsCommon với logic thêm password
    const paramsCommon: ParamsCommon = {
      id: id,
      email: data.email,
      type: Number(data.type),
    };

    if (data.password !== passwordAssume) {
      paramsCommon.password = data.password;
    }

    if (Number(data.type) === UserTypeEnum.INDIVIDUAL) {
      const params = {
        ...paramsCommon,
        individualInfo: {
          passport: data.passport,
          national: data.nationality,
          dateOfBirth: dayjs(data.dateOfBirth).format("DD/MM/YYYY"),
          placeOfBirth: data.placeOfBirth,
          residential: data.residential,
          countryOfResidence: data.countryOfResidence,
          taxResidence: data.taxResidence,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          phoneCode: null,
        },
      };
      onUpdateUserCustomer(params);
    } else if (Number(data.type) === UserTypeEnum.CORPORATE) {
      const params = {
        ...paramsCommon,
        corporateInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          capacity: data.capacity,
          taxResidence: data.taxResidence,
          phoneNumber: data.phoneNumber,
          phoneCode: null,
          company: {
            name: data.companyName,
            country: data.companyCountry,
            registrationNumber: data.companyRegistrationNumber,
            registeredAddress: data.companyRegisteredAddress,
            businessAddress: data.companyBusinessAddress,
            isSfcLicensed: Number(data.isSfcLicensed),
            isListedSub: Number(data.isListedSub),
          },
        },
      };
      onUpdateUserCustomer(params);
    }
  };

  const fetchAdminUserDetail = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await AdminUsersCustomersService.getAdminUserDetail({
        userId: Number(id),
      });

      const newValues = {
        password: passwordAssume,
        type: data.data.type.toString(),
        email: data.data.email,
        firstName: data.data.firstName.trim(),
        lastName: data.data.lastName.trim(),

        capacity: data.data.userInfo?.capacity?.trim(),
        taxResidence: data.data.userInfo?.taxResidence?.trim(),
        phoneNumber:
          (data.data.userInfo?.phoneCode?.trim() ?? "") +
          (data.data.userInfo?.phone?.trim() ?? ""),
        passport: data.data.userInfo?.passport?.trim(),
        nationality: data.data.userInfo?.national?.trim(),
        dateOfBirth: data.data.userInfo?.dateOfBirth
          ? dayjs(data.data.userInfo?.dateOfBirth, "DD/MM/YYYY").toDate()
          : null,
        placeOfBirth: data.data.userInfo?.placeOfBirth?.trim(),
        residential: data.data.userInfo?.residential?.trim(),
        countryOfResidence: data.data.userInfo?.countryOfResidence?.trim(),

        companyName: data.data.userCompany?.name?.trim(),
        companyCountry: data.data.userCompany?.country?.trim(),
        companyRegistrationNumber:
          data.data.userCompany?.registrationNumber?.trim(),
        companyRegisteredAddress:
          data.data.userCompany?.registeredAddress?.trim(),
        companyBusinessAddress: data.data.userCompany?.businessAddress?.trim(),
        isSfcLicensed: data.data.userCompany?.isSfcLicensed.toString(),
        isListedSub: data.data.userCompany?.isListedSub.toString(),
      };

      setDefaultValues(newValues);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    fetchAdminUserDetail();
  }, [fetchAdminUserDetail, id]);

  return (
    <>
      <Typography level="h4" sx={{ mb: 28 }}>
        Edit User
      </Typography>
      <FormWrapper onSubmit={handleSubmit}>
        <UserForm
          defaultValues={defaultValues}
          errorEmail={errorEmail}
          setErrorEmail={setErrorEmail}
        />
      </FormWrapper>
    </>
  );
};

export default EditUserCustomers;
