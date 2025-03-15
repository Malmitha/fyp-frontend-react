export interface UpdateCredentialsRequest {
  userId: number;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
