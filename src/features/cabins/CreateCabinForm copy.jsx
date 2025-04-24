import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabins } from "../../services/apiCabins";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabins) => createCabins(newCabins),
    onSuccess: () => {
      toast.success("cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit, getValues, reset, formState } = useForm();

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onErrors(errors) {
    console.log(errors);
  }

  const { errors } = formState;
  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <FormRow label={"Cabin Name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            min: { value: 1, message: "value should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "The field is required",
            max: { value: 5, message: "capacity can be max 5" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "The field is required",
            min: { value: 1, message: "Price cannot be 0" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
