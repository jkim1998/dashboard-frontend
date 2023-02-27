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
  description: string;
  projectType: string;
  tag: string;
  photo: string;
  members: string;
  lead: string;
}
