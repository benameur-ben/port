export type Category = 'Developer' | 'Automation' | 'Mediator' | 'Buyer';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  link: string;
}

export interface NewProjectPayload {
  title: string;
  description: string;
  category: Category;
  link: string;
}