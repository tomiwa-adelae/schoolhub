"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Attendee from "../Attendee";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import Searcher from "../Searcher";

export function AttendanceList({
	date,
	userId,
	courseId,
}: {
	date: string;
	courseId: string;
	userId: string;
}) {
	const [attendees, setAttendees] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAttendees = async () => {
		try {
			setLoading(true);
			// const attendees = await getAttendeesPerDate({
			// 	userId,
			// 	courseId,
			// 	date,
			// });

			// setAttendees(attendees?.attendees);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger onClick={getAttendees} asChild>
				<div className="cursor-pointer flex items-center justify-start gap-2">
					<Image
						src={"/assets/icons/school.svg"}
						alt="User"
						width={1000}
						height={1000}
						className="w-10 h-10 object-cover rounded-md"
					/>
					<div className="flex flex-col items-start justify-start space-y-1">
						<h4 className="text-xs font-bold">{date}</h4>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-2">
						Students present:
					</DialogTitle>
					{attendees.length !== 0 && (
						<Input type="text" placeholder="Search students..." />
					)}
				</DialogHeader>
				{loading && <Searcher />}
				{!loading && (
					<ScrollArea className="max-h-[300px]">
						<div className="grid gap-2">
							{/* {attendees.map((attendee, index) => (
								<Attendee key={index} />
							))} */}
						</div>
						{attendees?.length === 0 && (
							<p className="text-sm italic text-center my-4">
								No student attended this class.
							</p>
						)}
					</ScrollArea>
				)}
			</DialogContent>
		</Dialog>
	);
}
