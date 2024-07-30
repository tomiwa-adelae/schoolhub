"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";
import { IUser } from "@/lib/database/models/user.model";
import { departments, faculties, levels } from "@/constants";
import { updateBoardingDetails } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email(),
	phoneNumber: z
		.string()
		.min(10, {
			message: "Phone number must be at least 10 characters.",
		})
		.max(11, { message: "Phone number must be valid." }),
	matricNumber: z
		.string()
		.min(7, {
			message: "Matriculation/Admission must be valid.",
		})
		.max(13, { message: "Matriculation/Admission must be valid." }),
	level: z.string(),
	department: z.string(),
	faculty: z.string(),
});

export function StudentForm({ id, user }: { id: string; user: IUser }) {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			email: user.email || "",
			matricNumber: "",
			phoneNumber: "",
			level: "",
			department: "",
			faculty: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const user = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phoneNumber: data.phoneNumber,
				matricNumber: data.matricNumber,
				level: data.level,
				department: data.department,
				faculty: data.faculty,
			};

			await updateBoardingDetails(id, user);

			toast({
				title: "Success!",
			});
			router.push("/success");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="johndoe@gmail.com"
									{...field}
									readOnly
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="matricNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Matriculation/Admission number
							</FormLabel>
							<FormControl>
								<Input placeholder="20N07001" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone number</FormLabel>
							<FormControl>
								<Input placeholder="0812 345 6789" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="level"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Level</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a level" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{levels.map((level, index) => (
											<SelectItem
												key={index}
												value={level}
											>
												{level}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="department"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Department</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a department" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{departments.map(
											(department, index) => (
												<SelectItem
													key={index}
													value={department}
												>
													{department}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="faculty"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Faculty</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a faculty" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{faculties.map((faculty, index) => (
											<SelectItem
												key={index}
												value={faculty}
											>
												{faculty}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={form.formState.isSubmitting} type="submit">
					{form.formState.isSubmitting ? "Submitting" : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
