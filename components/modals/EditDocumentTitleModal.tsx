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
import { DocumentSchema } from "@/lib/validation";
import { Pencil } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { editDocumentTitle } from "@/lib/actions/document.actions";

export function EditDocumentTitleModal({
	title,
	userId,
	documentId,
}: {
	title: string;
	userId: string;
	documentId: string;
}) {
	const [closeModal, setCloseModal] = useState(false);

	const form = useForm<z.infer<typeof DocumentSchema>>({
		resolver: zodResolver(DocumentSchema),
		defaultValues: {
			title: title || "",
		},
	});

	async function onSubmit(data: z.infer<typeof DocumentSchema>) {
		try {
			const res = await editDocumentTitle({
				userId,
				title: data.title,
				documentId,
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
					<AlertDialogTitle>Edit title</AlertDialogTitle>
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
													placeholder="Radiation..."
													{...field}
												/>
											</FormControl>

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
