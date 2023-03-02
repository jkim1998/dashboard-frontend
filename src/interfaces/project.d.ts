import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  // propertyType: string;
  // location: string;
  // price: number | undefined;
}

export interface ProjectCardProps {
  id?: BaseKey | undefined;
  title: string;
  github: string;
  preview: string;
  description: string;
  projectType: string;
  tag: string;
  photo: string;
  members: string;
  lead: string;
}

export interface BannerProps {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  allProjects: Array<string>;
}
