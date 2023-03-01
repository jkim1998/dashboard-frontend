import React, { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import Form from "components/common/Form";

const CreateTicket = () => {
  /* eslint-disable no-restricted-globals */
  const { data: user } = useGetIdentity();
  const [screenshot, setPropertyImage] = useState({ name: "", url: "" });
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
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    // if (!screenshot.name) return alert("Please select an image");

    await onFinish({
      ...data,
      photo: screenshot.url,
      email: user.email,
    });
  };

  return (
    <>
      <Form
        title="ticket"
        type="Create"
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

export default CreateTicket;
