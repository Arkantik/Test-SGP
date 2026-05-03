"use client";

import { useState } from "react";
import { Alert, Button, CircularProgress, Collapse, Link, SvgIcon } from "@mui/material";
import FormField from "@/components/FormField";
import { required, isEmail, minLength } from "@/utils/validators";
import type { LoginFormValues, FormErrors } from "./login.types";
import styles from "./form.module.css";
import { loginUser } from "@/app/api/mockLogin";

function validateLoginForm(values: LoginFormValues): FormErrors {
    return {
        email:
            required("L'email est requis.")(values.email, values) ??
            isEmail()(values.email, values),
        password:
            required("Le mot de passe est requis.")(values.password, values) ??
            minLength(4)(values.password, values),
    };
}

function WindowsIcon() {
    return (
        <SvgIcon viewBox="0 0 24 24" fontSize="small" sx={{ color: "#00a4ef" }}>
            <path d="M3 12V6.75l6-1.32v6.57H3zm16-9v8.75h-7V4.68L20 3zM3 13h6v6.57l-6-1.32V13zm16 .25V22l-7-1.32V13h7z" />
        </SvgIcon>
    );
}

export default function LoginForm() {
    const [form, setForm] = useState<LoginFormValues>({ email: "", password: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        setServerError(null);

        const formErrors = validateLoginForm(form);
        if (Object.values(formErrors).some(Boolean)) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await loginUser(form);

            if (response.ok) {
                console.log("Connexion réussie :", response.data);
                setSuccess(true);
            } else {
                console.error("Erreur API :", response.error);
                setServerError(response.error.message);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            setServerError("Une erreur réseau est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <Collapse in={success}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Connexion simulée avec succès. Consultez la console du navigateur.
                </Alert>
            </Collapse>

            <Collapse in={!!serverError}>
                <Alert severity="error" onClose={() => setServerError(null)}>
                    {serverError}
                </Alert>
            </Collapse>

            <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="nom@example.fr"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
            />

            <FormField
                label="Mot de passe"
                name="password"
                type="password"
                placeholder="nom@example.fr"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="current-password"
            />

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={
                    loading ? <CircularProgress size={18} color="inherit" /> : <WindowsIcon />
                }
                sx={{
                    alignSelf: "center",
                    mt: 0.5,
                    px: 3,
                    py: 1,
                    backgroundColor: "#3d4043",
                    "&:hover": { backgroundColor: "#555" },
                }}
            >
                {loading ? "Connexion…" : "Se connecter"}
            </Button>

            <Link
                href="#"
                underline="always"
                variant="body2"
                sx={{ alignSelf: "center", color: "#2EA350", textDecorationColor: "#2EA350" }}
                onClick={(e) => e.preventDefault()}
            >
                Mot de passe oublié ?
            </Link>
        </form>
    );
}