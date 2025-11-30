import axios from "axios";

export async function checkField(
  field: "username" | "email" | "phone",
  value: string
) {
  if (!value) return null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/check/${field}/${value}`
    );

    return res.data.isTaken;
  } catch {
    return null;
  }
}
