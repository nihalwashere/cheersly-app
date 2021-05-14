import { USER_ROLE } from "../../../enums/userRoles";

export const wrapAdminSettings = (list) =>
  list.map((item) => ({
    ...item,
    isAdmin: item.role === USER_ROLE.ADMIN ? true : false,
  }));
