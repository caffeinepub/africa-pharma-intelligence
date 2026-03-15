import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaymentSubmission {
    name: string;
    whatsapp: string;
    productId: string;
    email: string;
    timestamp: Time;
    amount: bigint;
    transactionId: string;
}
export type Time = bigint;
export interface AccessCode {
    subscriberEmail: string;
    code: string;
    usedAt?: Time;
    createdAt: Time;
    subscriberName: string;
    isUsed: boolean;
    reportId: string;
    subscriberWhatsapp: string;
    transactionId: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimFirstAdmin(): Promise<boolean>;
    createAccessCode(code: string, reportId: string, subscriberName: string, subscriberEmail: string, subscriberWhatsapp: string, transactionId: string): Promise<boolean>;
    deleteAccessCode(code: string): Promise<boolean>;
    getAccessCodeByCode(code: string): Promise<AccessCode | null>;
    getAllAccessCodes(): Promise<Array<AccessCode>>;
    getAllPaymentSubmissions(): Promise<Array<PaymentSubmission>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    redeemAccessCode(code: string): Promise<{
        subscriberEmail: string;
        subscriberName: string;
        reportId: string;
    } | null>;
    submitPaymentSubmission(name: string, email: string, whatsapp: string, transactionId: string, productId: string, amount: bigint): Promise<void>;
}
