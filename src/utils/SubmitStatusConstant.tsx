export type AccountStatus = "PENDING" | "APPROVED" | "REJECTED";

export const ACCOUNT_STATUS_LABEL: Record<AccountStatus, string> = {
    PENDING: "Verification Pending",
    APPROVED: "Verified",
    REJECTED: "Rejected",
};

export const ACCOUNT_STATUS_STYLE: Record<AccountStatus, string> = {
    PENDING: "text-red-500",
    APPROVED: "text-green-600",
    REJECTED: "text-orange-400",
};