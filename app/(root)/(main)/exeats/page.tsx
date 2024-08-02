import PageHeader from "@/components/PageHeader";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import TopNavbar from "@/components/shared/TopNavbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const exeats = [
	{
		date: "12th of September, 2024",
		location: "Abuja, Maitama",
		reason: "Medical and Health conditions",
		status: "approved",
	},
	{
		date: "12th of September, 2024",
		location: "Akobo Ojun-Irin, Ibadan",
		reason: "International Passport application",
		status: "rejected",
	},
	{
		date: "12th of September, 2024",
		location: "Magodo Phase 2, GRA, Lagos State",
		reason: "Summer vacation is at hand",
		status: "approved",
	},
	{
		date: "12th of September, 2024",
		location: "Ikosi Ketu, Lagos State",
		reason: "International Passport application",
		status: "approved",
	},
	{
		date: "12th of September, 2024",
		location: "Oyo State",
		reason: "International Passport application",
		status: "pending",
	},
];

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<main>
			<TopNavbar>
				<SearchBar type={"exeats"} />
			</TopNavbar>
			<div className="container py-4">
				<PageHeader
					firstName={user.firstName}
					lastName={user.lastName}
					identity={user.identity}
					department={user.department}
					picture={user.picture}
				>
					<Button className="w-full md:w-auto" asChild>
						<Link href="/exeats/create">Apply for new exeat</Link>
					</Button>
				</PageHeader>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">My exeat history</h3>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Reason</TableHead>
								<TableHead className="text-right">
									Status
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{exeats.map((exeat, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">
										{exeat.date}
									</TableCell>
									<TableCell>{exeat.location}</TableCell>
									<TableCell>{exeat.reason}</TableCell>
									<TableCell
										className={`text-right capitalize ${
											exeat.status === "approved"
												? "text-green-400"
												: exeat.status === "rejected" &&
												  "text-destructive"
										}`}
									>
										{exeat.status}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{/* <p className="text-sm italic text-center mt-4">
						You have not applied for exeat yet. Start today
					</p> */}
				</div>
				<Pagination />
			</div>
		</main>
	);
};

export default page;
