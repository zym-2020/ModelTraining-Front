export function getToken(): string | null {
    return localStorage.getItem("model-token")
}

export function setToken(token: string): void {
    localStorage.setItem("model-token", token)
}