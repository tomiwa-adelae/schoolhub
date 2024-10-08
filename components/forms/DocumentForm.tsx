"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
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

import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { createDocument } from "@/lib/actions/document.actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
});

export function DocumentForm({
	userId,
	courseId,
}: {
	courseId: string;
	userId: string;
}) {
	const [files, setFiles] = useState<File[]>([]);
	const [document, setDocument] = useState<string | null | ArrayBuffer>();

	const router = useRouter();

	const handleFileUpload = (files: File[]) => {
		setFiles(files);

		const reader = new FileReader();

		reader.readAsDataURL(files[0]);
		reader.onload = () => {
			const binaryStr = reader.result;
			setDocument(binaryStr);
		};
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!document)
			return toast({
				title: "Error!",
				description: "Please select a document to upload!",
				variant: "destructive",
			});

		try {
			const res = await createDocument({
				document,
				title: data.title,
				userId,
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

			router.push(`/documents/${res?.document._id}`);
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
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Radiation..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FileUpload onChange={handleFileUpload} />
				<Button
					disabled={form.formState.isSubmitting}
					className="w-full md:w-auto"
					type="submit"
				>
					{form.formState.isSubmitting ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
}
