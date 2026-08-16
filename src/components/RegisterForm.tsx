"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formSchemaType, type FormType } from "@/utils/types";
import { toast } from "./ui/toast";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchemaType),
    defaultValues: {
      fullname: "",
      password: "",
      email: "",
      mobile: "",
      confirm: false,
    },
    mode: "onSubmit",
  });

  const submitFormFn = async (fData: FormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(fData);

    form.reset();

    toast.add({
      title: "Form submitted",
      description: "Form submitted successfully",
      type: "success",
    });
  };

  const clearFormFn = () => {
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(submitFormFn)} noValidate>
      <FieldGroup>
        {/* Full Name */}
        <Controller
          name="fullname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Fullname</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  className="pr-9"
                  aria-invalid={fieldState.invalid}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground focus-visible:text-foreground absolute inset-y-0 right-0 flex w-9 items-center justify-center outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Mobile */}
        <Controller
          name="mobile"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Mobile</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="tel"
                inputMode="numeric"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm */}
        <Controller
          name="confirm"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />

                <FieldLabel htmlFor={field.name} className="font-normal">
                  I confirm the details are correct
                </FieldLabel>
              </Field>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        <div className="flex gap-3">
          <Button
            size={"lg"}
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm hover:from-blue-600 hover:to-cyan-600 focus-visible:ring-blue-500/40"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>

          <Button
            size={"lg"}
            type="button"
            variant="outline"
            className="flex-1"
            onClick={clearFormFn}
            disabled={form.formState.isSubmitting}
          >
            Clear
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
