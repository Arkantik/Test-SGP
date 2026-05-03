import type { ApiResponse, LoginFormValues, LoginSuccessData } from "../types";

export const MOCK_ERROR_EMAIL = "error@test.fr";

export async function loginUser(
    values: LoginFormValues
): Promise<ApiResponse<LoginSuccessData>> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (values.email === MOCK_ERROR_EMAIL) {
        return {
            ok: false,
            error: {
                code: "INVALID_CREDENTIALS",
                message: "Email ou mot de passe incorrect.",
            },
        };
    }

    // Simule une réponse réussie avec un token fictif et les données utilisateur, 
    // dans un vrai scénario, le backend ne renverrait pas le mot de passe.
    return {
        ok: true,
        data: {
            token: "mock-jwt-token-abc123",
            user: { email: values.email, password: values.password },
        },
    };
}