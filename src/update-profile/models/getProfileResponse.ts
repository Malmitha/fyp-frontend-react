export interface GetProfileResponse {
  responseBody: {
    profile: {
      userId: number;
      firstName: string;
      lastName: string;
      nickname: string;
      gender: string;
      email: string;
      occupation: string;
      age: number;
      dateOfBirth: string;
    };
    credentials: {
      username: string;
      password: string;
    };
    hobbies: Hobby[];
    activities: Activity[];
  };
}

export interface Hobby {
  hobbyId: number;
  hobby: string;
}

export interface Activity {
  activityId: number;
  activity: string;
}
