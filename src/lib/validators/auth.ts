import { z } from 'zod';

const emailField = z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.');

const passwordField = z
  .string()
  .min(8, 'Das Passwort muss mindestens 8 Zeichen lang sein.');

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    email: emailField,
    password: passwordField
      .regex(/[A-Z]/, 'Das Passwort muss mindestens einen Großbuchstaben enthalten.')
      .regex(/[0-9]/, 'Das Passwort muss mindestens eine Zahl enthalten.'),
    passwordConfirm: z.string(),
    plz: z
      .string()
      .regex(/^\d{5}$/, 'Bitte gib eine gültige 5-stellige Postleitzahl ein.'),
    agbAccepted: z
      .boolean()
      .refine((v) => v, 'Du musst die AGB und Datenschutzerklärung akzeptieren.'),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Die Passwörter stimmen nicht überein.',
    path: ['passwordConfirm'],
  });

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
