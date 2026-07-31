import api from "./axiosClient";
import type { ApiSuccessResponse } from "@/types/api";
import type { Organization } from "@/types/organization";

export const organizationService = {
  async getAllOrganizations() {
    const response =
      await api.get<ApiSuccessResponse<Organization[]>>("/organizations/");
    return response.data.data;
  },

  async getOrganizationById(id: string) {
    const response = await api.get<ApiSuccessResponse<Organization>>(
      `/organizations/${id}/`,
    );
    return response.data.data;
  },
};
