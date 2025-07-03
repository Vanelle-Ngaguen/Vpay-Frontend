import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useState,
} from "react";
import { View, ActivityIndicator } from "react-native";

interface LoadingStateContext {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingStateContext>({
	loading: false,
	setLoading: () => {},
});

const LoadingContextProvider = ({ children }: PropsWithChildren) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext value={{ loading, setLoading }}>
			{children}
			{/* {loading ? ( */}
			{/* 	<View */}
			{/* 		style={{ */}
			{/* 			width: "100%", */}
			{/* 			height: "100%", */}
			{/* 			justifyContent: "center", */}
			{/* 			alignItems: "center", */}
			{/* 		}} */}
			{/* 	> */}
			{/* 		<ActivityIndicator /> */}
			{/* 	</View> */}
			{/* ) : ( */}
			{/* 	children */}
			{/* )} */}
		</LoadingContext>
	);
};

export default LoadingContextProvider;
