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
 * @returns objects with data
 */
export async function createAccount(username, password, account_type) {
	try {
		const res = await myAxios.post("account/register", { username, password, account_type });
		console.log("Account REs", res);
		return res;
	} catch (error) {
		console.log("error", error);
		throw error;
	}
}
