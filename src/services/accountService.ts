import axiosIstance from "@src/services/axiosIstance";

import { AxiosError } from "axios";
import routes from "@src/services/routes";
import {
  ChangePasswordFields,
  PersonalInfoFields,
  ResetPasswordFields,
  ResetPasswordTokenFields,
  SigninFields,
  VerifyAccountFields,
} from "@src/types";

const accountService = {
  login: async (email: string, password: string) => {
    try {
      var response = await axiosIstance.post(routes.account.postLogin, {
        email: email,
        password: password,
      });

      var { user } = response.data;

      if (user.verified) {
        return {
          status: "Ok",
          user: user,
        };
      } else {
        return {
          status: "NotVerified",
        };
      }
    } catch (error) {
      return {
        status: "LoginFailed",
      };
    }
  },
  logout: () => {
    return axiosIstance.get(routes.account.getLogout);
  },
  signin: async (data: SigninFields) => {
    try {
      await axiosIstance.post(routes.account.postCreateAccount, data);

      return true;
    } catch (error) {
      return false;
    }
  },
  resendActivationEmail: async (data: VerifyAccountFields) => {
    await axiosIstance.post(
      routes.account.postResendActivationEmail,
      data,
    );
  },
  activateAccountByToken: async (token: string, email: string | null) => {
    try {
      await axiosIstance.post(
        routes.account.postActivateAccountByToken,
        {
          token: token,
          email: email,
        },
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  loadAccountState: async () => {
    try {
      var response = await axiosIstance.get(routes.account.getAccountStatus);

      return response.data;
    } catch (error: any) {
      return {
        user: null,
        isLogged: false,
      };
    }
  },
  updatePersonalInfo: async (data: PersonalInfoFields) => {
    try {
      await axiosIstance.post(
        routes.account.postUpdatePersonalInfo,
        data,
      );

      return true;
    } catch (error: any) {
      return false;
    }
  },
  updatePassword: async (data: ChangePasswordFields) => {
    try {
      await axiosIstance.post(routes.account.postUpdatePassword, data);

      return {
        status: "Success",
      };
    } catch (error: any) {
      var axiosError = error as AxiosError;
      if (axiosError.response!.status === 403) {
        return {
          status: "BadCurrentPassword",
        };
      } else {
        return {
          status: "Error",
        };
      }
    }
  },
  resetPassword: async (data: ResetPasswordFields) => {
    return new Promise(async (res, rej) => {
      try {
        await axiosIstance.post(routes.account.postAccountResetPassword, data);
        res(true);
      } catch (error) {
        rej();
      }
    });
  },
  resetPasswordByToken: async (data: ResetPasswordTokenFields) => {
    return new Promise(async (res, rej) => {
      try {
        await axiosIstance.post(routes.account.postChangePasswordByToken, data);
        res(true);
      } catch (error) {
        rej();
      }
    });
  },
  verifyEmailIsBusy: (email: string) => {
    return axiosIstance.get(routes.account.getEmailIsBusy, {
      params: {
        email: email,
      },
    });
  },
};

export default accountService;
