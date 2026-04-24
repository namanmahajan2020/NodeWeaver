export function createIdentity() {
  const fullName = (process.env.FULL_NAME ?? "yourname")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  const dob = (process.env.DOB_DDMMYYYY ?? "17091999").replace(/\D/g, "");

  return {
    user_id: `${fullName}_${dob}`,
    email_id: process.env.EMAIL_ID ?? "your_email",
    college_roll_number: process.env.COLLEGE_ROLL_NUMBER ?? "your_roll"
  };
}

