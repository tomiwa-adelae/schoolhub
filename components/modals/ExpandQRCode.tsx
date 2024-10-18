import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

export function ExpandQRCode({
	qrcode,
	title,
	date,
}: {
	qrcode: string;
	date: string;
	title: string;
}) {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-400 rounded-md">
					<Image
						src={qrcode}
						alt={`QRCode for ${title} on the {date}`}
						width={1000}
						height={1000}
						className="w-auto h-auto object-cover"
					/>
					<h3 className="font-bold text-base">Expand QRCode</h3>
				</div>
			</DrawerTrigger>
			<DrawerContent className="container">
				<h3 className="font-bold text-lg mb-4">
					QRCode for {title} on the {date}
				</h3>
				<div className="flex items-center justify-center">
					<Image
						src={qrcode}
						alt={`QRCode for ${title} on the {date}`}
						width={10000}
						height={10000}
						className="w-auto h-[80vh]"
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
