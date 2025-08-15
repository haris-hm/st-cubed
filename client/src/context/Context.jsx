/**
 * @file Exports the context objects for all global state management in the application.
 */

import { createContext } from "react";
import { initialSocketState } from "../util/socket/initSockets";

export const DiscordSDKContext = createContext(null);

export const SocketContext = createContext(initialSocketState());
