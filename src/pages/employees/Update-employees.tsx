import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";
import { Profile } from "components";

const UpdateEmployees = () => {
  const { data: user } = useGetIdentity();
  const [screenshot, setProjectImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setProjectImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    // if (!screenshot.name) return alert("Please upload a project image");

    await onFinish({
      ...data,
      avatar: screenshot.url,
    });
  };
  return (
    <>
      <Form
        title="user"
        type="Edit"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        photoUrl={screenshot}
      />
    </>
  );
};

export default UpdateEmployees;
