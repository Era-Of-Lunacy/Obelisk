import { StatusEvent } from "shared/networking/common/Status";

const statusEvent = StatusEvent.createClient({});

//TODO: Add flamework ignitions

statusEvent.ready.fire();
