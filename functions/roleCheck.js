function isMod(member,rolename) {
    return member.roles.cache.some(role => role.name === rolename);
}

module.exports = {
    isMod
}