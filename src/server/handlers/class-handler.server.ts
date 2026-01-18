import { ReplicatedStorage } from "@rbxts/services";
import { getClassData } from "server/handlers/data/class-data";
import { getUserData, updateUser as updateCachedUser } from "server/handlers/data/user-data";
import { WaitForPath } from "shared/utils/path";

const buyClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/buy-class");
const equipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/equip-class");
const unequipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/unequip-class");

buyClassFunction.OnServerInvoke = (player, classType) => {
	const userData = getUserData(player.UserId);
	const classData = getClassData(classType as string);

	if (userData !== undefined && classData !== undefined) {
		if (classData.enabled === false) {
			warn("Class is disabled", classData.class);
			return false;
		}

		if (!userData.owned_classes.includes(classType as string)) {
			if (userData.bwambles >= classData.price) {
				const success = updateCachedUser(player.UserId, {
					bwambles: userData.bwambles - classData.price,
					owned_classes: [...userData.owned_classes, classType as string],
				});

				if (success === true) {
					return true;
				}
			}
		}
	} else {
		warn("Failed to get user or class data", userData, classData);
	}

	return false;
};

equipClassFunction.OnServerInvoke = (player, classType) => {
	const userData = getUserData(player.UserId);
	const classData = getClassData(classType as string);

	if (userData !== undefined && classData !== undefined) {
		if (classData.enabled === false) {
			warn("Class is disabled", classData.class);
			return false;
		}

		if (userData.owned_classes.includes(classType as string)) {
			const success = updateCachedUser(player.UserId, {
				class: classType as string,
			});

			if (success === true) {
				return true;
			}
		}
	} else {
		warn("Failed to get user or class data", userData, classData);
	}

	return false;
};

unequipClassFunction.OnServerInvoke = (player) => {
	const userData = getUserData(player.UserId);

	if (userData !== undefined) {
		const success = updateCachedUser(player.UserId, {
			class: "None",
		});

		if (success === true) {
			return true;
		}
	} else {
		warn("Failed to get user data", userData);
	}

	return false;
};
