export interface UpdateProfileRequest {
    userId: number ;
    nickName: string | null,
    email: string | null,
    occupation: string | null,
    hobbies: string[] | null,
    happyActivities: string[] | null
  }