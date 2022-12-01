const Limits = {
    defaultPrefix: "g!",
    ownerID: "144645791145918464",
    info: "The following are defaults.",
    adminCanChangeLimits: true,
    limits: {
        user_removals: {
            per_minute: 8,
            per_hour: 24
        },
        role_creations: {
            per_minute: 4,
            per_hour: 12
        },
        channel_creations: {
            per_minute: 4,
            per_hour: 12
        },
        role_deletions: {
            per_minute: 4,
            per_hour: 12
        },
        channel_deletions: {
            per_minute: 4,
            per_hour: 12
        },
        unbans: {
            per_minute: 8,
            per_hour: 24
        }
    },
    info_config: "The following are defaults.",
    config: {
        _null: "No options to configure currently."
    }
};

export default Limits; 