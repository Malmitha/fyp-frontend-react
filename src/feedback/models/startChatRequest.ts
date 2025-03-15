export interface StartChatRequest {
    userId: number | null,
    type: string | null,
    hobbies: Hobby[],
    happyActivities: Activity[],
    age: number | null,
    occupation: string | null
  }

  export interface Hobby {
    hobby: string;
  }
  
  export interface Activity {
    activity: string;
  }