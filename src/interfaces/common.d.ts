export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  id: string;
  type: string;
  name: string | undefined;
  avatar: string;
  email: string;
  projects: Array | undefined;
  phone: string;
  location: string;
}

export interface ProjectProps {
  _id: string;
  title: string;
  github: string;
  preview: string;
  description: string;
  projectType: string;
  members: string;
  tag: string;
  photo: string;
  lead: string;
}

export interface FormProps {
  title: string;
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  photoUrl: { name: string; url: string };
}
