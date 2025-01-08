import { UnauthenticatedError,UnauthorizedError,BadRequestError } from "../errors/CustomError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)
    
    if (!token) throw new UnauthenticatedError("authentication invalid");
    try {
        const { userId, role }  = verifyJWT(token);
        const testUser=userId==="65e80e64e918933bcdc3d026";
        // console.log(user);
        req.user = { userId, role,testUser};
        next();
      } 
      catch (error) {
        throw new UnauthenticatedError("authentication invalid");
      }
  };
  export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError("Unauthorized to access this route");
      }
      next();
    };
  };

  export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
      throw new BadRequestError('Demo User. Read Only!');
    }
    next();
  };
  
  