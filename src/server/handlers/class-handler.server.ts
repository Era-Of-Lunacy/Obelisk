import { ReplicatedStorage } from "@rbxts/services";
import { getClass } from "server/database/classes";
import { getUser, updateUser } from "server/database/users";
import { Class } from "shared/types/classes";
import { WaitForPath } from "shared/utils/path";

const buyClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/buy-class");
const equipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/equip-class");
const unequipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/unequip-class");

buyClassFunction.OnServerInvoke = (player, classType) => {
	const [userSuccess, userResult] = getUser(player).await();
	const [classSuccess, classResult] = getClass(classType as Class).await();

	if (userSuccess && classSuccess && userResult.data && classResult.data) {
		if (!userResult.data?.[0].owned_classes.includes(classType as Class)) {
			if (userResult.data[0].bwambles >= classResult.data[0].price) {
				const [success] = updateUser(player, {
					bwambles: userResult.data[0].bwambles - classResult.data[0].price,
					owned_classes: [...userResult.data[0].owned_classes, classType as Class],
				}).await();

				if (success) {
					return true;
				}
			}
		}
	} else {
		warn("Failed to get user or class", userResult, classResult);
	}

	return false;
};

equipClassFunction.OnServerInvoke = (player, classType) => {
	const [userSuccess, userResult] = getUser(player).await();

	if (userSuccess && userResult.data) {
		if (userResult.data[0].owned_classes.includes(classType as Class)) {
			const [success] = updateUser(player, {
				class: classType as Class,
			}).await();

			if (success) {
				return true;
			}
		}
	} else {
		warn("Failed to get user", userResult);
	}

	return false;
};

unequipClassFunction.OnServerInvoke = (player) => {
	const [userSuccess, userResult] = getUser(player).await();

	if (userSuccess && userResult.data) {
		const [success] = updateUser(player, {
			class: Class.None,
		}).await();

		if (success) {
			return true;
		}
	} else {
		warn("Failed to get user", userResult);
	}

	return false;
};
