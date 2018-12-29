import {ForbiddenError} from "apollo-server";

export const directiveResolvers = {
    isAuthenticated: async (next, source, args, {user}) => {
        if(user) {
            return await next();
        } else {
            throw new ForbiddenError("You must be signed in to view this resource.");
        }
    },
    hasRole: async (next, source, {role}, {user}) => {
        if(user) {
            if (await user.hasRole(role)) {
                return await next();
            } else {
                throw new ForbiddenError("You are not authorized to view this resource.");
            }
        } else {
            throw new ForbiddenError("You must be signed in to view this resource.");
        }
    },
};