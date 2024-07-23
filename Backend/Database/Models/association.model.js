const UserAssociation = require("./user.model");
const UserTokenAssociation = require("./user_token.model");

UserAssociation.hasMany(UserTokenAssociation, {
    foreignKey: "user_id",
    onDelete: 'cascade'
});

UserTokenAssociation.belongsTo(UserAssociation, {
    foreignKey: "user_id",
    onDelete: 'cascade'
});

module.exports = { UserAssociation, UserTokenAssociation };
