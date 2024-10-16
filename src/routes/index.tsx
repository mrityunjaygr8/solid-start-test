import { Title } from "@solidjs/meta";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  TextFieldRoot,
  TextField,
  TextFieldLabel,
  TextFieldDescription,
  TextFieldErrorMessage,
} from "~/components/ui/textfield";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <div class="flex">
        <div class="p-4">
          <Button class="mb-4">Click Me</Button>
          <Card class="w-[350px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                This is the description of the card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid w-full items-center gap-4">
                <TextFieldRoot>
                  <TextFieldLabel>Email</TextFieldLabel>
                  <TextField type="email" placeholder="Email" />
                  <TextFieldErrorMessage>
                    Email is required.
                  </TextFieldErrorMessage>
                </TextFieldRoot>
                <TextFieldRoot>
                  <TextFieldLabel>Password</TextFieldLabel>
                  <TextField type="password" placeholder="password" />
                </TextFieldRoot>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
