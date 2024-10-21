import { useTokenStore } from "../tokenStore";
import { myAxios } from "./axios";

/**
 *
 * @param {*} username
 * @param {*} password
 * @returns objects with data
 */
export async function Login(username, password) {
  console.log(username, password);
  try {
    const res = await myAxios.post("account/login", { username, password });
    console.log("Account REs", res);
    return res;
  } catch (error) {
    console.log("33", error);
    throw error;
  }
}

/**
 *
 * @param {*} username
 * @param {*} password
 * @param {*} account
 * @returns objects with data
 */
export async function createAccount({ username, password, account_type }) {
  try {
    const res = await myAxios.post("account/register", {
      username,
      password,
      account_type,
    });
    console.log("Account REs", res);
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
/**
 *
 * @returns list des comptes exception superAdmin
 */
export async function listAccount() {
  const { access } = useTokenStore.getState();
  try {
    const res = await myAxios.get("account/register", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    console.log("Account REs", res);
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
