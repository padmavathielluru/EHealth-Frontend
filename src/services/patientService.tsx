import { patientInterface } from "../interfaces/patientInterface";

export const getPatientsByType = (
type: "all" | "active" | "inactive" | "new",
list: patientInterface[]
): patientInterface[] => {

    if (type === "all") return list;

    return list.filter((p) => {
        if (type === "active") return p.status === "ACTIVE";
        if (type === "inactive") return p.status === "INACTIVE";
        if (type === "new") return p.status === "NEW";
        return false;
    });
};