export interface User {
  id: string;
  name: string;
  about: string;
  avatar_url: string;
}

export interface Education {
  id: string;
  user_id : string;
  establishment : string;
  program : string;
  degree : string;
}

export interface Skill {
  id: string;
  user_id: string;
  iconURL: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  imageURL: string;
  link: string;
}

export interface Contact {
  id: string;
  user_id: string;
  iconURL: string;
  type: string;
  contact: string | number;
}

export interface DeleteFunction {
  item? : (userid : string, itemId : string) => void;
  user? : (userid : string) => void;
}