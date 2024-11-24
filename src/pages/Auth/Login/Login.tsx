import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";

const Login = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <AppForm
        // schema={}
        onSubmit={onSubmit}
        buttonText="Login"
        defaultValues={""}
      >
        {/* Name */}
        <AppInput
          className="w-full"
          name="name"
          label="Full Name"
          placeholder="Enter your name"
        />

        {/* Email */}
        <AppInput
          className="w-full"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        {/* Password */}
        <AppInput
          className="w-full"
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
      </AppForm>
    </div>
  );
};

export default Login;
