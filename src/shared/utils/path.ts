export function WaitForPath<T extends Instance>(root: Instance, path: string): T {
	let current = root;

	for (const name of path.split("/")) {
		current = current.WaitForChild(name);
	}

	return current as T;
}
