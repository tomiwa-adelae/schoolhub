import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex h-12 w-full rounded-md border border-input dark:border-gray-500 bg-white dark:bg-dark px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
