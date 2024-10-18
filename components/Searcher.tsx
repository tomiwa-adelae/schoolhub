import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/assets/animation/loading-animation.json";
import darkAnimationData from "@/public/assets/animation/dark-loading-animation.json";
import { useRef } from "react";

const Searcher = () => {
	const animationRef = useRef<LottieRefCurrentProps>(null);

	return (
		<div className="my-8">
			<h3 className="text-center mb-4 text-sm">Searching...</h3>
			<div className="dark:hidden">
				<Lottie
					lottieRef={animationRef}
					animationData={animationData}
					className="h-40"
				/>
			</div>
			<div className="hidden dark:block">
				<Lottie
					lottieRef={animationRef}
					animationData={darkAnimationData}
					className="h-[300px]"
				/>
			</div>
		</div>
	);
};

export default Searcher;
