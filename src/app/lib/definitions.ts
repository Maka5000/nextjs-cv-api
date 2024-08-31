export interface User {
  id: string;
  name: string;
  about: string;
  avatar_url: string;
}

export interface Education {
  id: string;
  user_id: string;
  establishment: string;
  program: string;
  degree: string;
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
  imageurl: string;
  link: string;
}

export interface Contact {
  id: string;
  user_id: string;
  iconurl: string;
  type: string;
  contact: string;
}

export interface Language {
  id: string;
  user_id: string;
  language: string;
  level: string;
}

export interface Job {
  id: string;
  user_id: string;
  company: string;
  position: string;
  experience: string;
}

export interface DeleteFunction {
  item?: (userid: string, itemId: string) => void;
  user?: (userid: string) => void;
}

export type CreateFunction = (userid: string, ...args: string[]) => void;
