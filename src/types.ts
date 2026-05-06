
export interface Attachment {
  name: string;
  type: string;
  url: string;
  base64Data?: string;
}

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark' | 'system';
}
