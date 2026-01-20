import { Class, Classes } from "shared/types/classes";

const classesData: Classes = {};

export function getAllClasses() {
	return classesData;
}

export function getClass(classType: string) {
	return classesData[classType];
}

export function setClass(classType: string, classData: Class) {
	classesData[classType] = classData;
}
