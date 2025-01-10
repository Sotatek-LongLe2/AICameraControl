import { Typography } from "@mui/joy";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormWrapper from "src/components/common/form/FormWrapper";
import { UserTypeEnum } from "src/constants/enumBE";
import { Message } from "src/constants/message";
import { Regex } from "src/constants/regex";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService";
import {
  IReqCreateOrUpdateUserCustomer,
  UserCustomerFormData,
} from "src/services/AdminUsersCustomersService.type";
import { useAppStore } from "src/store/appStore";
import UserForm from "../UserCustomerForm";

const CreateUserCustomers = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  const onCreateOrUpdateUserCustomer = async (
    params: IReqCreateOrUpdateUserCustomer
  ) => {
    try {
      setLoading(true);
      const res = await AdminUsersCustomersService.createUserCustomer(params);
      if (res.data.statusCode === 201) {
        toast.success("Account created");
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
      } else if (err.response.data.message[0] === "email must be an email") {
        setErrorEmail(Message.VALID_EMAIL);
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
    setErrorEmail(null);
    type ParamsCommon = {
      email: string;
      password: string;
      type: number;
    };

    const paramsCommon: ParamsCommon = {
      email: data.email,
      password: data.password,
      type: Number(data.type),
    };
    if (Number(data.type) === UserTypeEnum.INDIVIDUAL) {
      const params = {
        ...paramsCommon,
        individualInfo: {
          passport: data.passport.trim(),
          national: data.nationality.trim(),
          dateOfBirth: dayjs(data.dateOfBirth).format("DD/MM/YYYY"),
          placeOfBirth: data.placeOfBirth,
          residential: data.residential.trim(),
          countryOfResidence: data.countryOfResidence.trim(),
          taxResidence: data.taxResidence.trim(),
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          phoneNumber: data.phoneNumber,
        },
      };
      onCreateOrUpdateUserCustomer(params);
    } else if (Number(data.type) === UserTypeEnum.CORPORATE) {
      const params = {
        ...paramsCommon,
        corporateInfo: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          capacity: data.capacity.trim(),
          taxResidence: data.taxResidence.trim(),
          phoneNumber: data.phoneNumber,
          company: {
            name: data.companyName.trim(),
            country: data.companyCountry.trim(),
            registrationNumber: data.companyRegistrationNumber.trim(),
            registeredAddress: data.companyRegisteredAddress.trim(),
            businessAddress: data.companyBusinessAddress?.trim(),
            isSfcLicensed: Number(data.isSfcLicensed),
            isListedSub: Number(data.isListedSub),
          },
        },
      };
      onCreateOrUpdateUserCustomer(params);
    }
  };

  return (
    <>
      <Typography level="h4" sx={{ mb: 28 }}>
        Create User
      </Typography>
      <FormWrapper onSubmit={handleSubmit}>
        <UserForm
          isCreate={true}
          errorEmail={errorEmail}
          setErrorEmail={setErrorEmail}
        />
      </FormWrapper>
    </>
  );
};

export default CreateUserCustomers;
