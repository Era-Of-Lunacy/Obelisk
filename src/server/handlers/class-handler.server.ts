import { ReplicatedStorage } from "@rbxts/services";
import { getClass } from "server/handlers/data/classes/class-data";
import { getUser, updateUser } from "server/handlers/data/users/user-data";
import { WaitForPath } from "shared/utils/path";

const buyClassFunction = WaitForPath<RemoteFunction<(classType: string) => boolean>>(
	ReplicatedStorage,
	"remote-functions/buy-class",
);
const equipClassFunction = WaitForPath<RemoteFunction<(classType: string) => boolean>>(
	ReplicatedStorage,
	"remote-functions/equip-class",
);
const unequipClassFunction = WaitForPath<RemoteFunction<() => boolean>>(
	ReplicatedStorage,
	"remote-functions/unequip-class",
);

buyClassFunction.OnServerInvoke = (player, classType) => {
	const userData = getUser(player.UserId);
	const classData = getClass(classType as string);

	if (userData !== undefined && classData !== undefined) {
		if (classData.enabled !== true) {
			warn("Class is disabled", classData.class);
			return false;
		}

		if (!userData.owned_classes.includes(classType as string)) {
			if (userData.bwambles >= classData.price) {
				const success = updateUser(player.UserId, {
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
	const userData = getUser(player.UserId);
	const classData = getClass(classType as string);

	if (userData !== undefined && classData !== undefined) {
		if (classData.enabled !== true) {
			warn("Class is disabled", classData.class);
			return false;
		}

		if (userData.owned_classes.includes(classType as string)) {
			const success = updateUser(player.UserId, {
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
	const userData = getUser(player.UserId);

	if (userData !== undefined) {
		const success = updateUser(player.UserId, {
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
