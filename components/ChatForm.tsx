"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ChatForm = ({ name }: { name: string }) => {
	const [message, setMessage] = useState("");
	return (
		<div className="w-full flex items-center justify-between bg-white dark:bg-dark border-t-2 border-dashed border-gray-400 pr-1">
			<Textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="flex-1 bg-transparent dark:bg-transparent border-none"
				placeholder={`Message ${name}`}
			/>
			<Button size={"sm"}>Send</Button>
		</div>
	);
};

export default ChatForm;
