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
import Image from "next/image";

export function ConfirmSendMailModal({
	email,
	firstName,
	lastName,
}: {
	email: string;
	firstName: string;
	lastName: string;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Image
					src={"/assets/icons/mail.svg"}
					alt="Mail icon"
					width={1000}
					height={1000}
					className="w-6 h-6 object-cover dark:invert cursor-pointer"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						You will be redirected to send a mail to {firstName}{" "}
						{lastName}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<a href={`mailto:${email}`} target="_blank">
						<AlertDialogAction>Send mail</AlertDialogAction>
					</a>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
