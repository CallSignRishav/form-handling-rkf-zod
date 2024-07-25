import { formSchemaType, FormType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";

const Display = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isLoading, errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchemaType),
    mode: "all",
  });

  const submitFormFn = (fData: FormType) => {
    console.log(fData);
  };

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader className="flex items-center justify-center text-3xl font-bold">
          Registration Form
        </CardHeader>

        <Divider />

        <form onSubmit={handleSubmit(submitFormFn)} noValidate>
          <CardBody className="space-y-4">
            <Input
              isRequired
              color={isValid ? "success" : "primary"}
              variant="underlined"
              label="Name"
              {...register("username")}
              isInvalid={errors.username?.message ? true : false}
              errorMessage={errors.username?.message}
            />

            <Input
              isRequired
              color={isValid ? "success" : "primary"}
              variant="underlined"
              label="Email"
              {...register("useremail")}
              isInvalid={errors.useremail?.message ? true : false}
              errorMessage={errors.useremail?.message}
            />

            <Input
              isRequired
              type="number"
              color={isValid ? "success" : "primary"}
              variant="underlined"
              label="Age"
              {...register("userage")}
              isInvalid={errors.userage?.message ? true : false}
              errorMessage={errors.userage?.message}
            />

            <Button type="submit" color="success" variant="shadow" size="lg">
              Submit
            </Button>
          </CardBody>
        </form>
      </Card>
    </>
  );
};

export default Display;
