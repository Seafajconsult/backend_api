declare module 'sib-api-v3-sdk' {
  export class TransactionalEmailsApi {
    setApiKey(key: string, value: string): void;
    sendTransacEmail(data: SendSmtpEmail): Promise<any>;
  }

  export class SendSmtpEmail {
    to?: Array<{ email: string; name?: string }>;
    templateId?: number;
    params?: Record<string, any>;
    attachments?: Array<{
      name: string;
      content: string;
      type: string;
    }>;
  }

  export namespace AccountApiApiKeys {
    const apiKey: string;
  }
}
