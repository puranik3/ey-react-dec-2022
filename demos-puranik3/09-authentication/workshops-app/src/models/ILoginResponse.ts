export default interface ILoginResponse {
    email: string,
    authToken: string,
    role: "admin" | "general"
}