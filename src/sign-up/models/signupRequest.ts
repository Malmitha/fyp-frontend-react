export interface SignUpRequest {
    dob: any;
    firstName: string,
    lastName: string,
    nickName: string,
    gender:string,
    age: number,
    dateOfBirth: string,
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    occupation: string,
    hobbies: string[],
    happyActivities: string[]
  }