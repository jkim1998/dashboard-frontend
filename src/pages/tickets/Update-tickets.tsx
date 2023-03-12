import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";

const UpdateTickets = () => {
  const { data: user } = useGetIdentity();
  const [screenshot, setProjectImage] = useState({ name: "", url: "" });

  // const getURL = async () => {
  //   let url = "http://localhost:8080/api/v1/projects";
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: "React POST Request Example" }),
  //   };
  //   fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => this.setProjectImage({ url: data.photo }));
  // };
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
      photo: screenshot.url,
      email: user.email,
    });
  };
  return (
    <Form
      title="ticket"
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      photoUrl={screenshot}
    />
  );
};

export default UpdateTickets;
