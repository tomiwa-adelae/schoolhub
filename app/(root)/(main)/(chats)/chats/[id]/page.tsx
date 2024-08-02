import ChatBody from "@/components/ChatBody";
import ChatForm from "@/components/ChatForm";
import ChatHead from "@/components/ChatHead";

const page = () => {
	return (
		<div className="-mt-14 md:mt-0 flex items-center justify-center flex-col h-screen w-full">
			<ChatHead />
			<ChatBody />
			<ChatForm name={"Tomiwa Adelae"} />
		</div>
	);
};

export default page;
