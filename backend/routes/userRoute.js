const express = require("express");
const { registerUser, loginUser, logout, 
    forgotPassword, resetPassword,
     getUserDetails, updatePassword, 
     updateProfile, getAllUser,getSingleUser, updateUserRole, deleteUserRole } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);


//Admin route
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);

//update and delete
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserRole);

router.route("/logout").get(logout);

module.exports = router;