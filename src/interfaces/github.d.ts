export interface GithubCredentialResponse {
  access_token: string;
  token_type: string;
  scope: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

export interface GithubConfiguration {
  client_id: string | undefined;
  redirect_uri?: string;
  state?: string;
  scope?: string;
}

export interface Github {
  login: (input: GithubConfiguration) => void;
}

declare global {
  interface Window {
    github: Github;
  }
}
