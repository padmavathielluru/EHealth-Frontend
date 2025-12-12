import { MEMBERSHIPS_LIST } from "../utils/MembershipsTabConstants";
import { MembershipItem } from "../interfaces/membershipsTabInterface";

export const getMemberships = (): MembershipItem[] => {
    return MEMBERSHIPS_LIST;
};

export const deleteMembership = (id: string): MembershipItem[] => {
    return MEMBERSHIPS_LIST.filter((item) => item.id !== id);
};
