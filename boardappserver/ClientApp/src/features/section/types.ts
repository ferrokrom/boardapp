import { Section } from "../../types";

export interface ISection {
  entities: Section[];
  loading: boolean;
}
export interface IGetSections {
  boardId: string;
}
export interface ICreateSectionProps {
  title: string;
  boardId: string;
}
export interface IUpdateSectionProps {
  sectionId: string;
  title: string;
  description: string;
  color: string;
  dueDate: Date;
}
export interface IDeleteSectionProps {
  sectionId: string;
}
export type KnownError = {
  error: string;
};
