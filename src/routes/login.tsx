import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card";
import { TextFieldRoot, TextFieldLabel, TextField, TextFieldErrorMessage } from "~/components/ui/textfield";
import pb from "~/libs/pb";
import { setAuthState } from "~/stores/authStore";

export default function LoginPage() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    // Add your login logic here
    // For this example, we'll just do some basic validation
    if (!email()) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (!password()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    try {
      const authData = await pb.collection('users').authWithPassword(email(), password());
      setAuthState({
        token: authData.token,
        userId: authData.record.id
      });
      console.log("Logged in successfully", authData);
      // TODO: Redirect to dashboard or home page
    } catch (error) {
      console.error("Login failed", error);
      // TODO: Show error message to user
    }
  };

  return (
    <div class="h-[calc(100vh-3.5rem)] overflow-hidden bg-gray-100"> {/* Subtract nav height */}
      <div class="flex items-center justify-center h-full overflow-y-auto">
        <Card class="w-[350px] m-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} class="space-y-4">
              <TextFieldRoot>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextField
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  placeholder="Enter your email"
                />
                {emailError() && <TextFieldErrorMessage>{emailError()}</TextFieldErrorMessage>}
              </TextFieldRoot>

              <TextFieldRoot>
                <TextFieldLabel>Password</TextFieldLabel>
                <TextField
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter your password"
                />
                {passwordError() && <TextFieldErrorMessage>{passwordError()}</TextFieldErrorMessage>}
              </TextFieldRoot>

              <Button type="submit" class="w-full mt-6">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter class="flex justify-between">
            <a href="#" class="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
            <a href="/signup" class="text-sm text-blue-600 hover:underline">
              Sign up
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
