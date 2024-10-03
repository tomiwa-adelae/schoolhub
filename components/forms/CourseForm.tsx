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
import { courseUnits, departments, faculties } from "@/constants";
import { updateBoardingLecturerDetails } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { CourseFormSchema } from "@/lib/validation";
import { createNewCourse } from "@/lib/actions/course.actions";

export function CourseForm({ id, user }: { id: string; user: IUser }) {
	const router = useRouter();

	const form = useForm<z.infer<typeof CourseFormSchema>>({
		resolver: zodResolver(CourseFormSchema),
		defaultValues: {
			title: "",
			code: "",
			unit: "",
		},
	});

	async function onSubmit(data: z.infer<typeof CourseFormSchema>) {
		try {
			const course = {
				title: data.title,
				unit: data.unit,
				code: data.code,
				userId: user._id,
			};

			const res = await createNewCourse({ ...course });

			if (res.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Course created!",
				description: `You have successfully created ${res.code} - ${res.title}.`,
			});

			router.push(`/courses/${res._id}`);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course title</FormLabel>
								<FormControl>
									<Input
										placeholder="Introduction to Electronics"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course code</FormLabel>
								<FormControl>
									<Input placeholder="PHY1103" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="unit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course unit</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a course unit" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{courseUnits.map((unit, index) => (
										<SelectItem key={index} value={unit}>
											{unit}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="w-full md:w-auto"
					disabled={form.formState.isSubmitting}
					type="submit"
				>
					{form.formState.isSubmitting ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
}
