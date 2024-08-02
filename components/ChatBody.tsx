import React from "react";
import { MessageBoxLeft, MessageBoxRight } from "./MessageBox";

const ChatBody = () => {
	return (
		<div className="flex-1 flex flex-col gap-1 w-full overflow-y-scroll p-2">
			<MessageBoxLeft />
			<MessageBoxLeft />
			<MessageBoxRight />
			<MessageBoxLeft />
		</div>
	);
};

export default ChatBody;
