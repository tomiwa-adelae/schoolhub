"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { editCourseDetails } from "@/lib/actions/course.actions";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CourseFormSchema } from "@/lib/validation";
import { courseUnits } from "@/constants";

export function EditCourseDetailsModal({
	title,
	code,
	unit,
	userId,
	courseId,
}: {
	title: string;
	code: string;
	unit: string;
	userId: string;
	courseId: string;
}) {
	const [closeModal, setCloseModal] = useState(false);

	const form = useForm<z.infer<typeof CourseFormSchema>>({
		resolver: zodResolver(CourseFormSchema),
		defaultValues: {
			title: title || "",
			code: code || "",
			unit: unit || "",
		},
	});

	async function onSubmit(data: z.infer<typeof CourseFormSchema>) {
		try {
			const res = await editCourseDetails({
				userId,
				title: data.title,
				code: data.code,
				unit: data.unit,
				courseId,
			});

			if (res?.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});

			setCloseModal(false);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<AlertDialog open={closeModal}>
			<AlertDialogTrigger asChild>
				<Button variant={"ghost"} onClick={() => setCloseModal(true)}>
					<Pencil className="w-4 h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit course</AlertDialogTitle>
					<AlertDialogDescription className="text-left">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
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
												<Input
													placeholder="PHY1103"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
													{courseUnits.map(
														(unit, index) => (
															<SelectItem
																key={index}
																value={unit}
															>
																{unit}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<AlertDialogFooter>
									<AlertDialogCancel
										onClick={() => setCloseModal(false)}
									>
										Cancel
									</AlertDialogCancel>
									<Button
										disabled={form.formState.isSubmitting}
										type="submit"
									>
										{form.formState.isSubmitting
											? "Editing..."
											: "Submit"}
									</Button>
								</AlertDialogFooter>
							</form>
						</Form>
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
