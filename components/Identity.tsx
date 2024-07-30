"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { identities } from "@/constants";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { updateIdentity } from "@/lib/actions/user.actions";

const Identity = ({ id }: { id: string }) => {
	const router = useRouter();

	const [identity, setIdentity] = useState("");
	const [loading, setLoading] = useState(false);

	const handleIdentity = async () => {
		try {
			setLoading(true);
			await updateIdentity(id, identity);

			setLoading(false);
			router.push(`/details/${identity}`);
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
				{identities.map(({ value, icon, label }, index) => (
					<div
						key={index}
						className={`rounded-md border-2 border-gray-400 p-8 flex items-center justify-center flex-col cursor-pointer gap-4 relative ${
							value === identity
								? "border-blue-500"
								: "border-dashed"
						}`}
						onClick={() => setIdentity(value)}
					>
						<div className="absolute top-3 right-3">
							{value === identity ? (
								<CircleCheck className="text-blue-400" />
							) : (
								<CircleCheck />
							)}
						</div>
						<Image
							src={icon}
							alt={`${value} icon`}
							width={1000}
							height={1000}
							className="w-10 h-10"
						/>
						<h3 className="font-bold text-xs md:text-base uppercase">
							{label}
						</h3>
					</div>
				))}
			</div>
			<Button disabled={!identity || loading} onClick={handleIdentity}>
				{loading ? "Saving..." : "Continue"}
			</Button>
		</div>
	);
};

export default Identity;
