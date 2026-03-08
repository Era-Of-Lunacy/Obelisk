import React from "@rbxts/react";

interface RedirectProps {
	message: string;
	seconds: number;
}

export default function Redirect(props: RedirectProps) {
	const [timeLeft, setTimeLeft] = React.useState(props.seconds);

	React.useEffect(() => {
		const thread = task.spawn(() => {
			while (true) {
				task.wait(1);

				setTimeLeft((prev) => {
					if (prev <= 0) {
						task.cancel(thread);
						return 0;
					}
					return prev - 1;
				});
			}
		});
	}, []);

	return (
		<screengui IgnoreGuiInset={true}>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
			>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Font={Enum.Font.Cartoon}
					FontSize="Size36"
					Text={props.message + `\nRedirecting in ${timeLeft}...`}
				></textlabel>
			</frame>
		</screengui>
	);
}
