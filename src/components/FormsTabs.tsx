"use client";

import { LogIn, MessageSquare, UserRoundPlus } from "lucide-react";

import FormPlaceholder from "@/components/FormPlaceholder";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormsTabs = () => {
  return (
    <Tabs defaultValue="register" className="w-full">
      <TabsList variant="line" className="w-full">
        {/* Trigger */}
        <TabsTrigger value="register" className="data-active:after:bg-blue-500">
          <UserRoundPlus />
          Register
        </TabsTrigger>

        <TabsTrigger value="login" className="data-active:after:bg-blue-500">
          <LogIn />
          Login
        </TabsTrigger>

        <TabsTrigger value="contact" className="data-active:after:bg-blue-500">
          <MessageSquare />
          Contact
        </TabsTrigger>
      </TabsList>

      {/* Register form */}
      <TabsContent value="register" className="pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Set up your profile to get started.
          </p>
        </div>

        <RegisterForm />
      </TabsContent>

      {/* Login form */}
      <TabsContent value="login" className="pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Sign in to your account to continue.
          </p>
        </div>

        <FormPlaceholder
          icon={LogIn}
          description="The login form will live here, wired with React Hook Form and Zod."
        />
      </TabsContent>

      {/* Contact form */}
      <TabsContent value="contact" className="pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">
            We usually reply within a day.
          </p>
        </div>

        <FormPlaceholder
          icon={MessageSquare}
          description="The contact form will live here, wired with React Hook Form and Zod."
        />
      </TabsContent>
    </Tabs>
  );
};

export default FormsTabs;
