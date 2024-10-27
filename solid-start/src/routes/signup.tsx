import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	TextField,
	TextFieldErrorMessage,
	TextFieldLabel,
	TextFieldRoot,
} from "~/components/ui/textfield";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";

export default function SignupPage() {
	const pb = usePocketbaseContext();
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [confirmPassword, setConfirmPassword] = createSignal("");
	const [nameError, setNameError] = createSignal("");
	const [emailError, setEmailError] = createSignal("");
	const [passwordError, setPasswordError] = createSignal("");
	const [confirmPasswordError, setConfirmPasswordError] = createSignal("");

	const handleSignup = async (e: Event) => {
		e.preventDefault();
		// Add your signup logic here
		// For this example, we'll just do some basic validation
		if (!name()) setNameError("Name is required");
		else setNameError("");

		if (!email()) setEmailError("Email is required");
		else setEmailError("");

		if (!password()) setPasswordError("Password is required");
		else setPasswordError("");

		if (password() !== confirmPassword()) {
			setConfirmPasswordError("Passwords do not match");
		} else {
			setConfirmPasswordError("");
		}

		if (
			name() && email() && password() && password() === confirmPassword()
		) {
			console.log("Signup attempt with:", name(), email(), password());
		}

		// example create data
		const data = {
			email: email(),
			emailVisibility: true,
			password: password(),
			passwordConfirm: confirmPassword(),
			name: name(),
		};

		const record = await pb.collection("users").create(data);
		console.log(record);
	};

	return (
		<div class="h-[calc(100vh-3.5rem)] overflow-hidden bg-gray-100">
			{" "}
			{/* Subtract nav height */}
			<div class="flex items-center justify-center h-full overflow-y-auto">
				<Card class="w-[350px] m-4">
					<CardHeader>
						<CardTitle>Sign Up</CardTitle>
						<CardDescription>
							Create a new account to get started.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSignup} class="space-y-4">
							<TextFieldRoot>
								<TextFieldLabel>Name</TextFieldLabel>
								<TextField
									type="text"
									value={name()}
									onInput={(e) =>
										setName(e.currentTarget.value)}
									placeholder="Enter your name"
								/>
								{nameError() && (
									<TextFieldErrorMessage>
										{nameError()}
									</TextFieldErrorMessage>
								)}
							</TextFieldRoot>

							<TextFieldRoot>
								<TextFieldLabel>Email</TextFieldLabel>
								<TextField
									type="email"
									value={email()}
									onInput={(e) =>
										setEmail(e.currentTarget.value)}
									placeholder="Enter your email"
								/>
								{emailError() && (
									<TextFieldErrorMessage>
										{emailError()}
									</TextFieldErrorMessage>
								)}
							</TextFieldRoot>

							<TextFieldRoot>
								<TextFieldLabel>Password</TextFieldLabel>
								<TextField
									type="password"
									value={password()}
									onInput={(e) =>
										setPassword(e.currentTarget.value)}
									placeholder="Create a password"
								/>
								{passwordError() && (
									<TextFieldErrorMessage>
										{passwordError()}
									</TextFieldErrorMessage>
								)}
							</TextFieldRoot>

							<TextFieldRoot>
								<TextFieldLabel>
									Confirm Password
								</TextFieldLabel>
								<TextField
									type="password"
									value={confirmPassword()}
									onInput={(e) => setConfirmPassword(
										e.currentTarget.value,
									)}
									placeholder="Confirm your password"
								/>
								{confirmPasswordError() && (
									<TextFieldErrorMessage>
										{confirmPasswordError()}
									</TextFieldErrorMessage>
								)}
							</TextFieldRoot>

							<Button type="submit" class="w-full mt-6">
								Create Account
							</Button>
						</form>
					</CardContent>
					<CardFooter class="flex justify-center">
						<a
							href="/login"
							class="text-sm text-blue-600 hover:underline"
						>
							Already have an account? Log in
						</a>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
