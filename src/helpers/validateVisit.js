import { validName, validText } from "./validator";

const validateVisit = (visitObj) => {
  let answer;
  const { patient_name, doctor_id, text, date } = visitObj;
  if (!patient_name || !doctor_id || !text || !date)
    answer = { isValid: false, err: "All visit info is required" };
  else {
    const err = [];
    if (!validName(patient_name)) err.push("Invalid name");
    if (typeof doctor_id !== "number") err.push("No doctor information");
    if (!validText(text)) err.push("Invalid complaints text");
    if (err.length) answer = { isValid: false, err };
    else answer = { isValid: true };
  }
  return answer;
};
export default validateVisit;
