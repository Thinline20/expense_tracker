import Elysia from "elysia";

export type RouteParameters = Parameters<Elysia["all"]>;

export type RouteHandler = RouteParameters[1];

export type RouteHook = RouteParameters[2];
